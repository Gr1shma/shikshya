import { z } from "zod";
import { and, eq } from "drizzle-orm";
import { TRPCError } from "@trpc/server";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { enrollment, user } from "~/server/db/schema";

export const enrollmentRouter = createTRPCRouter({
    list: protectedProcedure.query(({ ctx }) => {
        return ctx.db.select().from(enrollment);
    }),

    getById: protectedProcedure
        .input(
            z.object({
                userId: z.string(),
                courseId: z.string().uuid(),
            })
        )
        .query(async ({ ctx, input }) => {
            const rows = await ctx.db
                .select()
                .from(enrollment)
                .where(
                    and(
                        eq(enrollment.userId, input.userId),
                        eq(enrollment.courseId, input.courseId)
                    )
                )
                .limit(1);

            return rows[0] ?? null;
        }),

    create: protectedProcedure
        .input(
            z.object({
                userId: z.string(),
                courseId: z.string().uuid(),
                joinedAt: z.coerce.date().optional(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            if (input.userId !== ctx.session.user.id) {
                throw new TRPCError({ code: "FORBIDDEN" });
            }

            const dbUser = await ctx.db.query.user.findFirst({
                where: eq(user.id, ctx.session.user.id),
            });

            if (dbUser?.role !== "student") {
                throw new TRPCError({ code: "FORBIDDEN" });
            }

            const [created] = await ctx.db
                .insert(enrollment)
                .values({
                    userId: input.userId,
                    courseId: input.courseId,
                    joinedAt: input.joinedAt ?? new Date(),
                })
                .returning();

            return created ?? null;
        }),

    update: protectedProcedure
        .input(
            z.object({
                userId: z.string(),
                courseId: z.string().uuid(),
                joinedAt: z.coerce.date().optional(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            if (input.userId !== ctx.session.user.id) {
                throw new TRPCError({ code: "FORBIDDEN" });
            }

            const dbUser = await ctx.db.query.user.findFirst({
                where: eq(user.id, ctx.session.user.id),
            });

            if (dbUser?.role !== "student") {
                throw new TRPCError({ code: "FORBIDDEN" });
            }

            const [updated] = await ctx.db
                .update(enrollment)
                .set({
                    joinedAt: input.joinedAt ?? new Date(),
                })
                .where(
                    and(
                        eq(enrollment.userId, input.userId),
                        eq(enrollment.courseId, input.courseId)
                    )
                )
                .returning();

            return updated ?? null;
        }),

    delete: protectedProcedure
        .input(
            z.object({
                userId: z.string(),
                courseId: z.string().uuid(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            if (input.userId !== ctx.session.user.id) {
                throw new TRPCError({ code: "FORBIDDEN" });
            }

            const dbUser = await ctx.db.query.user.findFirst({
                where: eq(user.id, ctx.session.user.id),
            });

            if (dbUser?.role !== "student") {
                throw new TRPCError({ code: "FORBIDDEN" });
            }

            const [deleted] = await ctx.db
                .delete(enrollment)
                .where(
                    and(
                        eq(enrollment.userId, input.userId),
                        eq(enrollment.courseId, input.courseId)
                    )
                )
                .returning();

            return deleted ?? null;
        }),
});
