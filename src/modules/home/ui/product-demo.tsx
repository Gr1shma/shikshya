"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    FileText,
    Send,
    Bot,
    Upload,
    RefreshCw,
    Clock,
    Sparkles,
    BookmarkCheck,
    Brain,
} from "lucide-react";
import { cn } from "~/lib/utils";

// Mock Data for the Chat Interface showing AI capabilities
const chatMessages = [
    {
        role: "user",
        content: "Explain the key concepts from this thermodynamics chapter",
    },
    {
        role: "ai",
        content:
            "Based on your PDF, the key concepts are: 1) The Second Law of Thermodynamics states that entropy in an isolated system never decreases. 2) Heat transfer always flows from hot to cold. 3) Reversible processes are idealized theoretical constructs. Would you like me to generate flashcards for these concepts?",
    },
];

export default function ProductDemo() {
    const [activeTab, setActiveTab] = useState<"chat" | "flashcards">("chat");

    return (
        <div className="relative">
            {/* Problem Section */}
            <section className="relative py-20">
                <div className="relative container mx-auto px-6">
                    <div className="mx-auto max-w-5xl">
                        {/* Problem Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="mb-10 flex justify-center"
                        >
                            <div className="inline-flex items-center gap-2.5 rounded-full border border-red-500/20 bg-red-500/5 px-4 py-2">
                                <RefreshCw className="size-4 text-red-400" />
                                <span className="text-xs font-bold tracking-widest text-red-400 uppercase">
                                    The Problem
                                </span>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-center"
                        >
                            <h2 className="mb-6 text-3xl leading-tight font-black text-white md:text-5xl">
                                PDFs are reused{" "}
                                <span className="text-indigo-400">
                                    every year
                                </span>
                                ,
                                <br />
                                but teachers re-upload them{" "}
                                <span className="text-red-400">
                                    every batch
                                </span>
                            </h2>
                            <p className="mx-auto max-w-3xl text-lg leading-relaxed text-slate-400">
                                One of the biggest problems we noticed: teachers
                                waste time on repetitive uploads, while students
                                get PDFs late or struggle through long documents{" "}
                                <span className="text-slate-300">
                                    without guidance
                                </span>
                                .
                            </p>
                        </motion.div>

                        {/* Visual separator */}
                        <motion.div
                            initial={{ opacity: 0, scaleX: 0 }}
                            whileInView={{ opacity: 1, scaleX: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                            className="my-12 h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent"
                        />

                        {/* Solution intro */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            className="text-center"
                        >
                            <div className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-2">
                                <Sparkles className="size-4 text-indigo-400" />
                                <span className="text-xs font-bold tracking-widest text-indigo-400 uppercase">
                                    The Solution
                                </span>
                            </div>
                            <h3 className="mb-4 text-2xl font-bold text-white md:text-3xl">
                                Shikshya solves{" "}
                                <span className="bg-gradient-to-r from-indigo-400 to-sky-400 bg-clip-text text-transparent">
                                    both sides
                                </span>
                            </h3>
                            <div className="mx-auto grid max-w-4xl gap-4 md:grid-cols-2">
                                <div className="rounded-2xl border border-indigo-500/20 bg-indigo-950/20 p-6 text-left">
                                    <div className="mb-3 flex items-center gap-2">
                                        <Upload className="size-5 text-indigo-400" />
                                        <h4 className="font-bold text-indigo-300">
                                            For Teachers
                                        </h4>
                                    </div>
                                    <p className="text-sm leading-relaxed text-slate-300">
                                        Upload once and it&apos;s{" "}
                                        <span className="font-semibold text-white">
                                            accessible across batches
                                        </span>
                                    </p>
                                </div>
                                <div className="rounded-2xl border border-sky-500/20 bg-sky-950/20 p-6 text-left">
                                    <div className="mb-3 flex items-center gap-2">
                                        <Brain className="size-5 text-sky-400" />
                                        <h4 className="font-bold text-sky-300">
                                            For Students
                                        </h4>
                                    </div>
                                    <p className="text-sm leading-relaxed text-slate-300">
                                        Experience a{" "}
                                        <span className="font-semibold text-white">
                                            frictionless workflow
                                        </span>{" "}
                                        with built-in AI chat.
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Product Demo Section */}
            <section id="features" className="relative py-24">
                <div className="container mx-auto px-6">
                    <div className="mb-16 text-center">
                        <motion.h2
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-3xl font-black tracking-tight text-white md:text-5xl"
                        >
                            Your PDF, but{" "}
                            <span className="bg-gradient-to-r from-indigo-400 to-sky-400 bg-clip-text text-transparent">
                                Intelligent.
                            </span>
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="mx-auto mt-4 max-w-2xl text-slate-400"
                        >
                            Don&apos;t just read. Interact. Ask questions.
                            Generate study materials. Shikshya transforms static
                            documents into dynamic learning experiences.
                        </motion.p>
                    </div>

                    {/* Split Screen Interface Mockup */}
                    <div className="relative mx-auto max-w-6xl overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 shadow-2xl shadow-indigo-500/10">
                        <div className="grid h-[600px] grid-cols-1 md:grid-cols-2">
                            {/* Left Side: Chat Interface Mockup */}
                            <div className="flex flex-col border-b border-slate-800 bg-slate-950 p-6 md:border-r md:border-b-0">
                                <div className="mb-4 flex items-center justify-between border-b border-slate-800 pb-4">
                                    <div className="flex items-center gap-2">
                                        <Bot className="size-5 text-indigo-400" />
                                        <span className="font-bold text-white">
                                            ShikShya
                                        </span>
                                    </div>
                                    <div className="flex rounded-lg bg-slate-900 p-1">
                                        <button
                                            onClick={() => setActiveTab("chat")}
                                            className={cn(
                                                "rounded px-3 py-1 text-xs font-medium transition-all",
                                                activeTab === "chat"
                                                    ? "bg-indigo-600 text-white shadow-lg"
                                                    : "text-slate-400 hover:text-white"
                                            )}
                                        >
                                            Chat
                                        </button>
                                        <button
                                            onClick={() =>
                                                setActiveTab("flashcards")
                                            }
                                            className={cn(
                                                "rounded px-3 py-1 text-xs font-medium transition-all",
                                                activeTab === "flashcards"
                                                    ? "bg-indigo-600 text-white shadow-lg"
                                                    : "text-slate-400 hover:text-white"
                                            )}
                                        >
                                            Flashcards
                                        </button>
                                    </div>
                                </div>

                                <div className="flex-1 space-y-4 overflow-y-auto">
                                    <AnimatePresence mode="wait">
                                        {activeTab === "chat" ? (
                                            <motion.div
                                                key="chat"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                className="space-y-4"
                                            >
                                                {chatMessages.map(
                                                    (msg, idx) => (
                                                        <div
                                                            key={idx}
                                                            className={cn(
                                                                "flex gap-3",
                                                                msg.role ===
                                                                    "user"
                                                                    ? "justify-end"
                                                                    : "justify-start"
                                                            )}
                                                        >
                                                            {msg.role ===
                                                                "ai" && (
                                                                <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-indigo-600">
                                                                    <Bot className="size-5 text-white" />
                                                                </div>
                                                            )}
                                                            <div
                                                                className={cn(
                                                                    "max-w-[80%] rounded-2xl p-4 text-sm leading-relaxed",
                                                                    msg.role ===
                                                                        "user"
                                                                        ? "bg-slate-800 text-white"
                                                                        : "bg-indigo-900/20 text-indigo-100"
                                                                )}
                                                            >
                                                                {msg.content}
                                                            </div>
                                                        </div>
                                                    )
                                                )}

                                                {/* Typing Indicator */}
                                                <motion.div className="flex gap-1 pl-12">
                                                    <div
                                                        className="size-2 animate-bounce rounded-full bg-slate-700"
                                                        style={{
                                                            animationDelay:
                                                                "0s",
                                                        }}
                                                    />
                                                    <div
                                                        className="size-2 animate-bounce rounded-full bg-slate-700"
                                                        style={{
                                                            animationDelay:
                                                                "0.1s",
                                                        }}
                                                    />
                                                    <div
                                                        className="size-2 animate-bounce rounded-full bg-slate-700"
                                                        style={{
                                                            animationDelay:
                                                                "0.2s",
                                                        }}
                                                    />
                                                </motion.div>
                                            </motion.div>
                                        ) : (
                                            <motion.div
                                                key="flashcards"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                className="flex h-full items-center justify-center"
                                            >
                                                <div className="w-full max-w-sm rounded-xl border border-slate-700 bg-slate-800 p-8 text-center shadow-xl">
                                                    <div className="mb-4 flex items-center justify-center gap-2 text-xs font-bold tracking-widest text-slate-400 uppercase">
                                                        <BookmarkCheck className="size-3" />
                                                        Flashcard 1/5
                                                    </div>
                                                    <h3 className="text-xl font-bold text-white">
                                                        What is Entropy?
                                                    </h3>
                                                    <div className="my-8 h-px bg-slate-700" />
                                                    <button className="w-full rounded-lg bg-indigo-600 py-3 text-sm font-bold text-white transition-all hover:bg-indigo-500 active:scale-95">
                                                        Reveal Answer
                                                    </button>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                {/* Input Area */}
                                <div className="mt-4 border-t border-slate-800 pt-4">
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder="Ask about this chapter..."
                                            className="w-full rounded-xl border border-slate-800 bg-slate-900 py-3 pr-12 pl-4 text-sm text-slate-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                                            disabled
                                        />
                                        <button className="absolute top-1/2 right-2 -translate-y-1/2 rounded-lg bg-indigo-600 p-1.5 text-white transition-all hover:bg-indigo-500 active:scale-95">
                                            <Send className="size-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Right Side: PDF Viewer Mockup */}
                            <div className="relative bg-slate-900/50 p-6">
                                <div className="mb-4 flex items-center justify-between border-b border-slate-800 pb-4">
                                    <div className="flex items-center gap-2">
                                        <div className="flex size-8 items-center justify-center rounded bg-red-500/10">
                                            <FileText className="size-4 text-red-500" />
                                        </div>
                                        <div>
                                            <div className="text-sm font-bold text-slate-200">
                                                Thermodynamics_Ch2.pdf
                                            </div>
                                            <div className="text-xs text-slate-500">
                                                12 Pages • 2.4 MB
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-slate-500">
                                        <Clock className="size-3" />
                                        <span>Uploaded once</span>
                                    </div>
                                </div>

                                {/* Stylized PDF content */}
                                <div className="space-y-4 opacity-50 contrast-50 grayscale filter">
                                    <div className="h-4 w-3/4 rounded bg-slate-700" />
                                    <div className="h-2 w-full rounded bg-slate-800" />
                                    <div className="h-2 w-full rounded bg-slate-800" />
                                    <div className="h-2 w-5/6 rounded bg-slate-800" />

                                    <div className="mt-8 h-32 w-full rounded-lg bg-slate-800/50" />

                                    <div className="mt-8 h-4 w-1/2 rounded bg-slate-700" />
                                    <div className="h-2 w-full rounded bg-slate-800" />
                                    <div className="h-2 w-full rounded bg-slate-800" />
                                    <div className="h-2 w-4/5 rounded bg-slate-800" />
                                </div>

                                {/* Scanning Effect */}
                                <motion.div
                                    initial={{ top: "0%" }}
                                    animate={{ top: "100%" }}
                                    transition={{
                                        duration: 3,
                                        repeat: Infinity,
                                        ease: "linear",
                                    }}
                                    className="absolute left-0 h-1 w-full bg-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.5)]"
                                />
                            </div>
                        </div>

                        {/* Decorative glow */}
                        <div className="absolute -inset-1 -z-10 rounded-[1.2rem] bg-gradient-to-r from-indigo-500 to-sky-500 opacity-20 blur-xl" />
                    </div>
                </div>
            </section>
        </div>
    );
}
