"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
    LayoutDashboard,
    LibraryBig,
    BookOpen,
    Menu,
    X,
    Trophy,
    HomeIcon,
} from "lucide-react";
import { cn } from "~/lib/utils";
import ProfileSidebar from "./sidebar";
import { useSession } from "~/lib/auth-client";
import { UserAvatar } from "../user-avatar";
import Image from "next/image";

const navItems = [
    { name: "Home", path: "/", icon: HomeIcon },
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Courses", path: "/course", icon: LibraryBig },
    { name: "Syllabus", path: "/syllabus", icon: BookOpen },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const pathname = usePathname();

    const { data: session } = useSession();
    const user = session?.user as
        | {
              name?: string | null;
              email?: string | null;
              image?: string | null;
              role?: string;
          }
        | undefined;

    const userData = user
        ? {
              name: user.name ?? "User",
              email: user.email ?? "",
              role: user.role ?? "Student",
              image: user.image ?? ``,
          }
        : {
              name: "Guest",
              email: "",
              role: "Guest",
              image: "",
          };

    return (
        <>
            <nav className="sticky inset-x-0 top-0 z-50 w-full px-4 py-4">
                <div className="mx-auto max-w-7xl">
                    <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-950/60 p-2 pl-6 shadow-2xl shadow-indigo-500/10 backdrop-blur-md">
                        {/* Logo */}
                        <Link
                            href="/"
                            className="group flex items-center gap-3 select-none"
                        >
                            {/* Logo Icon */}
                            <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden shadow-lg shadow-indigo-500/30 transition-all duration-300 group-hover:scale-105 group-hover:rotate-12">
                                <Image
                                    src="/logo.png"
                                    alt="Shikshya logo"
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>

                            {/* Brand Text */}
                            <span className="text-xl font-extrabold tracking-tight text-white">
                                ShikShya
                            </span>
                        </Link>

                        {/* Desktop Nav */}
                        <div className="hidden items-center gap-1 md:flex">
                            {navItems.map((item) => (
                                <Link
                                    key={item.path}
                                    href={item.path}
                                    aria-current={
                                        pathname === item.path
                                            ? "page"
                                            : undefined
                                    }
                                    className={cn(
                                        "relative rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                                        pathname === item.path
                                            ? "text-white"
                                            : "text-slate-400 hover:bg-white/5 hover:text-white"
                                    )}
                                >
                                    {pathname === item.path && (
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
                            ))}
                        </div>

                        {/* Profile & Mobile Toggle */}
                        <div className="flex items-center gap-2">
                            <Link
                                href="/leaderboard"
                                aria-label="Leaderboard"
                                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-slate-900 text-slate-300 transition-all hover:border-indigo-500/50 hover:text-white"
                            >
                                <Trophy className="h-5 w-5" />
                            </Link>
                            <UserAvatar
                                name={userData.name}
                                imageUrl={userData.image}
                                onClick={() => setIsProfileOpen(true)}
                                className="h-10 w-10 border border-white/10 transition-all hover:border-indigo-500/50"
                            />

                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                aria-label={isOpen ? "Close menu" : "Open menu"}
                                className="p-2 text-slate-300 md:hidden"
                            >
                                {isOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu (Standard Nav) */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.aside
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="fixed top-0 right-0 h-full w-64 border-l border-white/10 bg-slate-950 p-6 shadow-2xl md:hidden"
                        >
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
                                        aria-current={
                                            pathname === item.path
                                                ? "page"
                                                : undefined
                                        }
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
                        </motion.aside>
                    )}
                </AnimatePresence>
            </nav>

            {/* Imported Sidebar Component */}
            <ProfileSidebar
                isOpen={isProfileOpen}
                onClose={() => setIsProfileOpen(false)}
                user={userData}
            />
        </>
    );
}
