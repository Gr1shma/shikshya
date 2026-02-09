import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { z } from "zod";
import { headers } from "next/headers";

import { createCaller } from "~/server/api/root";
import { createTRPCContext } from "~/server/api/trpc";
import { extractTextFromPdf } from "~/lib/pdf-parser";
import { db } from "~/server/db";
import { note } from "~/server/db/schema";

const f = createUploadthing();

export const ourFileRouter = {
    pdfUploader: f({
        pdf: {
            maxFileSize: "16MB",
            maxFileCount: 1,
        },
    })
        .input(
            z.object({
                courseId: z.string().uuid(),
                folderId: z.string().uuid().nullable().optional(),
            })
        )
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
                        message:
                            "You are not authorized to upload to this course",
                    });
                }

                return {
                    userId: context.session?.user.id,
                    courseId: input.courseId,
                    folderId: input.folderId,
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
            console.log("Folder ID:", metadata.folderId);
            console.log("File URL:", file.ufsUrl);

            // Extract text content from the uploaded PDF
            let textContent: string | undefined;
            try {
                textContent = await extractTextFromPdf(file.ufsUrl);
                console.log("Extracted text length:", textContent.length);
            } catch (error) {
                console.error("Failed to extract PDF text:", error);
            }

            // Insert directly into database since onUploadComplete runs as a
            // webhook callback without access to original request auth context.
            // User was already validated in middleware, so this is safe.
            try {
                const [created] = await db
                    .insert(note)
                    .values({
                        title: file.name,
                        fileUrl: file.ufsUrl,
                        textContent,
                        courseId: metadata.courseId,
                        folderId: metadata.folderId,
                    })
                    .returning();
                console.log("Note created successfully:", created?.id);
            } catch (error) {
                console.error("Failed to create note in database:", error);
            }

            return {
                uploadedBy: metadata.userId,
                courseId: metadata.courseId,
                folderId: metadata.folderId,
                pdfUrl: file.ufsUrl,
            };
        }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
