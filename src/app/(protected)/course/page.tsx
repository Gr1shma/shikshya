import { Suspense } from "react";
import { api, HydrateClient } from "~/trpc/server";
import { CourseList } from "~/modules/course/features/course-list";
import { CourseListSkeleton } from "~/modules/course/features/course-list-skeleton";
import { CreateCourseDialog } from "~/modules/course/features/create-course-dialog";

export default async function CoursePage() {
    void api.course.list.prefetch();

    return (
        <HydrateClient>
            <div className="space-y-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-white">
                            Courses
                        </h1>
                        <p className="text-slate-400">
                            Browse and manage your courses
                        </p>
                    </div>
                    <CreateCourseDialog />
                </div>
                <Suspense fallback={<CourseListSkeleton />}>
                    <CourseList />
                </Suspense>
            </div>
        </HydrateClient>
    );
}
