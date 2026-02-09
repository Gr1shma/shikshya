"use client";

import Link from "next/link";
import { BookOpen, Calendar } from "lucide-react";
import { api } from "~/trpc/react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";

export function CourseList() {
    const [courses] = api.course.list.useSuspenseQuery();

    if (courses.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-16 text-center">
                <BookOpen className="mb-4 h-16 w-16 text-slate-600" />
                <h3 className="text-xl font-semibold text-white">
                    No courses yet
                </h3>
                <p className="mt-2 text-slate-400">
                    Create your first course to get started
                </p>
            </div>
        );
    }

    return (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
                <Link
                    key={course.id}
                    href={`/course/${course.id}`}
                    className="group"
                >
                    <Card className="h-full border-slate-700/50 bg-slate-900/50 transition-all hover:border-indigo-500/50 hover:bg-slate-900/80">
                        <CardHeader>
                            <div className="flex items-start justify-between">
                                <CardTitle className="text-lg text-white group-hover:text-indigo-400">
                                    {course.title}
                                </CardTitle>
                                <Badge
                                    variant="secondary"
                                    className="bg-indigo-500/20 text-indigo-400"
                                >
                                    {course.joinCode}
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="mb-4 line-clamp-2 text-sm text-slate-400">
                                {course.description ?? "No description"}
                            </p>
                            <div className="flex items-center gap-4 text-xs text-slate-500">
                                <div className="flex items-center gap-1">
                                    <Calendar className="h-3 w-3" />
                                    <span>
                                        {new Date(
                                            course.createdAt
                                        ).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </Link>
            ))}
        </div>
    );
}
