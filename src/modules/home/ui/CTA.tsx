"use client";

import React from "react";
import Link from "next/link";
import { Rocket, Play } from "lucide-react";
import { motion } from "framer-motion";

const CTA = () => {
    return (
        <div>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                >
                    <Link
                        href="/auth?tab=signup"
                        className="group flex w-full items-center justify-center gap-3 rounded-xl bg-indigo-600 px-7 py-4 text-sm font-bold text-white shadow-lg shadow-indigo-600/20 transition-all hover:scale-[1.02] hover:bg-indigo-500 hover:shadow-xl hover:shadow-indigo-600/30 active:scale-95 sm:w-auto"
                    >
                        Transform Your Workflow
                        <Rocket className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                >
                    <Link
                        href="/auth?tab=signup"
                        className="group flex w-full items-center justify-center gap-3 rounded-xl border border-slate-700 bg-slate-900/60 px-7 py-4 text-sm font-bold text-white backdrop-blur-sm transition-all hover:scale-[1.02] hover:border-slate-600 hover:bg-slate-800/80 active:scale-95 sm:w-auto"
                    >
                        <Play className="size-4 text-slate-400 transition-colors group-hover:text-indigo-400" />
                        See How It Works
                    </Link>
                </motion.div>
            </div>
        </div>
    );
};

export default CTA;
