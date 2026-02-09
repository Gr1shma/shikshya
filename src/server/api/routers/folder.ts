import { z } from "zod";
import { eq, and, isNull } from "drizzle-orm";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { folder, note } from "~/server/db/schema";

export const folderRouter = createTRPCRouter({
    // List all folders for a course (optionally filtered by parent)
    list: protectedProcedure
        .input(
            z.object({
                courseId: z.string().uuid(),
                parentId: z.string().uuid().nullable().optional(),
            })
        )
        .query(async ({ ctx, input }) => {
            if (input.parentId === null) {
                // Get root-level folders
                return ctx.db
                    .select()
                    .from(folder)
                    .where(
                        and(
                            eq(folder.courseId, input.courseId),
                            isNull(folder.parentId)
                        )
                    );
            } else if (input.parentId) {
                // Get folders within a specific parent
                return ctx.db
                    .select()
                    .from(folder)
                    .where(
                        and(
                            eq(folder.courseId, input.courseId),
                            eq(folder.parentId, input.parentId)
                        )
                    );
            } else {
                // Get all folders for the course
                return ctx.db
                    .select()
                    .from(folder)
                    .where(eq(folder.courseId, input.courseId));
            }
        }),

    getById: protectedProcedure
        .input(z.object({ id: z.string().uuid() }))
        .query(async ({ ctx, input }) => {
            const rows = await ctx.db
                .select()
                .from(folder)
                .where(eq(folder.id, input.id))
                .limit(1);

            return rows[0] ?? null;
        }),

    // Get folder contents (subfolders + notes)
    getContents: protectedProcedure
        .input(
            z.object({
                courseId: z.string().uuid(),
                folderId: z.string().uuid().nullable(), // null = course root
            })
        )
        .query(async ({ ctx, input }) => {
            const whereCondition =
                input.folderId === null
                    ? and(
                          eq(folder.courseId, input.courseId),
                          isNull(folder.parentId)
                      )
                    : and(
                          eq(folder.courseId, input.courseId),
                          eq(folder.parentId, input.folderId)
                      );

            const notesWhereCondition =
                input.folderId === null
                    ? and(
                          eq(note.courseId, input.courseId),
                          isNull(note.folderId)
                      )
                    : and(
                          eq(note.courseId, input.courseId),
                          eq(note.folderId, input.folderId)
                      );

            const [folders, notes] = await Promise.all([
                ctx.db.select().from(folder).where(whereCondition),
                ctx.db.select().from(note).where(notesWhereCondition),
            ]);

            return { folders, notes };
        }),

    create: protectedProcedure
        .input(
            z.object({
                name: z.string().min(1),
                courseId: z.string().uuid(),
                parentId: z.string().uuid().nullable().optional(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            const [created] = await ctx.db
                .insert(folder)
                .values({
                    name: input.name,
                    courseId: input.courseId,
                    parentId: input.parentId ?? null,
                })
                .returning();

            return created ?? null;
        }),

    update: protectedProcedure
        .input(
            z.object({
                id: z.string().uuid(),
                name: z.string().min(1).optional(),
                parentId: z.string().uuid().nullable().optional(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            const updateData: { name?: string; parentId?: string | null } = {};

            if (input.name !== undefined) {
                updateData.name = input.name;
            }
            if (input.parentId !== undefined) {
                updateData.parentId = input.parentId;
            }

            const [updated] = await ctx.db
                .update(folder)
                .set(updateData)
                .where(eq(folder.id, input.id))
                .returning();

            return updated ?? null;
        }),

    delete: protectedProcedure
        .input(z.object({ id: z.string().uuid() }))
        .mutation(async ({ ctx, input }) => {
            const [deleted] = await ctx.db
                .delete(folder)
                .where(eq(folder.id, input.id))
                .returning();

            return deleted ?? null;
        }),
});
