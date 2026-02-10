import React from "react";
import Link from "next/link";
import {
    FileText,
    Sparkles,
    BrainCircuit,
    Flame,
    ShieldCheck,
    ArrowRight,
    Zap,
    BookOpen,
} from "lucide-react";

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-[#020617] font-sans text-slate-200 selection:bg-indigo-500/30">
            {/* Hero Section - Reduced Top Padding */}
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

                {/* Two Feasible CTAs */}
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
            </header>

            {/* Flagship Feature: AI + PDF */}
            <section className="mx-auto max-w-6xl px-6 py-16 md:px-12">
                <div className="relative overflow-hidden rounded-[2rem] border border-slate-800 bg-slate-900/20 p-8 md:p-12">
                    <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
                        <div>
                            <div className="mb-5 inline-flex size-12 items-center justify-center rounded-xl border border-indigo-500/20 bg-indigo-500/10">
                                <BrainCircuit className="size-6 text-indigo-400" />
                            </div>
                            <h2 className="text-3xl font-black text-white md:text-4xl">
                                Contextual <br />
                                <span className="text-indigo-400">
                                    PDF Intelligence
                                </span>
                            </h2>
                            <p className="mt-4 text-base leading-relaxed text-slate-400">
                                Stop just reading. Our AI automatically ingests
                                your PDF uploads, indexing every concept. Ask
                                questions directly to your documents and get
                                instant, contextual answers.
                            </p>

                            <div className="mt-6 grid grid-cols-2 gap-3">
                                {[
                                    "Auto-Indexing",
                                    "Formula Sync",
                                    "Smart Summary",
                                    "Flashcards",
                                ].map((item, idx) => (
                                    <div
                                        key={idx}
                                        className="flex items-center gap-2 text-[11px] font-bold tracking-tighter text-slate-300 uppercase"
                                    >
                                        <Zap className="size-3 text-indigo-500" />
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="relative rounded-2xl border border-slate-800 bg-slate-950/50 p-4 shadow-2xl">
                            <div className="mb-4 flex items-center justify-between border-b border-slate-800 pb-3">
                                <div className="flex items-center gap-2">
                                    <FileText className="size-4 text-red-400" />
                                    <span className="font-mono text-[10px] text-slate-500">
                                        Thermodynamics_Ch3.pdf
                                    </span>
                                </div>
                                <div className="size-2 animate-pulse rounded-full bg-green-500" />
                            </div>
                            <div className="space-y-2">
                                <div className="h-2 w-3/4 rounded bg-slate-800" />
                                <div className="h-2 w-full rounded bg-slate-800" />
                                <div className="mt-6 rounded-lg border border-indigo-500/30 bg-indigo-500/5 p-3">
                                    <p className="text-[10px] leading-relaxed text-slate-300 italic">
                                        &quot;AI: The second law of
                                        thermodynamics implies that the entropy
                                        of an isolated system never
                                        decreases...&quot;
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Secondary Features Grid */}
            <section className="mx-auto max-w-6xl px-6 py-12 md:px-12">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div className="rounded-2xl border border-slate-800 bg-[#0f172a]/20 p-8 transition-all hover:border-slate-700">
                        <Flame className="mb-4 size-8 text-orange-500" />
                        <h3 className="text-lg font-bold text-white">
                            Streak Integrity
                        </h3>
                        <p className="mt-2 text-sm text-slate-400">
                            Maintain discipline with your visual learning
                            streak.
                        </p>
                    </div>
                    <div className="rounded-2xl border border-slate-800 bg-[#0f172a]/20 p-8 transition-all hover:border-slate-700">
                        <Zap className="mb-4 size-8 text-yellow-500" />
                        <h3 className="text-lg font-bold text-white">
                            Focus Workflow
                        </h3>
                        <p className="mt-2 text-sm text-slate-400">
                            A minimalist interface designed for deep focus.
                        </p>
                    </div>
                    <div className="rounded-2xl border border-slate-800 bg-[#0f172a]/20 p-8 transition-all hover:border-slate-700">
                        <ShieldCheck className="mb-4 size-8 text-indigo-500" />
                        <h3 className="text-lg font-bold text-white">
                            Encrypted Data
                        </h3>
                        <p className="mt-2 text-sm text-slate-400">
                            Your resources are private and secured end-to-end.
                        </p>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-16 text-center">
                <div className="mb-4 flex items-center justify-center gap-3">
                    <div className="flex size-7 items-center justify-center rounded bg-indigo-600 text-sm font-black text-white italic">
                        शि
                    </div>
                    <span className="text-lg font-black tracking-tighter text-white uppercase">
                        Shikshya
                    </span>
                </div>
                <p className="text-[10px] font-bold tracking-[0.4em] text-slate-600 uppercase">
                    Better Learning, Managed.
                </p>
            </footer>
        </div>
    );
};

export default LandingPage;
