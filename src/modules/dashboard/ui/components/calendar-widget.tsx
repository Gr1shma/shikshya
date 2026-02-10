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
                                year: "numeric",
                            })}
                        </h2>
                        <p className="text-xs text-indigo-100/70">
                            {date.toLocaleDateString("en-US", {
                                weekday: "long",
                                day: "numeric",
                            })}
                        </p>
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 h-32 w-32 translate-x-1/2 -translate-y-1/2 rounded-full bg-white/5 blur-2xl"></div>
                </div>

                {/* Calendar Section */}
                <div className="p-5">
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
                            classNames={{
                                months: "flex flex-col space-y-4",
                                month: "space-y-3 w-full",
                                caption:
                                    "flex justify-center pt-1 relative items-center mb-3",
                                caption_label:
                                    "text-base font-semibold text-slate-100",
                                nav: "space-x-1 flex justify-between items-center",
                                nav_button:
                                    "h-8 w-8 bg-slate-800/50 hover:bg-slate-700/50 text-slate-300 hover:text-white rounded-lg transition-all duration-200 flex items-center justify-center border border-slate-700/30 hover:border-indigo-500/50",
                                nav_button_previous: "absolute left-1",
                                nav_button_next: "absolute right-1",
                                table: "w-full border-collapse",
                                head_row: "flex justify-between mb-1",
                                head_cell:
                                    "text-slate-400 rounded-lg w-9 font-medium text-xs uppercase",
                                row: "flex w-full mt-1 justify-between",
                                cell: "relative p-0 text-center text-xs focus-within:relative focus-within:z-20 rounded-lg",
                                day: "h-9 w-9 p-0 font-normal text-slate-300 hover:bg-indigo-600/20 hover:text-white rounded-lg transition-all duration-200 flex items-center justify-center border border-transparent hover:border-indigo-500/30",
                                day_selected:
                                    "bg-gradient-to-br from-indigo-600 to-purple-600 text-white hover:bg-indigo-600 hover:text-white focus:bg-indigo-600 focus:text-white shadow-md shadow-indigo-500/20 border-indigo-400/50",
                                day_today:
                                    "bg-slate-800/80 text-indigo-300 font-semibold border-indigo-500/50 ring-2 ring-indigo-500/30",
                                day_outside: "text-slate-600 opacity-40",
                                day_disabled: "text-slate-700 opacity-50",
                                day_range_middle:
                                    "aria-selected:bg-slate-700/30 aria-selected:text-slate-300",
                                day_hidden: "invisible",
                            }}
                        />
                    </div>

                    {/* Quick Stats */}
                    <div className="mt-5 grid grid-cols-3 gap-3">
                        <div className="rounded-xl border border-slate-700/30 bg-slate-800/30 p-3 text-center">
                            <Flame className="mx-auto mb-1.5 h-4 w-4 text-orange-400" />
                            <div className="text-xl font-bold text-orange-400">
                                {streak}
                            </div>
                            <div className="mt-0.5 text-[10px] text-slate-400">
                                Streak
                            </div>
                        </div>
                        <div className="rounded-xl border border-slate-700/30 bg-slate-800/30 p-3 text-center">
                            <CalendarDays className="mx-auto mb-1.5 h-4 w-4 text-indigo-400" />
                            <div className="text-xl font-bold text-indigo-400">
                                {date.getDate()}
                            </div>
                            <div className="mt-0.5 text-[10px] text-slate-400">
                                Today
                            </div>
                        </div>
                        <div className="rounded-xl border border-slate-700/30 bg-slate-800/30 p-3 text-center">
                            <Flame className="mx-auto mb-1.5 h-4 w-4 text-orange-400" />
                            <div className="text-xl font-bold text-pink-400">
                                {highestStreak}
                            </div>
                            <div className="mt-0.5 text-[10px] text-slate-400">
                                Highest Streak
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
