"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Folder, 
  FileText, 
  ChevronRight, 
  Grid, 
  List as ListIcon, 
  Search,
  MoreVertical
} from "lucide-react";
import { cn } from "~/lib/utils";

type ExplorerItem = {
  id: string;
  name: string;
  type: "folder" | "file";
  size?: string;
  updatedAt: string;
  children?: ExplorerItem[]; 
};

// Mock Data
const mockDriveData: ExplorerItem[] = [
  {
    id: "f1", name: "Science", type: "folder", updatedAt: "Feb 5, 2026",
    children: [
      { 
        id: "f1-1", name: "Quantum Physics", type: "folder", updatedAt: "Feb 7, 2026", 
        children: [
          { id: "p1", name: "Quantum_Theory.pdf", type: "file", size: "2.4 MB", updatedAt: "Today" },
        ] 
      },
      { id: "s1", name: "Biology_Basics.pdf", type: "file", size: "12 MB", updatedAt: "Feb 6, 2026" },
    ]
  },
  { id: "f2", name: "Mathematics", type: "folder", updatedAt: "Jan 20, 2026", children: [] },
];

export default function CourseExplorer() {
  const router = useRouter();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [path, setPath] = useState<ExplorerItem[]>([]); 
  const [searchQuery, setSearchQuery] = useState("");

  const currentItems = useMemo(() => {
    const baseItems = path.length === 0 ? mockDriveData : path[path.length - 1]?.children ?? [];
    
    if (!searchQuery.trim()) return baseItems;
    
    return baseItems.filter(item => 
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
    <div className="flex flex-col h-[calc(100vh-120px)] space-y-4">
      {/* ACTION BAR */}
      <div className="flex items-center justify-between bg-slate-900/40 border border-white/5 p-3 rounded-2xl backdrop-blur-md">
        <nav className="flex items-center text-sm font-medium overflow-hidden">
          <button onClick={() => navigateToLevel(-1)} className="text-slate-400 hover:text-indigo-400 px-2 shrink-0">My Drive</button>
          {path.map((folder, idx) => (
            <React.Fragment key={folder.id}>
              <ChevronRight size={14} className="text-slate-700 shrink-0" />
              <button onClick={() => navigateToLevel(idx)} className={cn("px-2 truncate max-w-[100px]", idx === path.length - 1 ? "text-indigo-400" : "text-slate-400")}>
                {folder.name}
              </button>
            </React.Fragment>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {/* SEARCH INPUT */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={14} />
            <input 
              type="text" 
              placeholder="Search in this folder..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-slate-950/50 border border-white/10 rounded-xl py-2 pl-9 pr-4 text-xs focus:ring-1 focus:ring-indigo-500 outline-none w-48 md:w-64 transition-all"
            />
          </div>
          <div className="hidden sm:flex bg-slate-950/50 p-1 rounded-lg border border-white/10">
            <button onClick={() => setViewMode("grid")} className={cn("p-1.5 rounded-md", viewMode === "grid" ? "bg-indigo-600 text-white" : "text-slate-500")}><Grid size={16}/></button>
            <button onClick={() => setViewMode("list")} className={cn("p-1.5 rounded-md", viewMode === "list" ? "bg-indigo-600 text-white" : "text-slate-500")}><ListIcon size={16}/></button>
          </div>
        </div>
      </div>

      {/* EXPLORER WINDOW */}
      <div className="flex-1 bg-slate-950/40 border border-white/10 rounded-[2rem] overflow-hidden backdrop-blur-xl shadow-2xl">
        <div className="p-6 h-full overflow-y-auto custom-scrollbar">
          <AnimatePresence mode="wait">
            <motion.div 
              key={path.length + searchQuery}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn("gap-4", viewMode === "grid" ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6" : "flex flex-col")}
            >
              {currentItems.map((item) => (
                <ItemCard key={item.id} item={item} viewMode={viewMode} onClick={() => handleItemClick(item)} />
              ))}
              {currentItems.length === 0 && (
                <div className="col-span-full py-20 text-center text-slate-600 italic">No items found</div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function ItemCard({ item, viewMode, onClick }: { item: ExplorerItem; viewMode: "grid" | "list"; onClick: () => void }) {
  const isFolder = item.type === "folder";
  return (
    <div 
      onClick={onClick}
      className={cn(
        "group cursor-pointer transition-all border border-white/5 bg-slate-900/20 hover:border-indigo-500/40",
        viewMode === "grid" ? "flex flex-col items-center p-5 rounded-3xl" : "flex items-center justify-between p-3 rounded-xl"
      )}
    >
      <div className={cn("flex items-center gap-3", viewMode === "grid" && "flex-col")}>
        <div className={cn("rounded-2xl bg-slate-950 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform", viewMode === "grid" ? "h-14 w-14 mb-2" : "h-10 w-10")}>
          {isFolder ? <Folder className="text-indigo-500 fill-indigo-400/10" size={viewMode === "grid" ? 28 : 18} /> : <FileText className="text-slate-500" size={viewMode === "grid" ? 28 : 18} />}
        </div>
        <span className="text-xs font-medium text-slate-300 truncate max-w-[120px]">{item.name}</span>
      </div>
      {viewMode === "list" && (
        <div className="flex items-center gap-4 text-[10px] text-slate-600 font-mono">
           <span>{item.size ?? "--"}</span>
           <MoreVertical size={14} />
        </div>
      )}
    </div>
  );
}