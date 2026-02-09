import React from "react";
import { ChevronRight, Grid, List as ListIcon, Search } from "lucide-react";
import { cn } from "~/lib/utils";
import type { ExplorerItem } from "../../types";

interface ExplorerToolbarProps {
    path: ExplorerItem[];
    onNavigate: (index: number) => void;
    searchQuery: string;
    onSearchChange: (query: string) => void;
    viewMode: "grid" | "list";
    onViewModeChange: (mode: "grid" | "list") => void;
}

export const ExplorerToolbar = ({
    path,
    onNavigate,
    searchQuery,
    onSearchChange,
    viewMode,
    onViewModeChange,
}: ExplorerToolbarProps) => {
    return (
        <div className="flex items-center justify-between rounded-2xl border border-white/5 bg-slate-900/40 p-3 backdrop-blur-md">
            <nav className="flex items-center overflow-hidden text-sm font-medium">
                <button
                    onClick={() => onNavigate(-1)}
                    className="shrink-0 px-2 text-slate-400 hover:text-indigo-400"
                >
                    My Drive
                </button>
                {path.map((folder, idx) => (
                    <React.Fragment key={folder.id}>
                        <ChevronRight
                            size={14}
                            className="shrink-0 text-slate-700"
                        />
                        <button
                            onClick={() => onNavigate(idx)}
                            className={cn(
                                "max-w-[100px] truncate px-2",
                                idx === path.length - 1
                                    ? "text-indigo-400"
                                    : "text-slate-400"
                            )}
                        >
                            {folder.name}
                        </button>
                    </React.Fragment>
                ))}
            </nav>

            <div className="flex items-center gap-3">
                {/* SEARCH INPUT */}
                <div className="relative">
                    <Search
                        className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-500"
                        size={14}
                    />
                    <input
                        type="text"
                        placeholder="Search in this folder..."
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="w-48 rounded-xl border border-white/10 bg-slate-950/50 py-2 pr-4 pl-9 text-xs transition-all outline-none focus:ring-1 focus:ring-indigo-500 md:w-64"
                    />
                </div>
                <div className="hidden rounded-lg border border-white/10 bg-slate-950/50 p-1 sm:flex">
                    <button
                        onClick={() => onViewModeChange("grid")}
                        className={cn(
                            "rounded-md p-1.5",
                            viewMode === "grid"
                                ? "bg-indigo-600 text-white"
                                : "text-slate-500"
                        )}
                    >
                        <Grid size={16} />
                    </button>
                    <button
                        onClick={() => onViewModeChange("list")}
                        className={cn(
                            "rounded-md p-1.5",
                            viewMode === "list"
                                ? "bg-indigo-600 text-white"
                                : "text-slate-500"
                        )}
                    >
                        <ListIcon size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
};
