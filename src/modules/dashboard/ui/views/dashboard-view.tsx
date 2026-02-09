import React from "react";
import { DashboardHeader } from "../components/header";
import { StreakCard } from "../components/streak-card";
import { PinnedCourses } from "../components/pinned-courses";
import { CalendarWidget } from "../components/calendar-widget";
import { MiniTodo } from "../components/mini-todo";

export const DashboardView = () => {
    return (
        <div className="min-h-screen bg-[#020617] p-6 text-slate-200 md:p-10">
            <DashboardHeader />

            <main className="mx-auto max-w-7xl space-y-8">
                {/* Top Row: Streak (Wide) and Calendar (Narrow) */}
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    <div className="lg:col-span-2">
                        <StreakCard />
                    </div>
                    <div className="lg:col-span-1">
                        <CalendarWidget />
                    </div>
                </div>

                {/* Bottom Row: 30/70 Split for Todo and Pinned Courses */}
                <div className="flex flex-col gap-8 lg:flex-row">
                    {/* Left: Mini Todo (30%) */}
                    <div className="w-full lg:w-[30%]">
                        <MiniTodo />
                    </div>

                    {/* Right: Pinned Courses (70%) */}
                    <div className="w-full lg:w-[70%]">
                        <PinnedCourses />
                    </div>
                </div>
            </main>
        </div>
    );
};
