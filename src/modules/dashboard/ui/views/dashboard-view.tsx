import React from "react";
import { DashboardHeader } from "../components/header";
import { StreakCard } from "../components/streak-card";
import { PinnedCourses } from "../components/pinned-courses";
import { CalendarWidget } from "../components/calendar-widget";
import { WeeklyGoal } from "../components/weekly-goal";

export const DashboardView = () => {
    return (
        <div className="min-h-screen bg-[#020617] p-6 text-slate-200 md:p-10">
            {/* Top Navigation / Header */}
            <DashboardHeader />

            <main className="mx-auto grid max-w-7xl grid-cols-1 gap-8 lg:grid-cols-3">
                {/* Left Column: Streak & Pinned Courses */}
                <div className="space-y-8 lg:col-span-2">
                    {/* Streak Card */}
                    <StreakCard />

                    {/* Pinned Courses Section */}
                    <PinnedCourses />
                </div>

                {/* Right Column: Calendar & Activities */}
                <div className="space-y-8">
                    {/* Calendar Mini-Widget */}
                    <CalendarWidget />

                    {/* Quick Actions / Side Fun */}
                    <WeeklyGoal />
                </div>
            </main>
        </div>
    );
};
