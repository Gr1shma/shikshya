"use client";

import React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
    X,
    LogOut,
    User,
    Settings,
    ShieldCheck,
    Mail,
    ChevronRight,
} from "lucide-react";

interface ProfileSidebarProps {
    isOpen: boolean;
    onClose: () => void;
    user: {
        name: string;
        email: string;
        role: string;
        image: string;
    };
}

export default function ProfileSidebar({
    isOpen,
    onClose,
    user,
}: ProfileSidebarProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-[60] bg-slate-950/40 backdrop-blur-sm"
                    />
                    {/* Drawer */}
                    <motion.aside
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{
                            type: "spring",
                            damping: 25,
                            stiffness: 200,
                        }}
                        className="fixed top-0 right-0 z-[70] h-full w-full max-w-sm border-l border-white/10 bg-slate-950 p-8 shadow-2xl"
                    >
                        <div className="flex h-full flex-col">
                            <div className="mb-8 flex items-center justify-between">
                                <h2 className="text-xl font-bold text-white">
                                    Profile
                                </h2>
                                <button
                                    onClick={onClose}
                                    className="rounded-full p-2 text-slate-400 transition-colors hover:bg-white/5"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* User Info Card */}
                            <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-6 text-center shadow-inner">
                                <div className="mx-auto mb-4 h-20 w-20 rounded-full border-2 border-indigo-500 p-1">
                                    <img
                                        src={user.image}
                                        alt="Avatar"
                                        className="h-full w-full rounded-full bg-slate-800"
                                    />
                                </div>
                                <h3 className="text-lg font-bold text-white">
                                    {user.name}
                                </h3>
                                <div className="mt-1 flex items-center justify-center gap-1 text-sm text-indigo-400">
                                    <ShieldCheck size={14} />
                                    <span className="font-medium tracking-wider uppercase">
                                        {user.role}
                                    </span>
                                </div>
                                <div className="mt-3 flex items-center justify-center gap-2 text-xs text-slate-500">
                                    <Mail size={12} />
                                    {user.email}
                                </div>
                            </div>

                            {/* Settings Links */}
                            <div className="mt-8 space-y-2">
                                <p className="px-2 text-[10px] font-bold tracking-widest text-slate-600 uppercase">
                                    Account Settings
                                </p>
                                <Link
                                    href="/profile/details"
                                    className="flex w-full items-center justify-between rounded-xl p-4 text-slate-300 transition-all hover:bg-white/5 hover:text-white"
                                >
                                    <div className="flex items-center gap-3">
                                        <User
                                            size={18}
                                            className="text-indigo-400"
                                        />
                                        <span>Personal Details</span>
                                    </div>
                                    <ChevronRight
                                        size={16}
                                        className="text-slate-600"
                                    />
                                </Link>
                                <Link
                                    href="/profile/settings"
                                    className="flex w-full items-center justify-between rounded-xl p-4 text-slate-300 transition-all hover:bg-white/5 hover:text-white"
                                >
                                    <div className="flex items-center gap-3">
                                        <Settings
                                            size={18}
                                            className="text-indigo-400"
                                        />
                                        <span>Preferences</span>
                                    </div>
                                    <ChevronRight
                                        size={16}
                                        className="text-slate-600"
                                    />
                                </Link>
                            </div>

                            {/* Sign Out */}
                            <div className="mt-auto pt-6">
                                <Link
                                    href="/sign-out"
                                    className="flex w-full items-center justify-center gap-3 rounded-xl bg-red-500/10 p-4 font-semibold text-red-500 transition-all hover:bg-red-500 hover:text-white"
                                >
                                    <LogOut size={18} />
                                    Sign Out
                                </Link>
                            </div>
                        </div>
                    </motion.aside>
                </>
            )}
        </AnimatePresence>
    );
}
