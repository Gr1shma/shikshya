import { z } from "zod";
import { and, eq, sql } from "drizzle-orm";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { studySession, userStats } from "~/server/db/schema";
import { ensureTodayCounters } from "~/server/api/routers/_gamification";
import { addDays, getKathmanduDateString } from "~/server/lib/gamification";

const activityEventSchema = z.enum(["scroll", "page_change", "chat", "focus"]);

const MAX_IDLE_SECONDS = 90;
const MAX_ACTIVE_MINUTES_PER_DAY = 60;
const STREAK_MIN_MINUTES = 1;
const STREAK_BONUS_POINTS = 5;
const STREAK_BONUS_7_DAYS = 50;
const STREAK_BONUS_30_DAYS = 250;

export const activityRouter = createTRPCRouter({
    ping: protectedProcedure
        .input(
            z.object({
                noteId: z.string().uuid(),
                eventType: activityEventSchema,
            })
        )
        .mutation(async ({ ctx, input }) => {
            const now = new Date();
            const userId = ctx.session.user.id;
            const todayDate = getKathmanduDateString(now);
            const yesterdayDate = getKathmanduDateString(addDays(now, -1));

            return ctx.db.transaction(async (tx) => {
                const stats = await ensureTodayCounters(
                    { db: tx },
                    userId,
                    now
                );

                const existingSession = await tx
                    .select()
                    .from(studySession)
                    .where(
                        and(
                            eq(studySession.userId, userId),
                            eq(studySession.noteId, input.noteId),
                            eq(studySession.dayDate, todayDate)
                        )
                    )
                    .limit(1);

                let session = existingSession[0];
                if (!session) {
                    const [created] = await tx
                        .insert(studySession)
                        .values({
                            userId,
                            noteId: input.noteId,
                            dayDate: todayDate,
                            lastActivityAt: now,
                            createdAt: now,
                            updatedAt: now,
                        })
                        .returning();
                    session = created!;
                }

                let deltaSeconds = 0;
                if (session.lastActivityAt) {
                    const diffSeconds = Math.floor(
                        (now.getTime() - session.lastActivityAt.getTime()) /
                            1000
                    );
                    if (diffSeconds > 0 && diffSeconds <= MAX_IDLE_SECONDS) {
                        deltaSeconds = diffSeconds;
                    }
                }

                if (deltaSeconds > 0) {
                    await tx
                        .update(studySession)
                        .set({
                            activeSeconds: sql`${studySession.activeSeconds} + ${deltaSeconds}`,
                            lastActivityAt: now,
                            updatedAt: now,
                        })
                        .where(eq(studySession.id, session.id));
                } else {
                    await tx
                        .update(studySession)
                        .set({
                            lastActivityAt: now,
                            updatedAt: now,
                        })
                        .where(eq(studySession.id, session.id));
                }

                const totalSecondsRow = await tx
                    .select({
                        totalSeconds: sql<number>`coalesce(sum(${studySession.activeSeconds}), 0)`,
                    })
                    .from(studySession)
                    .where(
                        and(
                            eq(studySession.userId, userId),
                            eq(studySession.dayDate, todayDate)
                        )
                    );

                const totalSeconds = totalSecondsRow[0]?.totalSeconds ?? 0;
                const totalMinutes = Math.floor(totalSeconds / 60);
                const cappedMinutes = Math.min(
                    totalMinutes,
                    MAX_ACTIVE_MINUTES_PER_DAY
                );
                const previousMinutes = stats.todayActiveMinutes;
                const deltaMinutes = Math.max(
                    0,
                    cappedMinutes - previousMinutes
                );

                let pointsAwarded = 0;

                if (deltaMinutes > 0) {
                    pointsAwarded += deltaMinutes;
                    await tx
                        .update(userStats)
                        .set({
                            totalPoints: sql`${userStats.totalPoints} + ${deltaMinutes}`,
                            todayActiveMinutes: cappedMinutes,
                            updatedAt: now,
                        })
                        .where(eq(userStats.userId, userId));

                    await tx
                        .update(studySession)
                        .set({
                            pointsAwarded: sql`${studySession.pointsAwarded} + ${deltaMinutes}`,
                            updatedAt: now,
                        })
                        .where(eq(studySession.id, session.id));
                }

                const qualifiesForStreak =
                    cappedMinutes >= STREAK_MIN_MINUTES &&
                    stats.lastStudyDate !== todayDate;

                if (qualifiesForStreak) {
                    const nextStreak =
                        stats.lastStudyDate === yesterdayDate
                            ? stats.currentStreak + 1
                            : 1;
                    const nextLongest = Math.max(
                        stats.longestStreak,
                        nextStreak
                    );

                    pointsAwarded += STREAK_BONUS_POINTS;
                    if (nextStreak === 7) {
                        pointsAwarded += STREAK_BONUS_7_DAYS;
                    }
                    if (nextStreak === 30) {
                        pointsAwarded += STREAK_BONUS_30_DAYS;
                    }

                    await tx
                        .update(userStats)
                        .set({
                            currentStreak: nextStreak,
                            longestStreak: nextLongest,
                            lastStudyDate: todayDate,
                            totalPoints: sql`${userStats.totalPoints} + ${pointsAwarded}`,
                            updatedAt: now,
                        })
                        .where(eq(userStats.userId, userId));

                    await tx
                        .update(studySession)
                        .set({
                            pointsAwarded: sql`${studySession.pointsAwarded} + ${STREAK_BONUS_POINTS}`,
                            updatedAt: now,
                        })
                        .where(eq(studySession.id, session.id));
                }

                return {
                    pointsAwarded,
                    todayActiveMinutes: cappedMinutes,
                    cappedMinutes,
                };
            });
        }),
});
