"use client";

import React from "react";
import { Clock, Sparkles, Building2 } from "lucide-react";
import { motion } from "framer-motion";

const ProductFeatures = () => {
    return (
        <div className="w-full">
            <section className="relative mx-auto max-w-6xl px-6 py-16 md:px-12">
                {/* Section header */}
                <div className="mb-12 text-center">
                    <h2 className="text-3xl font-black text-white md:text-4xl">
                        Built for{" "}
                        <span className="bg-gradient-to-r from-indigo-400 to-sky-400 bg-clip-text text-transparent">
                            Everyone
                        </span>
                    </h2>
                    <p className="mx-auto mt-3 max-w-2xl text-slate-400">
                        From individual students to entire institutions,
                        Shikshya scales with your needs.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                    {/* For Teachers */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ delay: 0.1, duration: 0.6 }}
                        className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-b from-slate-900/80 to-slate-900/40 p-8 backdrop-blur-sm transition-all hover:border-indigo-500/30 hover:shadow-lg hover:shadow-indigo-500/10"
                    >
                        <div className="absolute -top-12 -right-12 size-32 rounded-full bg-indigo-500/10 blur-2xl transition-all group-hover:bg-indigo-500/20" />
                        <div className="relative">
                            <div className="mb-5 flex size-12 items-center justify-center rounded-xl bg-indigo-500/10 ring-1 ring-indigo-500/20">
                                <Clock className="size-6 text-indigo-400" />
                            </div>
                            <h3 className="mb-2 text-lg font-bold text-white">
                                Save Time, Every Semester
                            </h3>
                            <p className="text-sm leading-relaxed text-slate-400">
                                Upload PDFs once and reuse them across all
                                batches. No more repetitive uploads—just focus
                                on teaching.
                            </p>
                        </div>
                    </motion.div>

                    {/* For Students */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-b from-slate-900/80 to-slate-900/40 p-8 backdrop-blur-sm transition-all hover:border-sky-500/30 hover:shadow-lg hover:shadow-sky-500/10"
                    >
                        <div className="absolute -top-12 -right-12 size-32 rounded-full bg-sky-500/10 blur-2xl transition-all group-hover:bg-sky-500/20" />
                        <div className="relative">
                            <div className="mb-5 flex size-12 items-center justify-center rounded-xl bg-sky-500/10 ring-1 ring-sky-500/20">
                                <Sparkles className="size-6 text-sky-400" />
                            </div>
                            <h3 className="mb-2 text-lg font-bold text-white">
                                AI-Guided Learning
                            </h3>
                            <p className="text-sm leading-relaxed text-slate-400">
                                Access materials instantly with summaries,
                                flashcards, and quizzes. Turn passive reading
                                into active learning.
                            </p>
                        </div>
                    </motion.div>

                    {/* For Institutions */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-b from-slate-900/80 to-slate-900/40 p-8 backdrop-blur-sm transition-all hover:border-purple-500/30 hover:shadow-lg hover:shadow-purple-500/10"
                    >
                        <div className="absolute -top-12 -right-12 size-32 rounded-full bg-purple-500/10 blur-2xl transition-all group-hover:bg-purple-500/20" />
                        <div className="relative">
                            <div className="mb-5 flex size-12 items-center justify-center rounded-xl bg-purple-500/10 ring-1 ring-purple-500/20">
                                <Building2 className="size-6 text-purple-400" />
                            </div>
                            <h3 className="mb-2 text-lg font-bold text-white">
                                Scalable Infrastructure
                            </h3>
                            <p className="text-sm leading-relaxed text-slate-400">
                                Centralized resource management for classes,
                                batches, and departments. Streamline workflows
                                at scale.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default ProductFeatures;
