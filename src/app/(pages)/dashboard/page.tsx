"use client";

import React from "react";
import {
    Flame,
    BookOpen,
    ChevronRight,
    Trophy,
    Clock,
    Bell,
} from "lucide-react";
import { Card, CardContent } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Calendar } from "~/components/ui/calendar";

export default function Dashboard() {
    const [date, setDate] = React.useState<Date | undefined>(new Date());
    // Mock data for the dashboard
    const pinnedCourses = [
        {
            id: 1,
            name: "Bct i/ii",
            progress: 65,
            color: "from-blue-500 to-indigo-500",
        },
        {
            id: 2,
            name: "Bct iii/i",
            progress: 30,
            color: "from-purple-500 to-pink-500",
        },
    ];

    const streakPoints = 1240;

    return (
        <div className="min-h-screen bg-[#020617] p-6 text-slate-200 md:p-10">
            {/* Top Navigation / Header */}
            <header className="mx-auto mb-10 flex max-w-7xl items-center justify-between">
                <div>
                    <h1 className="flex items-center gap-2 text-2xl font-bold text-white">
                        Hello <span className="text-indigo-400">@user</span>,
                    </h1>
                    <p className="text-slate-400">
                        Welcome to{" "}
                        <span className="font-semibold tracking-tight text-indigo-400">
                            Shik<span className="text-lg">क्ष</span>ya
                        </span>
                    </p>
                </div>
                <div className="flex gap-4">
                    <Button
                        variant="outline"
                        className="size-10 rounded-full border-slate-800 bg-slate-900/50 p-0 hover:bg-slate-800"
                    >
                        <Bell className="size-5 text-indigo-400" />
                    </Button>
                    <div className="flex size-10 items-center justify-center rounded-full border-2 border-indigo-400/30 bg-indigo-600 font-bold text-white">
                        U
                    </div>
                </div>
            </header>

            <main className="mx-auto grid max-w-7xl grid-cols-1 gap-8 lg:grid-cols-3">
                {/* Left Column: Streak & Pinned Courses */}
                <div className="space-y-8 lg:col-span-2">
                    {/* Streak Card */}
                    <Card className="relative overflow-hidden border-slate-700/50 bg-gradient-to-r from-indigo-900/40 to-slate-900/80 backdrop-blur-md">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <Trophy size={120} className="text-indigo-400" />
                        </div>
                        <CardContent className="p-8">
                            <h3 className="flex items-center gap-2 text-lg font-medium text-indigo-300">
                                Your Streak
                            </h3>
                            <div className="mt-4 flex items-end gap-3">
                                <div className="animate-pulse rounded-2xl border border-orange-500/30 bg-orange-500/20 p-3">
                                    <Flame
                                        size={48}
                                        className="fill-orange-500 text-orange-500"
                                    />
                                </div>
                                <div>
                                    <span className="text-5xl font-black tracking-tighter text-white">
                                        {streakPoints}
                                    </span>
                                    <p className="ml-1 font-medium text-slate-400">
                                        streak points
                                    </p>
                                </div>
                            </div>
                            <p className="mt-6 max-w-md text-sm text-slate-400">
                                You&apos;re on fire! Complete one more lesson today
                                to keep your 7-day streak alive.
                            </p>
                        </CardContent>
                    </Card>

                    {/* Pinned Courses Section */}
                    <section className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="flex items-center gap-2 text-xl font-semibold text-white">
                                <BookOpen className="size-5 text-indigo-400" />
                                Pinned Courses
                            </h2>
                            <Button
                                variant="link"
                                className="text-sm text-indigo-400"
                            >
                                View All
                            </Button>
                        </div>

                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                            {pinnedCourses.map((course) => (
                                <Card
                                    key={course.id}
                                    className="group cursor-pointer border-slate-800 bg-slate-900/40 transition-all hover:scale-[1.02] hover:bg-slate-900/60 active:scale-95"
                                >
                                    <CardContent className="p-6">
                                        <div className="mb-6 flex items-start justify-between">
                                            <div
                                                className={`size-12 rounded-xl bg-gradient-to-br ${course.color} flex items-center justify-center shadow-lg shadow-indigo-500/20`}
                                            >
                                                <span className="text-xs font-bold text-white uppercase">
                                                    Bct
                                                </span>
                                            </div>
                                            <ChevronRight className="text-slate-600 transition-colors group-hover:text-indigo-400" />
                                        </div>
                                        <h4 className="mb-2 text-lg font-bold text-white">
                                            {course.name}
                                        </h4>
                                        <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800">
                                            <div
                                                className="h-full rounded-full bg-indigo-500 transition-all duration-1000"
                                                style={{
                                                    width: `${course.progress}%`,
                                                }}
                                            />
                                        </div>
                                        <p className="mt-2 text-xs text-slate-500">
                                            {course.progress}% Completed
                                        </p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Right Column: Calendar & Activities */}
                <div className="space-y-8">
                    {/* Calendar Mini-Widget */}
                    <div className="text-center">
                        <p className="text-3xl font-black text-indigo-400">
                            Calender
                        </p>
                    </div>
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        captionLayout="dropdown"
                        className="rounded-xl border-slate-800 bg-[#0f172a]/40 p-4 text-slate-200 backdrop-blur-sm"
                        classNames={{
                            caption:
                                "flex justify-center pt-1 relative items-center text-sm font-medium text-slate-100",
                            caption_label:
                                "text-sm font-semibold text-indigo-400",
                            nav: "space-x-1 flex items-center",
                            nav_button:
                                "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 transition-opacity text-slate-100",

                            head_cell:
                                "text-slate-500 rounded-md w-9 font-normal text-[0.8rem] uppercase tracking-tighter",
                            cell: "h-9 w-9 text-center text-sm p-0 relative focus-within:relative focus-within:z-20",
                            day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-slate-800 hover:text-indigo-400 rounded-md transition-all",

                            day_selected:
                                "bg-indigo-600 text-white hover:bg-indigo-500 hover:text-white focus:bg-indigo-600 focus:text-white ring-2 ring-indigo-400/30",
                            day_today: "bg-slate-600 text-indigo-400 font-bold",
                            day_outside: "text-slate-600 opacity-50",
                            day_disabled: "text-slate-600 opacity-50",
                        }}
                    />

                    {/* Quick Actions / Side Fun */}
                    <div className="rounded-xl border border-indigo-500/20 bg-gradient-to-br from-indigo-600/20 to-transparent p-6">
                        <h4 className="mb-1 font-bold text-white">
                            Weekly Goal
                        </h4>
                        <p className="mb-4 text-xs text-slate-400">
                            Study for 15 hours total
                        </p>
                        <div className="flex items-center gap-2">
                            <Clock className="size-4 text-indigo-400" />
                            <span className="text-sm font-semibold">
                                12.5 / 15 hrs
                            </span>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
