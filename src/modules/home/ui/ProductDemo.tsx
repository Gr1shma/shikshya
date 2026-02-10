import React from "react";
import { BrainCircuit, FileText, Zap } from "lucide-react";

const ProductDemo = () => {
    return (
        <div>
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
        </div>
    );
};

export default ProductDemo;
