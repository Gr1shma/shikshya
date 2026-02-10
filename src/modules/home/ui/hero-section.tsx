"use client";

import React from "react";
import { Workflow, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useSession } from "~/lib/auth-client";
import Link from "next/link";
import Image from "next/image";

const HeroSection = () => {
    const { data: session } = useSession();
    const isLoggedIn = !!session?.user;

    return (
        <div>
            {/* Top Navigation Bar with Branding */}
            <nav className="relative px-6 py-6 md:px-12">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mx-auto flex max-w-6xl items-center justify-between"
                >
                    <div className="flex items-center gap-3">
                        <div className="relative h-10 w-10 shrink-0">
                            <Image
                                src="/logo.png"
                                alt="Shikshya logo"
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
                        <div className="text-2xl font-black tracking-tight text-white">
                            ShikShya
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        {isLoggedIn ? (
                            <Link
                                href="/dashboard"
                                className="group flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-bold text-white transition-all hover:bg-indigo-500"
                            >
                                Go to Dashboard
                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Link>
                        ) : (
                            <>
                                <a
                                    href="/auth?tab=signin"
                                    className="text-sm font-semibold text-slate-300 transition-colors hover:text-white"
                                >
                                    Sign In
                                </a>
                                <a
                                    href="/auth?tab=signup"
                                    className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-bold text-white transition-all hover:bg-indigo-500"
                                >
                                    Get Started
                                </a>
                            </>
                        )}
                    </div>
                </motion.div>
            </nav>
            <header className="relative overflow-hidden px-6 pb-16 text-center md:px-12 md:pt-24">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <div className="mx-auto mb-6 flex max-w-fit items-center gap-2 rounded-xl border border-indigo-500/30 bg-indigo-500/5 px-3 py-1.5">
                        <Workflow className="size-3.5 text-indigo-400" />
                        <span className="text-[9px] font-black tracking-[0.3em] text-indigo-400 uppercase">
                            Workflow Revolution
                        </span>
                    </div>

                    {/* Problem-focused headline */}
                    <h1 className="mx-auto max-w-4xl text-4xl font-black tracking-tight text-white md:text-6xl lg:text-7xl">
                        Stop Re-Uploading. <br />
                        <span className="bg-gradient-to-r from-indigo-400 via-sky-400 to-indigo-400 bg-clip-text text-transparent">
                            Start Teaching Smarter.
                        </span>
                    </h1>

                    <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-400 md:text-lg">
                        Transform repetitive PDF management into a streamlined
                        workflow.{" "}
                        <span className="text-slate-300">
                            Upload once, accessible forever.
                        </span>{" "}
                        Empower students with AI-driven learning tools that make
                        every document interactive.
                    </p>
                </motion.div>
            </header>
        </div>
    );
};

export default HeroSection;
