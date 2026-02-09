import { z } from "zod";
import { eq } from "drizzle-orm";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { note } from "~/server/db/schema";

export const noteRouter = createTRPCRouter({
    list: protectedProcedure.query(({ ctx }) => {
        return ctx.db.select().from(note);
    }),

    getById: protectedProcedure
        .input(z.object({ id: z.string().uuid() }))
        .query(async ({ ctx, input }) => {
            const rows = await ctx.db
                .select()
                .from(note)
                .where(eq(note.id, input.id))
                .limit(1);

            return rows[0] ?? null;
        }),

    create: protectedProcedure
        .input(
            z.object({
                title: z.string().min(1),
                fileUrl: z.string().min(1),
                textContent: z.string().optional(),
                courseId: z.string().uuid(),
                folderId: z.string().uuid().nullable().optional(),
                createdAt: z.coerce.date().optional(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            const [created] = await ctx.db
                .insert(note)
                .values({
                    title: input.title,
                    fileUrl: input.fileUrl,
                    textContent: input.textContent,
                    courseId: input.courseId,
                    folderId: input.folderId ?? null,
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
                fileUrl: z.string().min(1).optional(),
                textContent: z.string().optional(),
                courseId: z.string().uuid().optional(),
                folderId: z.string().uuid().nullable().optional(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            const updateData: {
                title?: string;
                fileUrl?: string;
                textContent?: string;
                courseId?: string;
                folderId?: string | null;
            } = {};

            if (input.title !== undefined) updateData.title = input.title;
            if (input.fileUrl !== undefined) updateData.fileUrl = input.fileUrl;
            if (input.textContent !== undefined)
                updateData.textContent = input.textContent;
            if (input.courseId !== undefined)
                updateData.courseId = input.courseId;
            if (input.folderId !== undefined)
                updateData.folderId = input.folderId;

            const [updated] = await ctx.db
                .update(note)
                .set(updateData)
                .where(eq(note.id, input.id))
                .returning();

            return updated ?? null;
        }),

    delete: protectedProcedure
        .input(z.object({ id: z.string().uuid() }))
        .mutation(async ({ ctx, input }) => {
            const [deleted] = await ctx.db
                .delete(note)
                .where(eq(note.id, input.id))
                .returning();

            return deleted ?? null;
        }),
});
