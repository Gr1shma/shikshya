"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "~/lib/utils";
import type { ExplorerItem } from "../../types";
import { mockDriveData } from "../../data";
import { ExplorerToolbar } from "./explorer-toolbar";
import { ExplorerItemCard } from "./explorer-item-card";

export const CourseExplorer = () => {
    const router = useRouter();
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [path, setPath] = useState<ExplorerItem[]>([]);
    const [searchQuery, setSearchQuery] = useState("");

    const currentItems = useMemo(() => {
        const baseItems =
            path.length === 0
                ? mockDriveData
                : (path[path.length - 1]?.children ?? []);

        if (!searchQuery.trim()) return baseItems;

        return baseItems.filter((item) =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [path, searchQuery]);

    const handleItemClick = (item: ExplorerItem) => {
        if (item.type === "folder") {
            setPath((prev) => [...prev, item]);
            setSearchQuery("");
        } else {
            router.push(`/learn?file=${encodeURIComponent(item.name)}`);
        }
    };

    const navigateToLevel = (index: number) => {
        if (index === -1) setPath([]);
        else setPath(path.slice(0, index + 1));
    };

    return (
        <div className="flex h-[calc(100vh-120px)] flex-col space-y-4">
            {/* ACTION BAR */}
            <ExplorerToolbar
                path={path}
                onNavigate={navigateToLevel}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                viewMode={viewMode}
                onViewModeChange={setViewMode}
            />

            {/* EXPLORER WINDOW */}
            <div className="flex-1 overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/40 shadow-2xl backdrop-blur-xl">
                <div className="custom-scrollbar h-full overflow-y-auto p-6">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={path.length + searchQuery}
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={cn(
                                "gap-4",
                                viewMode === "grid"
                                    ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6"
                                    : "flex flex-col"
                            )}
                        >
                            {currentItems.map((item) => (
                                <ExplorerItemCard
                                    key={item.id}
                                    item={item}
                                    viewMode={viewMode}
                                    onClick={() => handleItemClick(item)}
                                />
                            ))}
                            {currentItems.length === 0 && (
                                <div className="col-span-full py-20 text-center text-slate-600 italic">
                                    No items found
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};
