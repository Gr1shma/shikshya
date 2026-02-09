import { Suspense } from "react";
import { api, HydrateClient } from "~/trpc/server";
import { StudyWorkspace } from "~/modules/study/features/study-workspace";
import { StudyWorkspaceSkeleton } from "~/modules/study/features/study-workspace-skeleton";

interface WorkstationPageProps {
    params: Promise<{ courseId: string; noteId: string }>;
}

export default async function WorkstationPage({
    params,
}: WorkstationPageProps) {
    const { noteId } = await params;
    void api.note.getById.prefetch({ id: noteId });

    return (
        <HydrateClient>
            <Suspense fallback={<StudyWorkspaceSkeleton />}>
                <StudyWorkspace noteId={noteId} />
            </Suspense>
        </HydrateClient>
    );
}
