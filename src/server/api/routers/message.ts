import { z } from "zod";
import { and, eq } from "drizzle-orm";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { message } from "~/server/db/schema";

const messageRoleSchema = z.enum([
    "user",
    "system",
    "assistant",
    "data",
    "tool",
]);

export const messageRouter = createTRPCRouter({
    list: protectedProcedure.query(({ ctx }) => {
        return ctx.db
            .select()
            .from(message)
            .where(eq(message.userId, ctx.session.user.id));
    }),

    listByNoteId: protectedProcedure
        .input(z.object({ noteId: z.string().uuid() }))
        .query(async ({ ctx, input }) => {
            return ctx.db
                .select()
                .from(message)
                .where(
                    and(
                        eq(message.noteId, input.noteId),
                        eq(message.userId, ctx.session.user.id)
                    )
                )
                .orderBy(message.createdAt);
        }),

    getById: protectedProcedure
        .input(z.object({ id: z.string() }))
        .query(async ({ ctx, input }) => {
            const rows = await ctx.db
                .select()
                .from(message)
                .where(
                    and(
                        eq(message.id, input.id),
                        eq(message.userId, ctx.session.user.id)
                    )
                )
                .limit(1);

            return rows[0] ?? null;
        }),

    create: protectedProcedure
        .input(
            z.object({
                id: z.string(),
                role: messageRoleSchema,
                content: z.string().min(1),
                noteId: z.string().uuid(),
                createdAt: z.coerce.date().optional(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            const [created] = await ctx.db
                .insert(message)
                .values({
                    id: input.id,
                    role: input.role,
                    content: input.content,
                    noteId: input.noteId,
                    userId: ctx.session.user.id,
                    createdAt: input.createdAt ?? new Date(),
                })
                .returning();

            return created ?? null;
        }),

    update: protectedProcedure
        .input(
            z.object({
                id: z.string(),
                role: messageRoleSchema.optional(),
                content: z.string().min(1).optional(),
                noteId: z.string().uuid().optional(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            const [updated] = await ctx.db
                .update(message)
                .set({
                    role: input.role,
                    content: input.content,
                    noteId: input.noteId,
                })
                .where(
                    and(
                        eq(message.id, input.id),
                        eq(message.userId, ctx.session.user.id)
                    )
                )
                .returning();

            return updated ?? null;
        }),

    delete: protectedProcedure
        .input(z.object({ id: z.string() }))
        .mutation(async ({ ctx, input }) => {
            const [deleted] = await ctx.db
                .delete(message)
                .where(
                    and(
                        eq(message.id, input.id),
                        eq(message.userId, ctx.session.user.id)
                    )
                )
                .returning();

            return deleted ?? null;
        }),
});
