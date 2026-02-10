import { Suspense } from "react";
import { api, HydrateClient } from "~/trpc/server";
import { CourseDetail } from "~/modules/course/features/course-detail";
import { CourseDetailSkeleton } from "~/modules/course/features/course-detail-skeleton";

interface CourseDetailPageProps {
    params: Promise<{ courseId: string }>;
}

export default async function CourseDetailPage({
    params,
}: CourseDetailPageProps) {
    const { courseId } = await params;
    await Promise.all([
        api.course.getById.prefetch({ id: courseId }),
        api.folder.getContents.prefetch({ courseId, folderId: null }),
    ]);

    return (
        <HydrateClient>
            <div className="min-h-screen bg-[#020617] p-6 text-slate-200 md:p-10">
                <div className="mx-auto max-w-7xl">
                    <Suspense fallback={<CourseDetailSkeleton />}>
                        <CourseDetail courseId={courseId} />
                    </Suspense>
                </div>
            </div>
        </HydrateClient>
    );
}
