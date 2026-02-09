import { z } from "zod";
import { eq } from "drizzle-orm";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { message } from "~/server/db/schema";

const messageRoleSchema = z.enum(["user", "system", "assistant", "data", "tool"]);

export const messageRouter = createTRPCRouter({
    list: protectedProcedure.query(({ ctx }) => {
        return ctx.db.select().from(message);
    }),

    getById: protectedProcedure
        .input(z.object({ id: z.string() }))
        .query(async ({ ctx, input }) => {
            const rows = await ctx.db
                .select()
                .from(message)
                .where(eq(message.id, input.id))
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
                userId: z.string(),
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
                    userId: input.userId,
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
                userId: z.string().optional(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            const [updated] = await ctx.db
                .update(message)
                .set({
                    role: input.role,
                    content: input.content,
                    noteId: input.noteId,
                    userId: input.userId,
                })
                .where(eq(message.id, input.id))
                .returning();

            return updated ?? null;
        }),

    delete: protectedProcedure
        .input(z.object({ id: z.string() }))
        .mutation(async ({ ctx, input }) => {
            const [deleted] = await ctx.db
                .delete(message)
                .where(eq(message.id, input.id))
                .returning();

            return deleted ?? null;
        }),
});
