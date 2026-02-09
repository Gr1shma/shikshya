import { z } from "zod";
import { eq } from "drizzle-orm";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { course } from "~/server/db/schema";

export const courseRouter = createTRPCRouter({
    list: protectedProcedure.query(({ ctx }) => {
        return ctx.db.select().from(course);
    }),

    getById: protectedProcedure
        .input(z.object({ id: z.string().uuid() }))
        .query(async ({ ctx, input }) => {
            const rows = await ctx.db
                .select()
                .from(course)
                .where(eq(course.id, input.id))
                .limit(1);

            return rows[0] ?? null;
        }),

    create: protectedProcedure
        .input(
            z.object({
                title: z.string().min(1),
                description: z.string().optional(),
                joinCode: z.string().min(1),
                teacherId: z.string(),
                createdAt: z.coerce.date().optional(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            const [created] = await ctx.db
                .insert(course)
                .values({
                    title: input.title,
                    description: input.description,
                    joinCode: input.joinCode,
                    teacherId: input.teacherId,
                    createdAt: input.createdAt ?? new Date(),
                })
                .returning();

            return created ?? null;
        }),

    update: protectedProcedure
        .input(
            z.object({
                id: z.string().uuid(),
                title: z.string().min(1).optional(),
                description: z.string().optional(),
                joinCode: z.string().min(1).optional(),
                teacherId: z.string().optional(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            const [updated] = await ctx.db
                .update(course)
                .set({
                    title: input.title,
                    description: input.description,
                    joinCode: input.joinCode,
                    teacherId: input.teacherId,
                })
                .where(eq(course.id, input.id))
                .returning();

            return updated ?? null;
        }),

    delete: protectedProcedure
        .input(z.object({ id: z.string().uuid() }))
        .mutation(async ({ ctx, input }) => {
            const [deleted] = await ctx.db
                .delete(course)
                .where(eq(course.id, input.id))
                .returning();

            return deleted ?? null;
        }),
});
