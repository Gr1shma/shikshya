"use client";

import React, { Suspense } from "react";
import { BookOpenCheck } from "lucide-react";
import { Card } from "~/components/ui/card";
import { Skeleton } from "~/components/ui/skeleton";
import Link from "next/link";
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
    return (
        <Link href={`/course/${course.id}`} className="block">
            <Card
                className={`group relative overflow-hidden border-slate-700/50 bg-slate-900/50 p-4 backdrop-blur-xl transition-all hover:border-indigo-500/50 hover:bg-slate-900/80 active:scale-[0.99]`}
            >
                {/* Interactive Accent Glow */}
                <div
                    className={`absolute top-0 left-0 h-full w-[3px] bg-indigo-500 opacity-0 transition-opacity group-hover:opacity-100`}
                />

                <div className="flex items-center gap-5">
                    {/* Course Icon Badge */}
                    <div
                        className={`flex size-12 shrink-0 items-center justify-center rounded-xl border-2 border-indigo-500/50 bg-slate-900/80 shadow-lg shadow-indigo-500/20`}
                    >
                        <span
                            className={`text-[11px] font-black tracking-tighter text-indigo-400`}
                        >
                            {course.title
                                ?.split(" ")[0]
                                ?.substring(0, 3)
                                .toUpperCase() ?? "CRS"}
                        </span>
                    </div>

                    <div className="flex min-w-0 flex-col">
                        <h4 className="truncate text-base font-semibold text-white transition-colors group-hover:text-indigo-300">
                            {course.title}
                        </h4>
                        <span className="text-muted-foreground font-mono text-[11px] font-bold group-hover:text-slate-400">
                            {course.joinCode}
                        </span>
                    </div>
                </div>
            </Card>
        </Link>
    );
};

const CourseCardSkeleton = () => {
    return (
        <Card className="border-slate-700/50 bg-slate-900/50 p-4 backdrop-blur-xl">
            <div className="flex items-center gap-5">
                {/* Icon Badge Skeleton */}
                <Skeleton className="size-12 shrink-0 rounded-xl bg-slate-700/50" />

                <div className="flex min-w-0 flex-1 flex-col gap-2">
                    {/* Title Skeleton */}
                    <Skeleton className="h-5 w-3/4 bg-slate-700/50" />
                    {/* Join Code Skeleton */}
                    <Skeleton className="h-3 w-24 bg-slate-700/50" />
                </div>

                {/* Arrow Icon Skeleton */}
                <Skeleton className="size-8 shrink-0 rounded-full bg-slate-700/50" />
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
            <div className="text-muted-foreground flex flex-col items-center justify-center rounded-lg border border-dashed border-indigo-500/30 p-8 text-center">
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
            <div className="text-muted-foreground flex flex-col items-center justify-center rounded-lg border border-dashed border-indigo-500/30 p-8 text-center">
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
