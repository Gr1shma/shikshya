import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { and, eq, sql } from "drizzle-orm";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import {
    course,
    note,
    noteCompletion,
    user,
    userStats,
} from "~/server/db/schema";
import { ensureTodayCounters } from "~/server/api/routers/_gamification";

export const noteRouter = createTRPCRouter({
    list: protectedProcedure.query(({ ctx }) => {
        return ctx.db
            .select({
                id: note.id,
                title: note.title,
                fileUrl: note.fileUrl,
                courseId: note.courseId,
                folderId: note.folderId,
                createdAt: note.createdAt,
            })
            .from(note);
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
            const courseRow = await ctx.db.query.course.findFirst({
                where: eq(course.id, input.courseId),
            });

            if (!courseRow) {
                throw new TRPCError({ code: "NOT_FOUND" });
            }

            const requester = await ctx.db.query.user.findFirst({
                where: eq(user.id, ctx.session.user.id),
            });

            if (!requester) {
                throw new TRPCError({ code: "UNAUTHORIZED" });
            }

            if (
                courseRow.teacherId !== requester.id &&
                requester.role !== "admin"
            ) {
                throw new TRPCError({ code: "FORBIDDEN" });
            }

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
            const existing = await ctx.db.query.note.findFirst({
                where: eq(note.id, input.id),
            });

            if (!existing) {
                throw new TRPCError({ code: "NOT_FOUND" });
            }

            const courseRow = await ctx.db.query.course.findFirst({
                where: eq(course.id, existing.courseId),
            });

            const requester = await ctx.db.query.user.findFirst({
                where: eq(user.id, ctx.session.user.id),
            });

            if (
                !courseRow ||
                !requester ||
                (courseRow.teacherId !== requester.id &&
                    requester.role !== "admin")
            ) {
                throw new TRPCError({ code: "FORBIDDEN" });
            }

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
            const existing = await ctx.db.query.note.findFirst({
                where: eq(note.id, input.id),
            });

            if (!existing) {
                throw new TRPCError({ code: "NOT_FOUND" });
            }

            const courseRow = await ctx.db.query.course.findFirst({
                where: eq(course.id, existing.courseId),
            });

            const requester = await ctx.db.query.user.findFirst({
                where: eq(user.id, ctx.session.user.id),
            });

            if (
                !courseRow ||
                !requester ||
                (courseRow.teacherId !== requester.id &&
                    requester.role !== "admin")
            ) {
                throw new TRPCError({ code: "FORBIDDEN" });
            }

            const [deleted] = await ctx.db
                .delete(note)
                .where(eq(note.id, input.id))
                .returning();

            return deleted ?? null;
        }),

    markCompleted: protectedProcedure
        .input(z.object({ noteId: z.string().uuid() }))
        .mutation(async ({ ctx, input }) => {
            const now = new Date();
            const userId = ctx.session.user.id;

            return ctx.db.transaction(async (tx) => {
                await ensureTodayCounters({ db: tx }, userId, now);

                const existing = await tx
                    .select()
                    .from(noteCompletion)
                    .where(
                        and(
                            eq(noteCompletion.userId, userId),
                            eq(noteCompletion.noteId, input.noteId)
                        )
                    )
                    .limit(1);

                if (existing[0]) {
                    return { newlyCompleted: false, pointsAwarded: 0 };
                }

                await tx.insert(noteCompletion).values({
                    userId,
                    noteId: input.noteId,
                    completedAt: now,
                });

                await tx
                    .update(userStats)
                    .set({
                        totalPoints: sql`${userStats.totalPoints} + 50`,
                        updatedAt: now,
                    })
                    .where(eq(userStats.userId, userId));

                return { newlyCompleted: true, pointsAwarded: 50 };
            });
        }),
});
