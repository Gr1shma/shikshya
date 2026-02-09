"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
    LayoutDashboard,
    MessageSquare,
    BedDouble,
    Receipt,
    Menu,
    X,
    LogOut,
} from "lucide-react";
import { cn } from "~/lib/utils";

const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Complaints", path: "/complaints", icon: MessageSquare },
    { name: "Rooms", path: "/rooms", icon: BedDouble },
    { name: "Bills", path: "/bills", icon: Receipt },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    return (
        <nav className="fixed inset-x-0 top-0 z-50 w-full px-4 py-4">
            <div className="mx-auto max-w-7xl">
                <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-950/60 p-2 pl-6 shadow-2xl shadow-indigo-500/10 backdrop-blur-md">
                    {/* Logo with Hindi "Shi" for Shiksha */}
                    <Link
                        href="/dashboard"
                        className="group flex items-center gap-2"
                    >
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 shadow-lg shadow-indigo-500/30 transition-transform group-hover:rotate-12">
                            <span className="text-lg font-bold text-white">
                                शि
                            </span>
                        </div>
                        <span className="text-xl font-bold tracking-tight text-white">
                            Shiksha<span className="text-indigo-400">Flow</span>
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden items-center gap-1 md:flex">
                        {navItems.map((item) => {
                            const isActive = pathname === item.path;
                            return (
                                <Link
                                    key={item.path}
                                    href={item.path}
                                    className={cn(
                                        "relative rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                                        isActive
                                            ? "text-white"
                                            : "text-slate-400 hover:bg-white/5 hover:text-white"
                                    )}
                                >
                                    {isActive && (
                                        <motion.div
                                            layoutId="nav-active"
                                            className="absolute inset-0 rounded-lg border border-indigo-500/30 bg-indigo-600/20"
                                            transition={{
                                                type: "spring",
                                                bounce: 0.2,
                                                duration: 0.6,
                                            }}
                                        />
                                    )}
                                    <span className="relative z-10 flex items-center gap-2">
                                        <item.icon className="h-4 w-4" />
                                        {item.name}
                                    </span>
                                </Link>
                            );
                        })}
                    </div>

                    {/* Action Button */}
                    <div className="hidden pr-2 md:block">
                        <Link
                            href="/login"
                            className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2 text-sm font-semibold text-white transition-all hover:bg-indigo-500 active:scale-95"
                        >
                            Log In
                        </Link>
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="mr-2 p-2 text-slate-300 md:hidden"
                    >
                        {isOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </div>

            {/* Mobile Sidebar */}
            <AnimatePresence>
                {isOpen && (
                    <motion.aside
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="fixed top-0 right-0 h-full w-64 border-l border-white/10 bg-slate-950 p-6 shadow-2xl md:hidden"
                    >
                        <div className="flex h-full flex-col">
                            <div className="mb-8 flex justify-end">
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 text-slate-400"
                                >
                                    <X />
                                </button>
                            </div>
                            <nav className="flex flex-col gap-3">
                                {navItems.map((item) => (
                                    <Link
                                        key={item.path}
                                        href={item.path}
                                        onClick={() => setIsOpen(false)}
                                        className={cn(
                                            "flex items-center gap-3 rounded-xl p-4 transition-colors",
                                            pathname === item.path
                                                ? "bg-indigo-600 text-white"
                                                : "text-slate-400 hover:bg-white/5"
                                        )}
                                    >
                                        <item.icon className="h-5 w-5" />
                                        {item.name}
                                    </Link>
                                ))}
                            </nav>
                            <div className="mt-auto border-t border-white/5 pt-6">
                                <button className="flex w-full items-center gap-3 rounded-xl p-4 text-red-400 transition-colors hover:bg-red-400/10">
                                    <LogOut className="h-5 w-5" /> Sign Out
                                </button>
                            </div>
                        </div>
                    </motion.aside>
                )}
            </AnimatePresence>
        </nav>
    );
}
