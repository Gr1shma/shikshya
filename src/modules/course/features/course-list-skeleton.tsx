import { Skeleton } from "~/components/ui/skeleton";

export function CourseListSkeleton() {
    return (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
                <div
                    key={i}
                    className="rounded-lg border border-slate-700/50 bg-slate-900/50 p-6"
                >
                    <div className="mb-4 flex items-start justify-between">
                        <Skeleton className="h-6 w-3/4" />
                        <Skeleton className="h-5 w-16" />
                    </div>
                    <Skeleton className="mb-2 h-4 w-full" />
                    <Skeleton className="mb-4 h-4 w-2/3" />
                    <Skeleton className="h-3 w-24" />
                </div>
            ))}
        </div>
    );
}
