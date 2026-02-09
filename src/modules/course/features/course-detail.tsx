"use client";

import Link from "next/link";
import {
    ArrowLeft,
    FileText,
    Upload,
    Calendar,
    BookOpen,
    Plus,
} from "lucide-react";
import { api } from "~/trpc/react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { authClient } from "~/lib/auth-client";

interface CourseDetailProps {
    courseId: string;
}

export function CourseDetail({ courseId }: CourseDetailProps) {
    const [course] = api.course.getById.useSuspenseQuery({ id: courseId });
    const [notes] = api.note.list.useSuspenseQuery();
    const { data: session } = authClient.useSession();

    const courseNotes = notes.filter((note) => note.courseId === courseId);
    const user = session?.user as { role?: string } | undefined;
    const isTeacher = user?.role === "teacher";

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
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-start justify-between">
                <div className="space-y-1">
                    <div className="flex items-center gap-4">
                        <Link href="/course">
                            <Button variant="ghost" size="icon">
                                <ArrowLeft className="h-5 w-5" />
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight text-white">
                                {course.title}
                            </h1>
                            <p className="text-slate-400">
                                {course.description ?? "No description"}
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
                    {isTeacher && (
                        <Link href={`/upload?courseId=${courseId}`}>
                            <Button className="bg-indigo-600 hover:bg-indigo-700">
                                <Upload className="mr-2 h-4 w-4" />
                                Upload PDF
                            </Button>
                        </Link>
                    )}
                </div>
            </div>

            {/* Notes Section */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-white">Notes</h2>
                    <span className="text-sm text-slate-400">
                        {courseNotes.length} note
                        {courseNotes.length !== 1 ? "s" : ""}
                    </span>
                </div>

                {courseNotes.length === 0 ? (
                    <Card className="border-dashed border-slate-700 bg-slate-900/30">
                        <CardContent className="flex flex-col items-center justify-center py-12">
                            <FileText className="mb-4 h-12 w-12 text-slate-600" />
                            <p className="text-slate-400">No notes yet</p>
                            {isTeacher && (
                                <Link href={`/upload?courseId=${courseId}`}>
                                    <Button
                                        variant="outline"
                                        className="mt-4 border-indigo-500/50 text-indigo-400 hover:bg-indigo-500/10"
                                    >
                                        <Plus className="mr-2 h-4 w-4" />
                                        Add your first note
                                    </Button>
                                </Link>
                            )}
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {courseNotes.map((note) => (
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
    );
}
