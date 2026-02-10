import React from "react";
import { Sparkles } from "lucide-react";
const HeroSection = () => {
    return (
        <div>
            <header className="relative overflow-hidden px-6 pb-16 text-center md:px-12 md:pt-24">
                {/* Cinematic Background */}
                <div className="absolute top-0 left-1/2 -z-10 h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-indigo-600/10 blur-[120px]" />

                <div className="mx-auto mb-6 flex max-w-fit items-center gap-2 rounded-xl border border-indigo-500/30 bg-indigo-500/5 px-3 py-1.5">
                    <Sparkles className="size-3.5 text-indigo-400" />
                    <span className="text-[9px] font-black tracking-[0.3em] text-indigo-400 uppercase">
                        Evolution of Study
                    </span>
                </div>

                {/* Decreased Font Sizes */}
                <h1 className="mx-auto max-w-4xl text-4xl font-black tracking-tight text-white md:text-6xl lg:text-7xl">
                    Meet <span className="text-indigo-500">Shikshya.</span>{" "}
                    <br />
                    <span className="bg-gradient-to-r from-slate-200 to-slate-500 bg-clip-text text-transparent">
                        The AI-Powered Study OS.
                    </span>
                </h1>

                <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-slate-400 md:text-lg">
                    A professional ecosystem for students. From automated
                    streaks to AI-contextualized PDF learning, Shikshya turns
                    raw information into structured knowledge.
                </p>
            </header>
        </div>
    );
};

export default HeroSection;
