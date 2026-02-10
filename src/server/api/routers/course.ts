import { z } from "zod";
import { eq } from "drizzle-orm";
import { TRPCError } from "@trpc/server";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { course, user } from "~/server/db/schema";

export const courseRouter = createTRPCRouter({
    list: protectedProcedure.query(({ ctx }) => {
        return ctx.db
            .select({
                id: course.id,
                title: course.title,
                description: course.description,
                joinCode: course.joinCode,
                teacherId: course.teacherId,
                createdAt: course.createdAt,
                teacherName: user.name,
                teacherImage: user.image,
                teacherRole: user.role,
            })
            .from(course)
            .leftJoin(user, eq(course.teacherId, user.id));
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
            if (input.teacherId !== ctx.session.user.id) {
                throw new TRPCError({ code: "FORBIDDEN" });
            }

            const dbUser = await ctx.db.query.user.findFirst({
                where: eq(user.id, ctx.session.user.id),
            });

            if (dbUser?.role !== "teacher" || !dbUser.teacherVerified) {
                throw new TRPCError({ code: "FORBIDDEN" });
            }

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
            })
        )
        .mutation(async ({ ctx, input }) => {
            const existing = await ctx.db.query.course.findFirst({
                where: eq(course.id, input.id),
            });

            if (!existing) {
                throw new TRPCError({ code: "NOT_FOUND" });
            }

            const requester = await ctx.db.query.user.findFirst({
                where: eq(user.id, ctx.session.user.id),
            });

            if (!requester) {
                throw new TRPCError({ code: "UNAUTHORIZED" });
            }

            const isOwner = existing.teacherId === requester.id;
            const isAdmin = requester.role === "admin";

            if (!isOwner && !isAdmin) {
                throw new TRPCError({ code: "FORBIDDEN" });
            }

            const [updated] = await ctx.db
                .update(course)
                .set({
                    title: input.title,
                    description: input.description,
                    joinCode: input.joinCode,
                })
                .where(eq(course.id, input.id))
                .returning();

            return updated ?? null;
        }),

    delete: protectedProcedure
        .input(z.object({ id: z.string().uuid() }))
        .mutation(async ({ ctx, input }) => {
            const existing = await ctx.db.query.course.findFirst({
                where: eq(course.id, input.id),
            });

            if (!existing) {
                throw new TRPCError({ code: "NOT_FOUND" });
            }

            const requester = await ctx.db.query.user.findFirst({
                where: eq(user.id, ctx.session.user.id),
            });

            if (!requester) {
                throw new TRPCError({ code: "UNAUTHORIZED" });
            }

            const isOwner = existing.teacherId === requester.id;
            const isAdmin = requester.role === "admin";

            if (!isOwner && !isAdmin) {
                throw new TRPCError({ code: "FORBIDDEN" });
            }

            const [deleted] = await ctx.db
                .delete(course)
                .where(eq(course.id, input.id))
                .returning();

            return deleted ?? null;
        }),
});
