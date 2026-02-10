import { z } from "zod";
import { and, eq, sql } from "drizzle-orm";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { message, studySession, userStats } from "~/server/db/schema";
import { ensureTodayCounters } from "~/server/api/routers/_gamification";
import { getKathmanduDateString } from "~/server/lib/gamification";

const MEANINGFUL_MIN_LENGTH = 15;
const MAX_MEANINGFUL_PER_DAY = 10;
const CHAT_POINTS = 2;

export const chatRouter = createTRPCRouter({
    onStudentMessage: protectedProcedure
        .input(
            z.object({
                noteId: z.string().uuid(),
                content: z.string().min(1),
            })
        )
        .mutation(async ({ ctx, input }) => {
            const now = new Date();
            const userId = ctx.session.user.id;
            const todayDate = getKathmanduDateString(now);
            const contentLength = input.content.trim().length;

            return ctx.db.transaction(async (tx) => {
                const stats = await ensureTodayCounters(
                    { db: tx },
                    userId,
                    now
                );

                const [createdMessage] = await tx
                    .insert(message)
                    .values({
                        id: crypto.randomUUID(),
                        role: "user",
                        content: input.content,
                        noteId: input.noteId,
                        userId,
                        createdAt: now,
                    })
                    .returning();

                let pointsAwarded = 0;
                let counted = false;

                if (
                    contentLength >= MEANINGFUL_MIN_LENGTH &&
                    stats.todayChatCount < MAX_MEANINGFUL_PER_DAY
                ) {
                    counted = true;
                    pointsAwarded = CHAT_POINTS;

                    await tx
                        .update(userStats)
                        .set({
                            totalPoints: sql`${userStats.totalPoints} + ${CHAT_POINTS}`,
                            todayChatCount: sql`${userStats.todayChatCount} + 1`,
                            updatedAt: now,
                        })
                        .where(eq(userStats.userId, userId));

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

                    if (existingSession[0]) {
                        await tx
                            .update(studySession)
                            .set({
                                pointsAwarded: sql`${studySession.pointsAwarded} + ${CHAT_POINTS}`,
                                updatedAt: now,
                            })
                            .where(eq(studySession.id, existingSession[0].id));
                    } else {
                        await tx.insert(studySession).values({
                            userId,
                            noteId: input.noteId,
                            dayDate: todayDate,
                            pointsAwarded: CHAT_POINTS,
                            createdAt: now,
                            updatedAt: now,
                            lastActivityAt: now,
                        });
                    }
                }

                return {
                    message: createdMessage,
                    pointsAwarded,
                    counted,
                    todayChatCount: stats.todayChatCount + (counted ? 1 : 0),
                };
            });
        }),
});
