import { z } from "zod";
import { eq } from "drizzle-orm";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { verification } from "~/server/db/schema";

export const verificationRouter = createTRPCRouter({
    list: protectedProcedure.query(({ ctx }) => {
        return ctx.db.select().from(verification);
    }),

    getById: protectedProcedure
        .input(z.object({ id: z.string() }))
        .query(async ({ ctx, input }) => {
            const rows = await ctx.db
                .select()
                .from(verification)
                .where(eq(verification.id, input.id))
                .limit(1);

            return rows[0] ?? null;
        }),

    create: protectedProcedure
        .input(
            z.object({
                id: z.string(),
                identifier: z.string().min(1),
                value: z.string().min(1),
                expiresAt: z.coerce.date(),
                createdAt: z.coerce.date().optional(),
                updatedAt: z.coerce.date().optional(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            const [created] = await ctx.db
                .insert(verification)
                .values({
                    id: input.id,
                    identifier: input.identifier,
                    value: input.value,
                    expiresAt: input.expiresAt,
                    createdAt: input.createdAt ?? new Date(),
                    updatedAt: input.updatedAt ?? new Date(),
                })
                .returning();

            return created ?? null;
        }),

    update: protectedProcedure
        .input(
            z.object({
                id: z.string(),
                identifier: z.string().min(1).optional(),
                value: z.string().min(1).optional(),
                expiresAt: z.coerce.date().optional(),
                updatedAt: z.coerce.date().optional(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            const [updated] = await ctx.db
                .update(verification)
                .set({
                    identifier: input.identifier,
                    value: input.value,
                    expiresAt: input.expiresAt,
                    updatedAt: input.updatedAt ?? new Date(),
                })
                .where(eq(verification.id, input.id))
                .returning();

            return updated ?? null;
        }),

    delete: protectedProcedure
        .input(z.object({ id: z.string() }))
        .mutation(async ({ ctx, input }) => {
            const [deleted] = await ctx.db
                .delete(verification)
                .where(eq(verification.id, input.id))
                .returning();

            return deleted ?? null;
        }),
});
