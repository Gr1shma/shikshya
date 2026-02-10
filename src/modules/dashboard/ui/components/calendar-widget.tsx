"use client";
import React, { useState } from "react";
import { Calendar } from "~/components/ui/calendar";
import { CalendarDays, Flame } from "lucide-react";
import { api } from "~/trpc/react";

export default function CalendarWidget() {
    const [date, setDate] = useState<Date>(new Date());

    const { data: stats } = api.stats.getMyStats.useQuery();
    const streak = stats?.currentStreak ?? 0;
    const highestStreak = stats?.longestStreak ?? 0;

    // Check if a date is within the streak range
    const isStreakDay = (checkDate: Date): boolean => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const check = new Date(checkDate);
        check.setHours(0, 0, 0, 0);

        // Calculate the difference in days
        const diffTime = today.getTime() - check.getTime();
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        // Check if the date is within streak range (0 = today, 1 = yesterday, etc.)
        return diffDays >= 0 && diffDays < streak;
    };

    return (
        <div className="h-full">
            {/* Main Card */}
            <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-800/50 bg-slate-900/50 shadow-xl backdrop-blur-sm">
                {/* Header Section */}
                <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 to-purple-600 p-5">
                    <div className="absolute inset-0 bg-black/10"></div>
                    <div className="relative z-10">
                        <h2 className="mb-0.5 text-xl font-bold text-white">
                            {date.toLocaleDateString("en-US", {
                                month: "long",
                                day: "numeric",
                                year: "numeric",
                            })}
                        </h2>
                        <p className="text-xs text-indigo-100/70">
                            {date.toLocaleDateString("en-US", {
                                weekday: "long",
                            })}
                        </p>
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 h-32 w-32 translate-x-1/2 -translate-y-1/2 rounded-full bg-white/5 blur-2xl"></div>
                </div>

                {/* Calendar Section */}
                <div className="flex flex-1 flex-col p-5">
                    <div className="flex items-center justify-center">
                        <Calendar
                            mode="single"
                            selected={date}
                            onSelect={(newDate) => newDate && setDate(newDate)}
                            modifiers={{
                                streak: (day) => isStreakDay(day),
                            }}
                            modifiersClassNames={{
                                streak: "bg-gradient-to-br from-orange-500/80 to-red-500/80 text-white font-semibold hover:from-orange-500 hover:to-red-500 border-orange-400/50 shadow-md shadow-orange-500/20",
                            }}
                            className="rounded-xl"
                        />
                    </div>

                    {/* Quick Stats */}
                    <div className="mt-auto grid grid-cols-3 gap-3 pt-5">
                        <div className="rounded-xl border border-slate-700/50 bg-slate-900/50 p-3 text-center">
                            <Flame className="mx-auto mb-1.5 h-4 w-4 text-orange-400" />
                            <div className="text-xl font-bold text-orange-400">
                                {streak}
                            </div>
                            <div className="text-muted-foreground mt-0.5 text-[10px]">
                                Streak
                            </div>
                        </div>
                        <div className="rounded-xl border border-slate-700/50 bg-slate-900/50 p-3 text-center">
                            <CalendarDays className="mx-auto mb-1.5 h-4 w-4 text-indigo-400" />
                            <div className="text-xl font-bold text-indigo-400">
                                {new Date().getDate()}
                            </div>
                            <div className="text-muted-foreground mt-0.5 text-[10px]">
                                Today
                            </div>
                        </div>
                        <div className="rounded-xl border border-slate-700/50 bg-slate-900/50 p-3 text-center">
                            <Flame className="mx-auto mb-1.5 h-4 w-4 text-indigo-400" />
                            <div className="text-xl font-bold text-indigo-400">
                                {highestStreak}
                            </div>
                            <div className="text-muted-foreground mt-0.5 text-[10px]">
                                Highest Streak
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
