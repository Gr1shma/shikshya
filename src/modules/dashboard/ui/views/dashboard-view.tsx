import React from "react";
import { DashboardHeader } from "../components/header";
import { StreakCard } from "../components/streak-card";
import { PinnedCourses } from "../components/courses";
import CalendarWidget from "../components/calendar-widget";
import { MiniTodo } from "../components/mini-todo";

export const DashboardView = () => {
    return (
        <div className="min-h-screen bg-[#020617] p-6 text-slate-200 md:p-10">
            <DashboardHeader />

            <main className="max-w-7xl space-y-8">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    <div className="lg:col-span-2">
                        <StreakCard />
                        <div className="w-full">
                            <MiniTodo />
                        </div>
                    </div>
                    <div className="lg:col-span-1">
                        <CalendarWidget />
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3">
                    <div className="lg:col-span-2">
                        <PinnedCourses />
                    </div>
                </div>
            </main>
        </div>
    );
};
