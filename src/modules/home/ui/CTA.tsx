import React from "react";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";

const CTA = () => {
    return (
        <div>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                    href="/auth?tab=signup"
                    className="group flex w-full items-center justify-center gap-3 rounded-xl bg-indigo-600 px-7 py-4 text-sm font-bold text-white shadow-lg shadow-indigo-600/20 transition-all hover:bg-indigo-500 active:scale-95 sm:w-auto"
                >
                    Start Learning
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>

                <Link
                    href="/auth?tab=signup"
                    className="flex w-full items-center justify-center gap-3 rounded-xl border border-slate-800 bg-slate-900/40 px-7 py-4 text-sm font-bold text-white transition-all hover:bg-slate-800 active:scale-95 sm:w-auto"
                >
                    <BookOpen className="size-4 text-slate-400" />
                    Explore Syllabus
                </Link>
            </div>
        </div>
    );
};

export default CTA;
