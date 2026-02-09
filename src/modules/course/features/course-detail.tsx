"use client";

import { useState } from "react";
import Link from "next/link";
import {
    ArrowLeft,
    FileText,
    Upload,
    Calendar,
    BookOpen,
    Plus,
    X,
    Trash2,
} from "lucide-react";
import { api } from "~/trpc/react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { authClient } from "~/lib/auth-client";
import {
    FileUpload,
    FileUploadDropzone,
    FileUploadList,
    FileUploadItem,
    FileUploadItemPreview,
    FileUploadItemMetadata,
    FileUploadItemProgress,
    FileUploadItemDelete,
} from "~/components/ui/file-upload";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { CreateFolderDialog } from "~/modules/course/features/create-folder-dialog";
import { useUploadThing } from "~/lib/uploadthing";
import { toast } from "sonner";
import { Folder } from "lucide-react";

interface CourseDetailProps {
    courseId: string;
}

export function CourseDetail({ courseId }: CourseDetailProps) {
    const [currentFolderId, setCurrentFolderId] = useState<string | null>(null);
    const [isCreateFolderOpen, setIsCreateFolderOpen] = useState(false);

    const [course] = api.course.getById.useSuspenseQuery({ id: courseId });
    // Fetch folder contents (folders + notes)
    const [contents] = api.folder.getContents.useSuspenseQuery({
        courseId,
        folderId: currentFolderId,
    });

    // Fetch current folder details for breadcrumbs/title
    const { data: currentFolder } = api.folder.getById.useQuery(
        { id: currentFolderId! },
        { enabled: !!currentFolderId }
    );

    const { data: session } = authClient.useSession();
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

    const utils = api.useUtils();

    const { startUpload, isUploading } = useUploadThing("pdfUploader", {
        onClientUploadComplete: (res) => {
            console.log("Upload complete:", res);
            if (res?.[0]) {
                toast.success("PDF uploaded successfully!");
                setIsUploadModalOpen(false);
                setUploadedFiles([]);
                void utils.folder.getContents.invalidate({
                    courseId,
                    folderId: currentFolderId,
                });
            }
        },
        onUploadError: (error: Error) => {
            console.error("Upload error:", error);
            toast.error(`Upload failed: ${error.message}`);
        },
        onUploadBegin: (name) => {
            console.log("Upload starting:", name);
            toast.info(`Starting upload: ${name}`);
        },
    });

    const handleUpload = async (
        files: File[],
        options: {
            onProgress: (file: File, progress: number) => void;
            onSuccess: (file: File) => void;
            onError: (file: File, error: Error) => void;
        }
    ) => {
        try {
            await startUpload(files, { courseId, folderId: currentFolderId });
            files.forEach((file) => options.onSuccess(file));
        } catch (error) {
            const err = error instanceof Error ? error : new Error("Upload failed");
            files.forEach((file) => options.onError(file, err));
        }
    };

    const user = session?.user as { id?: string; role?: string } | undefined;
    const isOwner = user?.id === course?.teacherId;
    const isTeacherOrAdmin = user?.role === "teacher" || user?.role === "admin";
    const canUpload = isOwner && isTeacherOrAdmin;

    if (!course) {
        return (
            <div className="flex flex-col items-center justify-center py-16 text-center">
                <BookOpen className="mb-4 h-16 w-16 text-slate-600" />
                <h3 className="text-xl font-semibold text-white">
                    Course not found
                </h3>
                <p className="mt-2 text-slate-400">
                    The course you&apos;re looking for doesn&apos;t exist
                </p>
                <Link href="/course">
                    <Button className="mt-4" variant="outline">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Courses
                    </Button>
                </Link>
            </div>
        );
    }

    return (
        <>
            <div className="space-y-8">
                {/* Header */}
                <div className="flex items-start justify-between">
                    <div className="space-y-1">
                        <div className="flex items-center gap-4">
                            {currentFolderId ? (
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() =>
                                        setCurrentFolderId(
                                            currentFolder?.parentId ?? null
                                        )
                                    }
                                >
                                    <ArrowLeft className="h-5 w-5" />
                                </Button>
                            ) : (
                                <Link href="/course">
                                    <Button variant="ghost" size="icon">
                                        <ArrowLeft className="h-5 w-5" />
                                    </Button>
                                </Link>
                            )}
                            <div>
                                <h1 className="text-3xl font-bold tracking-tight text-white">
                                    {currentFolderId
                                        ? currentFolder?.name
                                        : course.title}
                                </h1>
                                <p className="text-slate-400">
                                    {currentFolderId
                                        ? "Folder"
                                        : (course.description ??
                                            "No description")}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Badge
                            variant="secondary"
                            className="bg-indigo-500/20 text-indigo-400"
                        >
                            Join Code: {course.joinCode}
                        </Badge>
                        {canUpload && (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button className="gap-2 bg-indigo-600 hover:bg-indigo-700">
                                        <Plus className="h-4 w-4" />
                                        Create
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-48">
                                    <DropdownMenuItem
                                        onClick={() =>
                                            setIsCreateFolderOpen(true)
                                        }
                                    >
                                        <Folder className="mr-2 h-4 w-4" />
                                        New Folder
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        onClick={() =>
                                            setIsUploadModalOpen(true)
                                        }
                                    >
                                        <Upload className="mr-2 h-4 w-4" />
                                        Upload PDF
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        )}
                    </div>
                </div>

                {/* Content Section */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold text-white">
                            Contents
                        </h2>
                        <span className="text-sm text-slate-400">
                            {contents.folders.length} folder
                            {contents.folders.length !== 1 ? "s" : ""},{" "}
                            {contents.notes.length} note
                            {contents.notes.length !== 1 ? "s" : ""}
                        </span>
                    </div>

                    {contents.folders.length === 0 &&
                        contents.notes.length === 0 ? (
                        <Card className="border-dashed border-slate-700 bg-slate-900/30">
                            <CardContent className="flex flex-col items-center justify-center py-12">
                                <FileText className="mb-4 h-12 w-12 text-slate-600" />
                                <p className="text-slate-400">No content yet</p>
                                {canUpload && (
                                    <div className="mt-4 flex gap-2">
                                        <Button
                                            variant="outline"
                                            className="border-indigo-500/50 text-indigo-400 hover:bg-indigo-500/10"
                                            onClick={() =>
                                                setIsCreateFolderOpen(true)
                                            }
                                        >
                                            <Folder className="mr-2 h-4 w-4" />
                                            Create Folder
                                        </Button>
                                        <Button
                                            variant="outline"
                                            className="border-indigo-500/50 text-indigo-400 hover:bg-indigo-500/10"
                                            onClick={() =>
                                                setIsUploadModalOpen(true)
                                            }
                                        >
                                            <Upload className="mr-2 h-4 w-4" />
                                            Upload PDF
                                        </Button>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {/* Folders */}
                            {contents.folders.map((folder) => (
                                <div
                                    key={folder.id}
                                    className="group cursor-pointer"
                                    onClick={() =>
                                        setCurrentFolderId(folder.id)
                                    }
                                >
                                    <Card className="h-full border-slate-700/50 bg-slate-900/50 transition-all hover:border-indigo-500/50 hover:bg-slate-900/80">
                                        <CardHeader className="pb-3">
                                            <CardTitle className="flex items-center gap-3 text-base text-white group-hover:text-indigo-400">
                                                <Folder className="mt-0.5 h-5 w-5 shrink-0 text-indigo-400 fill-indigo-400/20" />
                                                <span className="line-clamp-2">
                                                    {folder.name}
                                                </span>
                                            </CardTitle>
                                        </CardHeader>
                                    </Card>
                                </div>
                            ))}

                            {/* Notes */}
                            {contents.notes.map((note) => (
                                <Link
                                    key={note.id}
                                    href={`/course/${courseId}/note/${note.id}`}
                                    className="group"
                                >
                                    <Card className="h-full border-slate-700/50 bg-slate-900/50 transition-all hover:border-indigo-500/50 hover:bg-slate-900/80">
                                        <CardHeader className="pb-3">
                                            <CardTitle className="flex items-start gap-3 text-base text-white group-hover:text-indigo-400">
                                                <FileText className="mt-0.5 h-5 w-5 shrink-0 text-indigo-400" />
                                                <span className="line-clamp-2">
                                                    {note.title}
                                                </span>
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="flex items-center gap-1 text-xs text-slate-500">
                                                <Calendar className="h-3 w-3" />
                                                <span>
                                                    {new Date(
                                                        note.createdAt
                                                    ).toLocaleDateString()}
                                                </span>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Upload Modal */}
            {isUploadModalOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center"
                    onClick={() => setIsUploadModalOpen(false)}
                >
                    {/* Backdrop */}
                    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

                    {/* Modal Content */}
                    <div
                        className="relative z-10 w-full max-w-lg rounded-xl border border-slate-700 bg-slate-900 p-6 shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button */}
                        <button
                            className="absolute right-4 top-4 rounded-full p-1 text-slate-400 transition-colors hover:bg-slate-800 hover:text-white"
                            onClick={() => setIsUploadModalOpen(false)}
                        >
                            <X className="h-5 w-5" />
                        </button>

                        {/* Modal Header */}
                        <div className="mb-6">
                            <h2 className="text-xl font-semibold text-white">
                                Upload PDF
                            </h2>
                            <p className="mt-1 text-sm text-slate-400">
                                Upload a PDF file to add notes to{" "}
                                <span className="font-medium text-indigo-400">
                                    {course.title}
                                </span>
                            </p>
                        </div>

                        {/* File Upload Component */}
                        <FileUpload
                            value={uploadedFiles}
                            onValueChange={setUploadedFiles}
                            onUpload={handleUpload}
                            accept=".pdf,application/pdf"
                            maxFiles={1}
                            maxSize={16 * 1024 * 1024}
                            disabled={isUploading}
                            className="w-full"
                        >
                            <FileUploadDropzone className="border-slate-600 bg-slate-800/50 hover:bg-slate-800/80">
                                <div className="flex flex-col items-center gap-2 text-center">
                                    <div className="rounded-full border border-dashed border-slate-500 p-3">
                                        <Upload className="h-6 w-6 text-slate-400" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-slate-300">
                                            Drop your PDF here or click to browse
                                        </p>
                                        <p className="mt-1 text-sm text-slate-500">
                                            PDF files only, max 16MB
                                        </p>
                                    </div>
                                </div>
                            </FileUploadDropzone>

                            <FileUploadList className="mt-4">
                                {uploadedFiles.map((file) => (
                                    <FileUploadItem
                                        key={file.name}
                                        value={file}
                                        className="border-slate-700 bg-slate-800/50"
                                    >
                                        <FileUploadItemPreview className="border-slate-600 bg-slate-700/50 text-indigo-400" />
                                        <FileUploadItemMetadata className="text-slate-300" />
                                        <FileUploadItemProgress className="bg-indigo-500/20 [&>div]:bg-indigo-500" />
                                        <FileUploadItemDelete asChild>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 text-slate-400 hover:bg-slate-700 hover:text-red-400"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </FileUploadItemDelete>
                                    </FileUploadItem>
                                ))}
                            </FileUploadList>
                        </FileUpload>
                    </div>
                </div>
            )}

            <CreateFolderDialog
                courseId={courseId}
                parentId={currentFolderId}
                open={isCreateFolderOpen}
                onOpenChange={setIsCreateFolderOpen}
            />
        </>
    );
}
