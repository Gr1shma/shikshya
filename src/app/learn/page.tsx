"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
    Send,
    FileText,
    Sparkles,
    Maximize2,
    Download,
    Bot,
    UserCircle,
} from "lucide-react";
import { useSearchParams } from "next/navigation";

export default function LearnPage() {
    const searchParams = useSearchParams();
    const fileName = searchParams.get("file") ?? "document.pdf";
    const [message, setMessage] = useState("");

    return (
        <div className="flex h-[calc(100vh-160px)] gap-6 overflow-hidden">
            {/* LEFT: AI Chatbot Section */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex w-1/2 flex-col overflow-hidden rounded-3xl border border-white/10 bg-slate-900/50 shadow-xl backdrop-blur-md"
            >
                {/* Chat Header */}
                <div className="flex items-center justify-between border-b border-white/5 bg-slate-950/30 p-5">
                    <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-indigo-500/20 p-2 text-indigo-400">
                            <Bot size={20} />
                        </div>
                        <div>
                            <h2 className="font-bold text-slate-100">
                                Shiksha AI
                            </h2>
                            <p className="flex items-center gap-1 text-xs text-indigo-400/80">
                                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                                Online & Ready
                            </p>
                        </div>
                    </div>
                    <Sparkles className="h-5 w-5 text-indigo-500" />
                </div>

                {/* Chat Messages Area */}
                <div className="custom-scrollbar flex-1 space-y-6 overflow-y-auto p-6">
                    {/* AI Message */}
                    <div className="flex max-w-[85%] gap-3">
                        <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-[10px]">
                            AI
                        </div>
                        <div className="rounded-2xl rounded-tl-none border border-white/10 bg-white/5 p-4 text-sm leading-relaxed text-slate-300">
                            Hi User, I&apos;ve analyzed{" "}
                            <span className="font-medium text-indigo-400">
                                Something.pdf
                            </span>
                            . How can I help you understand this document
                            better?
                        </div>
                    </div>

                    {/* User Message Placeholder */}
                    <div className="ml-auto flex max-w-[85%] flex-row-reverse gap-3">
                        <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-700">
                            <UserCircle size={20} className="text-slate-400" />
                        </div>
                        <div className="rounded-2xl rounded-tr-none bg-indigo-600 p-4 text-sm text-white shadow-lg shadow-indigo-500/20">
                            Can you summarize the second paragraph for me?
                        </div>
                    </div>
                </div>

                {/* Chat Input */}
                <div className="border-t border-white/10 bg-slate-950/50 p-5">
                    <div className="relative flex items-center">
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Ask anything about the PDF..."
                            className="w-full rounded-xl border border-white/10 bg-slate-900 py-4 pr-14 pl-5 text-sm transition-all placeholder:text-slate-500 focus:ring-2 focus:ring-indigo-500/50 focus:outline-none"
                        />
                        <button className="absolute right-2 rounded-lg bg-indigo-600 p-2.5 text-white transition-colors hover:bg-indigo-500">
                            <Send size={18} />
                        </button>
                    </div>
                </div>
            </motion.div>

            {/* RIGHT: PDF Viewer Section */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex w-1/2 flex-col overflow-hidden rounded-3xl border border-white/10 bg-slate-950/40 shadow-xl backdrop-blur-sm"
            >
                {/* PDF Header */}
                <div className="flex items-center justify-between border-b border-white/5 bg-slate-900/30 p-4">
                    <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-rose-500" />
                        <span className="max-w-[250px] truncate text-sm font-medium text-slate-300">
                            {fileName}
                        </span>
                    </div>
                    <div className="flex items-center gap-1">
                        <button className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-white/5">
                            <Download size={18} />
                        </button>
                        <button className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-white/5">
                            <Maximize2 size={18} />
                        </button>
                    </div>
                </div>

                {/* PDF Content Area */}
                <div className="flex flex-1 items-center justify-center bg-slate-800/20 p-8">
                    <div className="group relative flex h-full w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-lg border border-white/5 bg-white/5">
                        {/* Glassmorphism Paper Effect */}
                        <div className="absolute inset-12 flex flex-col rounded bg-white/90 p-10 shadow-2xl">
                            <div className="mb-4 h-4 w-3/4 rounded bg-slate-200" />
                            <div className="mb-2 h-3 w-full rounded bg-slate-100" />
                            <div className="mb-2 h-3 w-full rounded bg-slate-100" />
                            <div className="mb-8 h-3 w-5/6 rounded bg-slate-100" />

                            <div className="mb-4 h-4 w-1/2 rounded bg-slate-200" />
                            <div className="mb-2 h-3 w-full rounded bg-slate-100" />
                            <div className="mb-2 h-3 w-full rounded bg-slate-100" />
                            <div className="h-3 w-4/6 rounded bg-slate-100" />
                        </div>

                        {/* Hover Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center bg-indigo-600/0 transition-colors group-hover:bg-indigo-600/10">
                            <span className="rounded-full border border-white/10 bg-slate-900 px-3 py-1.5 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
                                Preview Mode
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex h-12 items-center justify-center gap-4 border-t border-white/5 bg-slate-950/40 text-[10px] tracking-widest text-slate-500 uppercase">
                    <span>Page 1 of 12</span>
                </div>
            </motion.div>
        </div>
    );
}
