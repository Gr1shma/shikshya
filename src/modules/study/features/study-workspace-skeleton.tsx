import { Skeleton } from "~/components/ui/skeleton";

export function StudyWorkspaceSkeleton() {
    return (
        <div className="flex h-[calc(100vh-8rem)] flex-col">
            {/* Header Skeleton */}
            <div className="mb-4 flex items-center gap-4">
                <Skeleton className="h-10 w-10 rounded-lg" />
                <div className="space-y-2">
                    <Skeleton className="h-6 w-48" />
                    <Skeleton className="h-4 w-32" />
                </div>
            </div>

            {/* Split View Skeleton */}
            <div className="grid flex-1 gap-4 overflow-hidden lg:grid-cols-2">
                {/* PDF Viewer Skeleton - Left */}
                <div className="flex flex-col overflow-hidden rounded-lg border border-slate-700/50 bg-slate-900/50">
                    <div className="flex items-center gap-2 border-b border-slate-700/50 px-4 py-3">
                        <Skeleton className="h-4 w-4" />
                        <Skeleton className="h-4 w-20" />
                    </div>
                    <div className="flex-1 p-4">
                        <Skeleton className="h-full w-full" />
                    </div>
                </div>

                {/* Chat Skeleton - Right */}
                <div className="flex flex-col overflow-hidden rounded-lg border border-slate-700/50 bg-slate-900/50">
                    <div className="flex items-center gap-2 border-b border-slate-700/50 px-4 py-3">
                        <Skeleton className="h-4 w-4" />
                        <Skeleton className="h-4 w-16" />
                    </div>
                    <div className="flex-1 space-y-4 p-4">
                        <Skeleton className="ml-auto h-16 w-3/4 rounded-lg" />
                        <Skeleton className="h-24 w-3/4 rounded-lg" />
                        <Skeleton className="ml-auto h-12 w-2/3 rounded-lg" />
                    </div>
                    <div className="border-t border-slate-700/50 p-4">
                        <div className="flex gap-2">
                            <Skeleton className="h-10 flex-1" />
                            <Skeleton className="h-10 w-10" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
