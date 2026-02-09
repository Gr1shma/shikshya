import React from "react";
import { Flame, Trophy } from "lucide-react";
import { Card, CardContent } from "~/components/ui/card";

interface StreakCardProps {
    streakPoints?: number;
}

export const StreakCard = ({ streakPoints = 1240 }: StreakCardProps) => {
    return (
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
                    You&apos;re on fire! Complete one more lesson today to keep
                    your 7-day streak alive.
                </p>
            </CardContent>
        </Card>
    );
};
