import { eq } from "drizzle-orm";
import type { PgDatabase } from "drizzle-orm/pg-core";

import type { db } from "~/server/db";
import { userStats } from "~/server/db/schema";
import { getKathmanduDateString } from "~/server/lib/gamification";

export const ensureUserStats = async (
    ctx: { db: PgDatabase<any, any, any> },
    userId: string,
    now: Date
) => {
    const existing = await ctx.db
        .select()
        .from(userStats)
        .where(eq(userStats.userId, userId))
        .limit(1);

    if (existing[0]) return existing[0];

    const [created] = await ctx.db
        .insert(userStats)
        .values({ userId, updatedAt: now })
        .returning();

    return created!;
};

export const ensureTodayCounters = async (
    ctx: { db: PgDatabase<any, any, any> },
    userId: string,
    now: Date
) => {
    const stats = await ensureUserStats(ctx, userId, now);
    const today = getKathmanduDateString(now);
    const lastUpdated = getKathmanduDateString(stats.updatedAt);

    if (today === lastUpdated) return stats;

    const [updated] = await ctx.db
        .update(userStats)
        .set({
            todayActiveMinutes: 0,
            todayChatCount: 0,
            updatedAt: now,
        })
        .where(eq(userStats.userId, userId))
        .returning();

    return updated!;
};
