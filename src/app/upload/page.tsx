"use client";

import { useState } from "react";
import { UploadDropzone } from "~/lib/uploadthing";
import { api } from "~/trpc/react";
import { useSession } from "~/lib/auth-client";
import { toast } from "sonner";

export default function UploadTestPage() {
    const { data: session, isPending: sessionPending } = useSession();
    const [selectedCourseId, setSelectedCourseId] = useState<string>("");
    const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);

    const { data: courses, isLoading: coursesLoading } =
        api.course.list.useQuery(undefined, {
            enabled: !!session?.user,
        });

    if (sessionPending) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="text-lg">Loading session...</div>
            </div>
        );
    }

    if (!session?.user) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="rounded-lg border border-red-500 bg-red-50 p-6 text-center dark:bg-red-950">
                    <h2 className="text-xl font-semibold text-red-700 dark:text-red-400">
                        Authentication Required
                    </h2>
                    <p className="mt-2 text-red-600 dark:text-red-300">
                        Please sign in to test the upload functionality.
                    </p>
                    <a
                        href="/login"
                        className="mt-4 inline-block rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                    >
                        Sign In
                    </a>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 p-8">
            <div className="mx-auto max-w-2xl">
                <h1 className="mb-8 text-center text-3xl font-bold text-white">
                    📄 PDF Upload Test
                </h1>

                {/* User Info */}
                <div className="mb-6 rounded-lg bg-gray-800/50 p-4">
                    <p className="text-sm text-gray-400">
                        Logged in as:{" "}
                        <span className="font-medium text-white">
                            {session.user.email}
                        </span>
                    </p>
                </div>

                {/* Course Selection */}
                <div className="mb-6">
                    <label
                        htmlFor="course-select"
                        className="mb-2 block text-sm font-medium text-gray-300"
                    >
                        Select a Course
                    </label>
                    {coursesLoading ? (
                        <div className="text-gray-400">Loading courses...</div>
                    ) : courses && courses.length > 0 ? (
                        <select
                            id="course-select"
                            value={selectedCourseId}
                            onChange={(e) =>
                                setSelectedCourseId(e.target.value)
                            }
                            className="w-full rounded-lg border border-gray-600 bg-gray-700 p-3 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">-- Select a course --</option>
                            {courses.map((course) => (
                                <option key={course.id} value={course.id}>
                                    {course.title}
                                </option>
                            ))}
                        </select>
                    ) : (
                        <div className="rounded-lg border border-yellow-500 bg-yellow-50 p-4 dark:bg-yellow-950">
                            <p className="text-yellow-700 dark:text-yellow-300">
                                No courses found. Create a course first to test
                                uploads.
                            </p>
                        </div>
                    )}
                </div>

                {/* Upload Dropzone */}
                {selectedCourseId && (
                    <div className="mb-6">
                        <h2 className="mb-4 text-lg font-semibold text-white">
                            Upload PDF
                        </h2>
                        <UploadDropzone
                            endpoint="pdfUploader"
                            input={{ courseId: selectedCourseId }}
                            onClientUploadComplete={(res) => {
                                console.log("Upload complete:", res);
                                if (res?.[0]) {
                                    setUploadedUrl(res[0].ufsUrl);
                                    toast.success("PDF uploaded successfully!");
                                }
                            }}
                            onUploadError={(error: Error) => {
                                console.error("Upload error:", error);
                                toast.error(`Upload failed: ${error.message}`);
                            }}
                            onUploadBegin={(name) => {
                                console.log("Upload starting:", name);
                                toast.info(`Starting upload: ${name}`);
                            }}
                            className="ut-allowed-content:text-gray-400 ut-label:text-gray-300 ut-button:bg-blue-600 ut-button:hover:bg-blue-700 border-dashed border-gray-600 bg-gray-800/50"
                        />
                    </div>
                )}

                {/* Upload Result */}
                {uploadedUrl && (
                    <div className="rounded-lg border border-green-500 bg-green-50 p-4 dark:bg-green-950">
                        <h3 className="font-semibold text-green-700 dark:text-green-400">
                            ✅ Upload Successful!
                        </h3>
                        <p className="mt-2 text-sm break-all text-green-600 dark:text-green-300">
                            <strong>URL:</strong>{" "}
                            <a
                                href={uploadedUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline hover:no-underline"
                            >
                                {uploadedUrl}
                            </a>
                        </p>
                    </div>
                )}

                {/* Info Box */}
                <div className="mt-8 rounded-lg border border-blue-500 bg-blue-50 p-4 dark:bg-blue-950">
                    <h3 className="font-semibold text-blue-700 dark:text-blue-400">
                        ℹ️ How this works
                    </h3>
                    <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-blue-600 dark:text-blue-300">
                        <li>
                            Select a course you own (where you are the teacher)
                        </li>
                        <li>Upload a PDF file (max 16MB)</li>
                        <li>
                            The upload uses tRPC to validate course ownership
                            and create a note
                        </li>
                        <li>
                            After upload, a note is automatically created via{" "}
                            <code className="rounded bg-blue-200 px-1 dark:bg-blue-800">
                                caller.note.create()
                            </code>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
