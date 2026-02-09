import { z } from "zod";
import { eq } from "drizzle-orm";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { session } from "~/server/db/schema";

export const sessionRouter = createTRPCRouter({
    list: protectedProcedure.query(({ ctx }) => {
        return ctx.db.select().from(session);
    }),

    getById: protectedProcedure
        .input(z.object({ id: z.string() }))
        .query(async ({ ctx, input }) => {
            const rows = await ctx.db
                .select()
                .from(session)
                .where(eq(session.id, input.id))
                .limit(1);

            return rows[0] ?? null;
        }),

    create: protectedProcedure
        .input(
            z.object({
                id: z.string(),
                expiresAt: z.coerce.date(),
                token: z.string().min(1),
                createdAt: z.coerce.date().optional(),
                updatedAt: z.coerce.date().optional(),
                ipAddress: z.string().optional(),
                userAgent: z.string().optional(),
                userId: z.string(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            const [created] = await ctx.db
                .insert(session)
                .values({
                    id: input.id,
                    expiresAt: input.expiresAt,
                    token: input.token,
                    createdAt: input.createdAt ?? new Date(),
                    updatedAt: input.updatedAt ?? new Date(),
                    ipAddress: input.ipAddress,
                    userAgent: input.userAgent,
                    userId: input.userId,
                })
                .returning();

            return created ?? null;
        }),

    update: protectedProcedure
        .input(
            z.object({
                id: z.string(),
                expiresAt: z.coerce.date().optional(),
                token: z.string().min(1).optional(),
                updatedAt: z.coerce.date().optional(),
                ipAddress: z.string().optional(),
                userAgent: z.string().optional(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            const [updated] = await ctx.db
                .update(session)
                .set({
                    expiresAt: input.expiresAt,
                    token: input.token,
                    updatedAt: input.updatedAt ?? new Date(),
                    ipAddress: input.ipAddress,
                    userAgent: input.userAgent,
                })
                .where(eq(session.id, input.id))
                .returning();

            return updated ?? null;
        }),

    delete: protectedProcedure
        .input(z.object({ id: z.string() }))
        .mutation(async ({ ctx, input }) => {
            const [deleted] = await ctx.db
                .delete(session)
                .where(eq(session.id, input.id))
                .returning();

            return deleted ?? null;
        }),
});
