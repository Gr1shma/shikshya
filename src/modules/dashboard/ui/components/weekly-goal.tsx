import React from "react";
import { Clock } from "lucide-react";

export const WeeklyGoal = () => {
    return (
        <div className="rounded-xl border border-indigo-500/20 bg-gradient-to-br from-indigo-600/20 to-transparent p-6">
            <h4 className="mb-1 font-bold text-white">Weekly Goal</h4>
            <p className="mb-4 text-xs text-slate-400">
                Study for 15 hours total
            </p>
            <div className="flex items-center gap-2">
                <Clock className="size-4 text-indigo-400" />
                <span className="text-sm font-semibold">12.5 / 15 hrs</span>
            </div>
        </div>
    );
};
