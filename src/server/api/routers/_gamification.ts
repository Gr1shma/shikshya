import { eq, type ExtractTablesWithRelations } from "drizzle-orm";
import type { PgTransaction, PgDatabase } from "drizzle-orm/pg-core";
import type { PostgresJsQueryResultHKT } from "drizzle-orm/postgres-js";

import * as schema from "~/server/db/schema";
import { getKathmanduDateString } from "~/server/lib/gamification";

type DB = PgDatabase<
    PostgresJsQueryResultHKT,
    typeof schema,
    ExtractTablesWithRelations<typeof schema>
>;
type TX = PgTransaction<
    PostgresJsQueryResultHKT,
    typeof schema,
    ExtractTablesWithRelations<typeof schema>
>;

export type DatabaseOrTransaction = DB | TX;

export const ensureUserStats = async (
    ctx: { db: DatabaseOrTransaction },
    userId: string,
    now: Date
) => {
    const existing = await ctx.db
        .select()
        .from(schema.userStats)
        .where(eq(schema.userStats.userId, userId))
        .limit(1);

    if (existing[0]) return existing[0];

    const [created] = await ctx.db
        .insert(schema.userStats)
        .values({ userId, updatedAt: now })
        .returning();

    return created!;
};

export const ensureTodayCounters = async (
    ctx: { db: DatabaseOrTransaction },
    userId: string,
    now: Date
) => {
    const stats = await ensureUserStats(ctx, userId, now);
    const today = getKathmanduDateString(now);
    const lastUpdated = getKathmanduDateString(stats.updatedAt);

    if (today === lastUpdated) return stats;

    const [updated] = await ctx.db
        .update(schema.userStats)
        .set({
            todayActiveMinutes: 0,
            todayChatCount: 0,
            updatedAt: now,
        })
        .where(eq(schema.userStats.userId, userId))
        .returning();

    return updated!;
};
