import React from "react";
import { Folder, FileText, MoreVertical } from "lucide-react";
import { cn } from "~/lib/utils";
import type { ExplorerItem } from "../../types";

interface ItemCardProps {
    item: ExplorerItem;
    viewMode: "grid" | "list";
    onClick: () => void;
}

export const ExplorerItemCard = ({
    item,
    viewMode,
    onClick,
}: ItemCardProps) => {
    const isFolder = item.type === "folder";
    return (
        <div
            onClick={onClick}
            className={cn(
                "group cursor-pointer border border-white/5 bg-slate-900/20 transition-all hover:border-indigo-500/40",
                viewMode === "grid"
                    ? "flex flex-col items-center rounded-3xl p-5"
                    : "flex items-center justify-between rounded-xl p-3"
            )}
        >
            <div
                className={cn(
                    "flex items-center gap-3",
                    viewMode === "grid" && "flex-col"
                )}
            >
                <div
                    className={cn(
                        "flex items-center justify-center rounded-2xl bg-slate-950 shadow-lg transition-transform group-hover:scale-110",
                        viewMode === "grid" ? "mb-2 h-14 w-14" : "h-10 w-10"
                    )}
                >
                    {isFolder ? (
                        <Folder
                            className="fill-indigo-400/10 text-indigo-500"
                            size={viewMode === "grid" ? 28 : 18}
                        />
                    ) : (
                        <FileText
                            className="text-slate-500"
                            size={viewMode === "grid" ? 28 : 18}
                        />
                    )}
                </div>
                <span className="max-w-[120px] truncate text-xs font-medium text-slate-300">
                    {item.name}
                </span>
            </div>
            {viewMode === "list" && (
                <div className="flex items-center gap-4 font-mono text-[10px] text-slate-600">
                    <span>{item.size ?? "--"}</span>
                    <MoreVertical size={14} />
                </div>
            )}
        </div>
    );
};
