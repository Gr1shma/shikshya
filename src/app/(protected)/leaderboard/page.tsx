"use client";

import React from "react";
import { api } from "~/trpc/react";

export default function LeaderboardPage() {
    const leaderboardQuery = api.leaderboard.getWeekly.useQuery({
        scope: "global",
    });

    return (
        <div className="min-h-screen bg-[#020617] px-6 py-10 text-slate-200 md:px-10">
            <header className="mb-8">
                <h1 className="text-3xl font-semibold text-white">
                    Leaderboard
                </h1>
                <p className="mt-1 text-sm text-slate-400">
                    Top students this week based on points earned.
                </p>
            </header>

            {leaderboardQuery.isLoading && (
                <div className="text-sm text-slate-400">Loading...</div>
            )}

            {!leaderboardQuery.isLoading &&
                (leaderboardQuery.data?.length ?? 0) === 0 && (
                    <div className="text-sm text-slate-400">
                        No leaderboard data yet.
                    </div>
                )}

            {(leaderboardQuery.data?.length ?? 0) > 0 && (
                <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-950/60">
                    <div className="grid grid-cols-[80px_1fr_120px] gap-2 border-b border-white/10 px-6 py-3 text-xs tracking-wide text-slate-400 uppercase">
                        <span>Rank</span>
                        <span>Student</span>
                        <span className="text-right">Points</span>
                    </div>
                    <div className="divide-y divide-white/5">
                        {leaderboardQuery.data?.map((row, index) => (
                            <div
                                key={row.userId}
                                className="grid grid-cols-[80px_1fr_120px] items-center gap-2 px-6 py-4"
                            >
                                <span className="text-sm text-slate-300">
                                    #{index + 1}
                                </span>
                                <div className="flex items-center gap-3">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-600/20 text-xs font-bold text-indigo-200">
                                        {row.user?.name?.[0]?.toUpperCase() ??
                                            "S"}
                                    </div>
                                    <div className="text-sm text-white">
                                        {row.user?.name ?? "Student"}
                                    </div>
                                </div>
                                <span className="text-right text-sm font-semibold text-indigo-200">
                                    {row.points}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
