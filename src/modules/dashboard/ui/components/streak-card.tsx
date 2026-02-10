"use client";

import React from "react";
import { Flame, Trophy } from "lucide-react";
import { Card, CardContent } from "~/components/ui/card";
import { api } from "~/trpc/react";

export const StreakCard = () => {
    const { data: stats } = api.stats.getMyStats.useQuery();
    const streak = stats?.currentStreak ?? 0;
    const points = stats?.totalPoints ?? 0;

    return (
        <Card className="relative overflow-hidden border-slate-700/50 bg-gradient-to-r from-indigo-900/40 to-slate-900/80 backdrop-blur-md">
            <div className="absolute top-0 right-0 p-4 opacity-10">
                <Trophy size={120} className="text-indigo-400" />
            </div>
            <CardContent className="p-8">
                <h3 className="flex items-center gap-2 text-lg font-medium text-indigo-300">
                    Streak & Rewards
                </h3>
                <div className="mt-4 grid gap-6 md:grid-cols-2">
                    <div className="animate-pulse rounded-2xl border border-orange-500/30 bg-orange-500/20 p-3">
                        <Flame
                            size={48}
                            className="fill-orange-500 text-orange-500"
                        />
                    </div>
                    <div className="space-y-4">
                        <div>
                            <span className="text-3xl font-black tracking-tighter text-white">
                                {streak}
                            </span>
                            <p className="ml-1 font-medium text-slate-400">
                                day streak
                            </p>
                        </div>
                        <div>
                            <span className="text-3xl font-black tracking-tighter text-white">
                                {points}
                            </span>
                            <p className="ml-1 font-medium text-slate-400">
                                reward points
                            </p>
                        </div>
                    </div>
                </div>
                <p className="mt-6 max-w-md text-sm text-slate-400">
                    You&apos;re on fire! Complete one more lesson today to keep
                    your 7-day streak alive.
                </p>
            </CardContent>
        </Card>
    );
};
