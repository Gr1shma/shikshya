"use client";

import React, { Suspense } from "react";
import { Flame, Trophy, Coins, Sparkles } from "lucide-react";
import { Card, CardContent } from "~/components/ui/card";
import { api } from "~/trpc/react";
import { Skeleton } from "~/components/ui/skeleton";

export const StreakCard = () => {
    return (
        <Card className="relative min-h-[300px] overflow-hidden border-slate-700/50 bg-gradient-to-br from-indigo-900/40 via-slate-900/90 to-slate-900 backdrop-blur-md">
            <div className="absolute -top-6 -right-6 opacity-10 transition-transform group-hover:scale-110">
                <Trophy size={180} className="text-indigo-400" />
            </div>

            <Suspense fallback={<StreakCardSkeleton />}>
                <StreakCardContent />
            </Suspense>
        </Card>
    );
};

const StreakCardContent = () => {
    const [stats] = api.stats.getMyStats.useSuspenseQuery();
    const streak = stats?.currentStreak ?? 0;
    const points = stats?.totalPoints ?? 0;

    return (
        <CardContent className="relative z-10 flex h-full flex-col items-center justify-between p-10 text-center">
            {/* Header */}
            <h3 className="flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-indigo-300/60 uppercase">
                <Sparkles size={14} />
                Streak & Rewards
            </h3>

            <div className="flex w-full items-center justify-around py-4">
                {/* Streak Stat */}
                <div className="flex flex-col items-center gap-4">
                    <div className="relative">
                        <Flame
                            size={64}
                            className="relative z-10 fill-orange-500 text-orange-600 drop-shadow-[0_0_15px_rgba(249,115,22,0.5)] filter"
                        />
                        <div className="absolute inset-0 animate-pulse bg-orange-500/20 blur-3xl" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-5xl font-black tracking-tighter text-white">
                            {streak}
                        </span>
                        <p className="text-[11px] font-bold tracking-widest text-orange-400/80 uppercase">
                            Day Streak
                        </p>
                    </div>
                </div>

                {/* Aesthetic Divider */}
                <div className="h-20 w-[1px] bg-gradient-to-b from-transparent via-slate-700/50 to-transparent" />

                {/* Reward Points Stat */}
                <div className="flex flex-col items-center gap-4">
                    <div className="relative">
                        <Coins
                            size={64}
                            className="relative z-10 fill-yellow-400 text-yellow-600 drop-shadow-[0_0_15px_rgba(250,204,21,0.4)] filter"
                        />
                        <div className="absolute inset-0 animate-pulse bg-yellow-400/10 blur-3xl" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-5xl font-black tracking-tighter text-white">
                            {points}
                        </span>
                        <p className="text-[11px] font-bold tracking-widest text-slate-400 uppercase">
                            Reward Points
                        </p>
                    </div>
                </div>
            </div>

            <div className="w-full">
                <p className="text-sm font-medium tracking-wide whitespace-nowrap text-slate-400">
                    You&apos;re on fire! Complete one more lesson today to keep
                    your
                    <span className="mx-1 text-orange-400 underline decoration-orange-500/30 underline-offset-4">
                        {streak} day streak
                    </span>
                    alive.
                </p>
            </div>
        </CardContent>
    );
};

const StreakCardSkeleton = () => {
    return (
        <CardContent className="relative z-10 flex h-full flex-col items-center justify-between p-10 text-center">
            {/* Header Skeleton */}
            <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-4 rounded-full bg-indigo-900/50" />
                <Skeleton className="h-4 w-32 bg-indigo-900/50" />
            </div>

            <div className="flex w-full items-center justify-around py-4">
                {/* Streak Stat Skeleton */}
                <div className="flex flex-col items-center gap-4">
                    <Skeleton className="h-16 w-16 rounded-full bg-slate-800/50" />
                    <div className="flex flex-col items-center gap-2">
                        <Skeleton className="h-12 w-16 bg-slate-800/50" />
                        <Skeleton className="h-3 w-20 bg-slate-800/50" />
                    </div>
                </div>

                {/* Divider Skeleton */}
                <div className="h-20 w-[1px] bg-slate-800/50" />

                {/* Reward Points Stat Skeleton */}
                <div className="flex flex-col items-center gap-4">
                    <Skeleton className="h-16 w-16 rounded-full bg-slate-800/50" />
                    <div className="flex flex-col items-center gap-2">
                        <Skeleton className="h-12 w-16 bg-slate-800/50" />
                        <Skeleton className="h-3 w-24 bg-slate-800/50" />
                    </div>
                </div>
            </div>

            <div className="flex w-full justify-center">
                <Skeleton className="h-5 w-3/4 bg-slate-800/50" />
            </div>
        </CardContent>
    );
};
