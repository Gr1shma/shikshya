import React from "react";
import { Pin, ArrowUpRight } from "lucide-react";
import { Card } from "~/components/ui/card";

export const PinnedCourses = ({
    courses = [
        {
            id: 1,
            name: "Bct i/ii",
            code: "BCT102",
            color: "border-blue-500",
            glow: "shadow-blue-500/20",
            text: "text-blue-400",
        },
        {
            id: 2,
            name: "Bct iii/i",
            code: "BCT301",
            color: "border-purple-500",
            glow: "shadow-purple-500/20",
            text: "text-purple-400",
        },
    ],
}) => {
    return (
        <section className="w-full space-y-4">
            <div className="flex items-center justify-between px-1">
                <h2 className="flex items-center gap-2 text-[11px] font-black tracking-[0.2em] text-slate-200 uppercase">
                    <Pin className="size-3.5 rotate-45 fill-indigo-500/20 text-indigo-500" />
                    Pinned Courses
                </h2>
                <button className="text-[10px] font-bold tracking-tighter text-indigo-400 transition-colors hover:text-indigo-300">
                    MANAGE ALL
                </button>
            </div>

            <div className="grid grid-cols-1 gap-3">
                {courses.map((course) => (
                    <Card
                        key={course.id}
                        className={`group relative overflow-hidden border-slate-800/60 bg-[#16161e]/80 p-4 backdrop-blur-xl transition-all hover:border-slate-600 hover:bg-[#1a1b26] active:scale-[0.99]`}
                    >
                        {/* Interactive Accent Glow */}
                        <div
                            className={`absolute top-0 left-0 h-full w-[3px] ${course.color.replace("border-", "bg-")} opacity-0 transition-opacity group-hover:opacity-100`}
                        />

                        <div className="flex items-center gap-5">
                            {/* Course Icon Badge */}
                            <div
                                className={`flex size-12 shrink-0 items-center justify-center rounded-xl border-2 ${course.color} bg-[#0a0a0c] shadow-lg ${course.glow}`}
                            >
                                <span
                                    className={`text-[11px] font-black tracking-tighter ${course.text}`}
                                >
                                    {/* FIX: TS Safe Access */}
                                    {course.name
                                        ?.split(" ")[0]
                                        ?.toUpperCase() ?? "COURSE"}
                                </span>
                            </div>

                            <div className="flex min-w-0 flex-col">
                                <h4 className="truncate text-base font-bold text-white transition-colors group-hover:text-indigo-100">
                                    {course.name}
                                </h4>
                                <span className="font-mono text-[11px] font-bold text-slate-500 group-hover:text-slate-400">
                                    {course.code}
                                </span>
                            </div>

                            <div className="ml-auto rounded-full border border-slate-800 bg-slate-900/50 p-2 transition-all group-hover:border-indigo-500/50">
                                <ArrowUpRight
                                    className={`size-4 text-slate-500 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-indigo-400`}
                                />
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </section>
    );
};
