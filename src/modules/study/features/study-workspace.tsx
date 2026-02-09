"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
    ArrowLeft,
    FileText,
    Maximize2,
    Download,
    Bot,
    Sparkles,
} from "lucide-react";
import { api } from "~/trpc/react";
import { Button } from "~/components/ui/button";
import { ChatInterface } from "~/components/chat/chat-interface";

interface StudyWorkspaceProps {
    noteId: string;
}

export function StudyWorkspace({ noteId }: StudyWorkspaceProps) {
    const [note] = api.note.getById.useSuspenseQuery({ id: noteId });

    if (!note) {
        return (
            <div className="flex flex-col items-center justify-center py-16 text-center">
                <FileText className="mb-4 h-16 w-16 text-slate-600" />
                <h3 className="text-xl font-semibold text-white">
                    Note not found
                </h3>
                <p className="mt-2 text-slate-400">
                    The note you&apos;re looking for doesn&apos;t exist
                </p>
                <Link href="/course">
                    <Button className="mt-4" variant="outline">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Courses
                    </Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="flex h-[calc(100vh-8rem)] flex-col">
            {/* Split View */}
            <div className="flex flex-1 gap-6 overflow-hidden">
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
                                    Online &amp; Ready
                                </p>
                            </div>
                        </div>
                        <Sparkles className="h-5 w-5 text-indigo-500" />
                    </div>

                    {/* Chat Interface */}
                    <div className="flex flex-1 flex-col overflow-hidden">
                        <ChatInterface noteId={noteId} />
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
                                {note.title}
                            </span>
                        </div>
                        <div className="flex items-center gap-1">
                            {note.fileUrl && (
                                <a
                                    href={note.fileUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-white/5"
                                >
                                    <Download size={18} />
                                </a>
                            )}
                            {note.fileUrl && (
                                <a
                                    href={note.fileUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-white/5"
                                >
                                    <Maximize2 size={18} />
                                </a>
                            )}
                        </div>
                    </div>

                    {/* PDF Content Area */}
                    <div className="flex-1 overflow-hidden bg-slate-800/20">
                        {note.fileUrl ? (
                            <iframe
                                src={note.fileUrl}
                                className="h-full w-full border-0"
                                title={note.title}
                            />
                        ) : (
                            <div className="flex h-full items-center justify-center p-8">
                                <div className="group relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-lg border border-white/5 bg-white/5">
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
                                    <span className="z-10 rounded-full border border-white/10 bg-slate-900 px-3 py-1.5 text-xs text-white">
                                        No PDF uploaded
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
