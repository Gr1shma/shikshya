import { z } from "zod";
import { eq } from "drizzle-orm";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { account } from "~/server/db/schema";

export const accountRouter = createTRPCRouter({
    list: protectedProcedure.query(({ ctx }) => {
        return ctx.db.select().from(account);
    }),

    getById: protectedProcedure
        .input(z.object({ id: z.string() }))
        .query(async ({ ctx, input }) => {
            const rows = await ctx.db
                .select()
                .from(account)
                .where(eq(account.id, input.id))
                .limit(1);

            return rows[0] ?? null;
        }),

    create: protectedProcedure
        .input(
            z.object({
                id: z.string(),
                accountId: z.string().min(1),
                providerId: z.string().min(1),
                userId: z.string(),
                accessToken: z.string().optional(),
                refreshToken: z.string().optional(),
                idToken: z.string().optional(),
                accessTokenExpiresAt: z.coerce.date().optional(),
                refreshTokenExpiresAt: z.coerce.date().optional(),
                scope: z.string().optional(),
                password: z.string().optional(),
                createdAt: z.coerce.date().optional(),
                updatedAt: z.coerce.date().optional(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            const [created] = await ctx.db
                .insert(account)
                .values({
                    id: input.id,
                    accountId: input.accountId,
                    providerId: input.providerId,
                    userId: input.userId,
                    accessToken: input.accessToken,
                    refreshToken: input.refreshToken,
                    idToken: input.idToken,
                    accessTokenExpiresAt: input.accessTokenExpiresAt,
                    refreshTokenExpiresAt: input.refreshTokenExpiresAt,
                    scope: input.scope,
                    password: input.password,
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
                accountId: z.string().min(1).optional(),
                providerId: z.string().min(1).optional(),
                userId: z.string().optional(),
                accessToken: z.string().optional(),
                refreshToken: z.string().optional(),
                idToken: z.string().optional(),
                accessTokenExpiresAt: z.coerce.date().optional(),
                refreshTokenExpiresAt: z.coerce.date().optional(),
                scope: z.string().optional(),
                password: z.string().optional(),
                updatedAt: z.coerce.date().optional(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            const [updated] = await ctx.db
                .update(account)
                .set({
                    accountId: input.accountId,
                    providerId: input.providerId,
                    userId: input.userId,
                    accessToken: input.accessToken,
                    refreshToken: input.refreshToken,
                    idToken: input.idToken,
                    accessTokenExpiresAt: input.accessTokenExpiresAt,
                    refreshTokenExpiresAt: input.refreshTokenExpiresAt,
                    scope: input.scope,
                    password: input.password,
                    updatedAt: input.updatedAt ?? new Date(),
                })
                .where(eq(account.id, input.id))
                .returning();

            return updated ?? null;
        }),

    delete: protectedProcedure
        .input(z.object({ id: z.string() }))
        .mutation(async ({ ctx, input }) => {
            const [deleted] = await ctx.db
                .delete(account)
                .where(eq(account.id, input.id))
                .returning();

            return deleted ?? null;
        }),
});
