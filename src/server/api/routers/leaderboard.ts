import { z } from "zod";
import { and, eq, gte, inArray, lt, lte, sql } from "drizzle-orm";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import {
    enrollment,
    noteCompletion,
    studySession,
    user,
} from "~/server/db/schema";
import {
    addDays,
    getKathmanduDateString,
    kathmanduEndOfDayUtcExclusive,
    kathmanduStartOfDayUtc,
} from "~/server/lib/gamification";

const leaderboardScopeSchema = z.enum(["class", "global"]);

export const leaderboardRouter = createTRPCRouter({
    getWeekly: protectedProcedure
        .input(
            z.object({
                scope: leaderboardScopeSchema,
                assignedClass: z.string().uuid().optional(),
            })
        )
        .query(async ({ ctx, input }) => {
            const now = new Date();
            const todayDate = getKathmanduDateString(now);
            const startDate = getKathmanduDateString(addDays(now, -6));

            let userFilter: string[] | undefined;

            if (input.scope === "class") {
                if (!input.assignedClass) {
                    return [];
                }

                const enrolled = await ctx.db
                    .select({ userId: enrollment.userId })
                    .from(enrollment)
                    .where(eq(enrollment.courseId, input.assignedClass));

                userFilter = enrolled.map((row) => row.userId);

                if (userFilter.length === 0) return [];
            }

            const sessionConditions = [
                gte(studySession.dayDate, startDate),
                lte(studySession.dayDate, todayDate),
            ];
            if (userFilter) {
                sessionConditions.push(
                    inArray(studySession.userId, userFilter)
                );
            }

            const sessionRows = await ctx.db
                .select({
                    userId: studySession.userId,
                    points: sql<number>`coalesce(sum(${studySession.pointsAwarded}), 0)`,
                })
                .from(studySession)
                .where(and(...sessionConditions))
                .groupBy(studySession.userId);

            const startUtc = kathmanduStartOfDayUtc(startDate);
            const endUtc = kathmanduEndOfDayUtcExclusive(todayDate);

            const completionConditions = [
                gte(noteCompletion.completedAt, startUtc),
                lt(noteCompletion.completedAt, endUtc),
            ];
            if (userFilter) {
                completionConditions.push(
                    inArray(noteCompletion.userId, userFilter)
                );
            }

            const completionRows = await ctx.db
                .select({
                    userId: noteCompletion.userId,
                    completions: sql<number>`count(*)`,
                })
                .from(noteCompletion)
                .where(and(...completionConditions))
                .groupBy(noteCompletion.userId);

            const pointsByUser = new Map<string, number>();
            for (const row of sessionRows) {
                pointsByUser.set(row.userId, Number(row.points) || 0);
            }
            for (const row of completionRows) {
                const existing = pointsByUser.get(row.userId) ?? 0;
                pointsByUser.set(row.userId, existing + row.completions * 50);
            }

            const sorted = Array.from(pointsByUser.entries())
                .map(([userId, points]) => ({ userId, points }))
                .sort((a, b) => b.points - a.points)
                .slice(0, 10);

            if (sorted.length === 0) return [];

            const userIds = sorted.map((row) => row.userId);
            const users = await ctx.db
                .select({ id: user.id, name: user.name, image: user.image })
                .from(user)
                .where(
                    and(inArray(user.id, userIds), eq(user.role, "student"))
                );

            const userMap = new Map(users.map((u) => [u.id, u]));

            return sorted
                .filter((row) => userMap.has(row.userId))
                .map((row) => ({
                    ...row,
                    user: userMap.get(row.userId) ?? null,
                }));
        }),
});
