"use client";

import React, { Suspense } from "react";
import { ArrowUpRight, BookOpenCheck } from "lucide-react";
import { Card } from "~/components/ui/card";
import { Skeleton } from "~/components/ui/skeleton";
import { api } from "~/trpc/react";
import { useSession } from "~/lib/auth-client";
import { type RouterOutputs } from "~/trpc/react";

type Course = RouterOutputs["course"]["listMine"][number];
type Enrollment = RouterOutputs["enrollment"]["listMine"][number];

const CourseCard = ({
    course,
}: {
    course:
        | {
              id: string;
              title: string;
              joinCode: string;
          }
        | Course
        | Enrollment;
}) => {
    // Determine color based on course ID or title hash for consistency
    const colors = [
        {
            border: "border-blue-500",
            bg: "bg-blue-500",
            glow: "shadow-blue-500/20",
            text: "text-blue-400",
        },
        {
            border: "border-purple-500",
            bg: "bg-purple-500",
            glow: "shadow-purple-500/20",
            text: "text-purple-400",
        },
        {
            border: "border-green-500",
            bg: "bg-green-500",
            glow: "shadow-green-500/20",
            text: "text-green-400",
        },
        {
            border: "border-orange-500",
            bg: "bg-orange-500",
            glow: "shadow-orange-500/20",
            text: "text-orange-400",
        },
    ];

    const colorIndex =
        course.id.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) %
        colors.length;
    const theme = colors[colorIndex]!;

    return (
        <Card
            className={`group relative overflow-hidden border-slate-800/60 bg-[#16161e]/80 p-4 backdrop-blur-xl transition-all hover:border-slate-600 hover:bg-[#1a1b26] active:scale-[0.99]`}
        >
            {/* Interactive Accent Glow */}
            <div
                className={`absolute top-0 left-0 h-full w-[3px] ${theme.bg} opacity-0 transition-opacity group-hover:opacity-100`}
            />

            <div className="flex items-center gap-5">
                {/* Course Icon Badge */}
                <div
                    className={`flex size-12 shrink-0 items-center justify-center rounded-xl border-2 ${theme.border} bg-[#0a0a0c] shadow-lg ${theme.glow}`}
                >
                    <span
                        className={`text-[11px] font-black tracking-tighter ${theme.text}`}
                    >
                        {course.title
                            ?.split(" ")[0]
                            ?.substring(0, 3)
                            .toUpperCase() ?? "CRS"}
                    </span>
                </div>

                <div className="flex min-w-0 flex-col">
                    <h4 className="truncate text-base font-bold text-white transition-colors group-hover:text-indigo-100">
                        {course.title}
                    </h4>
                    <span className="font-mono text-[11px] font-bold text-slate-500 group-hover:text-slate-400">
                        {course.joinCode}
                    </span>
                </div>

                <div className="ml-auto rounded-full border border-slate-800 bg-slate-900/50 p-2 transition-all group-hover:border-indigo-500/50">
                    <ArrowUpRight
                        className={`size-4 text-slate-500 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-indigo-400`}
                    />
                </div>
            </div>
        </Card>
    );
};

const CourseCardSkeleton = () => {
    return (
        <Card className="border-slate-800/60 bg-[#16161e]/80 p-4 backdrop-blur-xl">
            <div className="flex items-center gap-5">
                {/* Icon Badge Skeleton */}
                <Skeleton className="size-12 shrink-0 rounded-xl bg-slate-800/50" />

                <div className="flex min-w-0 flex-1 flex-col gap-2">
                    {/* Title Skeleton */}
                    <Skeleton className="h-5 w-3/4 bg-slate-800/50" />
                    {/* Join Code Skeleton */}
                    <Skeleton className="h-3 w-24 bg-slate-800/50" />
                </div>

                {/* Arrow Icon Skeleton */}
                <Skeleton className="size-8 shrink-0 rounded-full bg-slate-800/50" />
            </div>
        </Card>
    );
};

const CoursesListSkeleton = () => {
    return (
        <div className="grid grid-cols-1 gap-3">
            {[1, 2, 3].map((i) => (
                <CourseCardSkeleton key={i} />
            ))}
        </div>
    );
};

const TeacherCourses = () => {
    const [courses] = api.course.listMine.useSuspenseQuery();

    if (courses.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-slate-800 p-8 text-center text-slate-500">
                <p className="text-sm">No courses created yet.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-3">
            {courses.map((course) => (
                <CourseCard key={course.id} course={course} />
            ))}
        </div>
    );
};

const StudentEnrolledCourses = () => {
    const [enrollments] = api.enrollment.listMine.useSuspenseQuery();

    if (enrollments.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-slate-800 p-8 text-center text-slate-500">
                <p className="text-sm">Not enrolled in any courses.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-3">
            {enrollments.map((enrollment) => (
                <CourseCard key={enrollment.id} course={enrollment} />
            ))}
        </div>
    );
};

export const PinnedCourses = () => {
    const { data: session } = useSession();
    const role = (session?.user as { role?: "teacher" | "student" })?.role;

    if (!role) return null;

    return (
        <section className="w-full space-y-4">
            <div className="flex items-center justify-between px-1">
                <h2 className="flex items-center gap-2 text-[11px] font-black tracking-[0.2em] text-slate-200 uppercase">
                    <BookOpenCheck className="size-3.5 rotate-45 fill-indigo-500/20 text-indigo-500" />
                    {role === "student" ? "Enrolled" : "Created"} Courses
                </h2>
            </div>

            <Suspense fallback={<CoursesListSkeleton />}>
                {role === "teacher" ? (
                    <TeacherCourses />
                ) : (
                    <StudentEnrolledCourses />
                )}
            </Suspense>
        </section>
    );
};
