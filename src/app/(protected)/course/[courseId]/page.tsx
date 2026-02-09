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
    void api.course.getById.prefetch({ id: courseId });
    // Prefetch folder contents at root level
    void api.folder.getContents.prefetch({ courseId, folderId: null });

    return (
        <HydrateClient>
            <Suspense fallback={<CourseDetailSkeleton />}>
                <CourseDetail courseId={courseId} />
            </Suspense>
        </HydrateClient>
    );
}
