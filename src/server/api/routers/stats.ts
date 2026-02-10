import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { ensureTodayCounters } from "~/server/api/routers/_gamification";
import { getKathmanduDateString } from "~/server/lib/gamification";

export const statsRouter = createTRPCRouter({
    getMyStats: protectedProcedure.query(async ({ ctx }) => {
        const now = new Date();
        const stats = await ensureTodayCounters(ctx, ctx.session.user.id, now);

        return {
            ...stats,
            todayDate: getKathmanduDateString(now),
        };
    }),
});
