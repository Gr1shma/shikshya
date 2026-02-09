import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { z } from "zod";
import { headers } from "next/headers";

import { createCaller } from "~/server/api/root";
import { createTRPCContext } from "~/server/api/trpc";

const f = createUploadthing();

export const ourFileRouter = {
    pdfUploader: f({
        pdf: {
            maxFileSize: "16MB",
            maxFileCount: 1,
        },
    })
        .input(z.object({ courseId: z.string().uuid() }))
        .middleware(async ({ input }) => {
            const context = await createTRPCContext({
                headers: await headers(),
            });
            const caller = createCaller(context);

            try {
                const existingCourse = await caller.course.getById({
                    id: input.courseId,
                });

                if (!existingCourse) {
                    // eslint-disable-next-line @typescript-eslint/only-throw-error
                    throw new UploadThingError({
                        code: "NOT_FOUND",
                        message: "Course not found",
                    });
                }

                if (existingCourse.teacherId !== context.session?.user.id) {
                    // eslint-disable-next-line @typescript-eslint/only-throw-error
                    throw new UploadThingError({
                        code: "FORBIDDEN",
                        message: "You are not authorized to upload to this course",
                    });
                }

                return {
                    userId: context.session?.user.id,
                    courseId: input.courseId,
                };
            } catch (error) {
                if (error instanceof UploadThingError) throw error;
                // eslint-disable-next-line @typescript-eslint/only-throw-error
                throw new UploadThingError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: "Internal Server Error",
                });
            }
        })
        .onUploadComplete(async ({ metadata, file }) => {
            console.log("PDF upload complete for userId:", metadata.userId);
            console.log("Course ID:", metadata.courseId);
            console.log("File URL:", file.ufsUrl);

            const context = await createTRPCContext({
                headers: await headers(),
            });
            const caller = createCaller(context);

            try {
                await caller.note.create({
                    title: file.name ?? "Uploaded Note",
                    fileUrl: file.ufsUrl,
                    courseId: metadata.courseId,
                });
            } catch (error) {
                console.error("Failed to create note via tRPC:", error);
            }

            return {
                uploadedBy: metadata.userId,
                courseId: metadata.courseId,
                pdfUrl: file.ufsUrl,
            };
        }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
