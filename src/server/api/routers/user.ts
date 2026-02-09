import { z } from "zod";
import { eq } from "drizzle-orm";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { user } from "~/server/db/schema";

const userRoleSchema = z.enum(["admin", "teacher", "student"]);

export const userRouter = createTRPCRouter({
    list: protectedProcedure.query(({ ctx }) => {
        return ctx.db.select().from(user);
    }),

    getById: protectedProcedure
        .input(z.object({ id: z.string() }))
        .query(async ({ ctx, input }) => {
            const rows = await ctx.db
                .select()
                .from(user)
                .where(eq(user.id, input.id))
                .limit(1);

            return rows[0] ?? null;
        }),

    create: protectedProcedure
        .input(
            z.object({
                id: z.string(),
                name: z.string().min(1),
                email: z.string().email(),
                emailVerified: z.boolean().optional(),
                image: z.string().url().optional(),
                role: userRoleSchema.optional(),
                createdAt: z.coerce.date().optional(),
                updatedAt: z.coerce.date().optional(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            const [created] = await ctx.db
                .insert(user)
                .values({
                    id: input.id,
                    name: input.name,
                    email: input.email,
                    emailVerified: input.emailVerified ?? false,
                    image: input.image,
                    role: input.role ?? "student",
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
                name: z.string().min(1).optional(),
                email: z.string().email().optional(),
                emailVerified: z.boolean().optional(),
                image: z.string().url().optional(),
                role: userRoleSchema.optional(),
                updatedAt: z.coerce.date().optional(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            const [updated] = await ctx.db
                .update(user)
                .set({
                    name: input.name,
                    email: input.email,
                    emailVerified: input.emailVerified,
                    image: input.image,
                    role: input.role,
                    updatedAt: input.updatedAt ?? new Date(),
                })
                .where(eq(user.id, input.id))
                .returning();

            return updated ?? null;
        }),

    delete: protectedProcedure
        .input(z.object({ id: z.string() }))
        .mutation(async ({ ctx, input }) => {
            const [deleted] = await ctx.db
                .delete(user)
                .where(eq(user.id, input.id))
                .returning();

            return deleted ?? null;
        }),

    completeOnboarding: protectedProcedure
        .input(z.object({ role: z.enum(["student", "teacher"]) }))
        .mutation(async ({ ctx, input }) => {
            const [updated] = await ctx.db
                .update(user)
                .set({
                    role: input.role,
                    onboardingCompleted: true,
                    updatedAt: new Date(),
                })
                .where(eq(user.id, ctx.session.user.id))
                .returning();

            return updated ?? null;
        }),
});
