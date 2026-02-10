import { Suspense } from "react";
import { api, HydrateClient } from "~/trpc/server";
import { CourseList } from "~/modules/course/features/course-list";
import { CourseListSkeleton } from "~/modules/course/features/course-list-skeleton";
import { CreateCourseDialog } from "~/modules/course/features/create-course-dialog";

export default async function CoursePage() {
    void api.course.list.prefetch();

    return (
        <HydrateClient>
            <div className="min-h-screen bg-[#020617] p-6 text-slate-200 md:p-10">
                <div className="mx-auto max-w-7xl space-y-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight text-white">
                                Courses
                            </h1>
                            <p className="text-muted-foreground">
                                Browse and manage your courses
                            </p>
                        </div>
                        <CreateCourseDialog />
                    </div>
                    <Suspense fallback={<CourseListSkeleton />}>
                        <CourseList />
                    </Suspense>
                </div>
            </div>
        </HydrateClient>
    );
}
