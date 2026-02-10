"use client";

import { useEffect, useState, useRef } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import {
    ChevronLeft,
    ChevronRight,
    ZoomIn,
    ZoomOut,
    RotateCw,
    Loader2,
    Sparkles,
} from "lucide-react";
import { Button } from "~/components/ui/button";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url
).toString();

interface PdfViewerProps {
    fileUrl: string | null;
    onExplain?: (text: string) => void;
}

export function PdfViewer({ fileUrl, onExplain }: PdfViewerProps) {
    const [numPages, setNumPages] = useState<number>(0);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [scale, setScale] = useState<number>(1);
    const [rotation, setRotation] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    const containerRef = useRef<HTMLDivElement>(null);
    const [selection, setSelection] = useState<{
        text: string;
        x: number;
        y: number;
    } | null>(null);

    useEffect(() => {
        setPageNumber(1);
        setRotation(0);
        setScale(1);
        setLoading(true);
        setSelection(null);
    }, [fileUrl]);

    useEffect(() => {
        const handleSelection = () => {
            const selection = window.getSelection();
            if (
                !selection ||
                selection.isCollapsed ||
                selection.rangeCount === 0
            ) {
                setSelection(null);
                return;
            }

            const text = selection.toString().trim();
            if (!text) {
                setSelection(null);
                return;
            }

            try {
                const range = selection.getRangeAt(0);

                const rect = range.getBoundingClientRect();

                if (rect.width === 0 || rect.height === 0) {
                    setSelection(null);
                    return;
                }

                setSelection({
                    text,
                    x: rect.left + rect.width / 2,
                    y: rect.top - 10,
                });
            } catch (e) {
                console.error("Error getting selection rect:", e);
                setSelection(null);
            }
        };

        const handleMouseUp = () => {
            setTimeout(handleSelection, 10);
        };

        const handleKeyUp = (e: KeyboardEvent) => {
            if (e.key === "Shift") {
                handleSelection();
            }
        };

        document.addEventListener("selectionchange", handleSelection);
        document.addEventListener("mouseup", handleMouseUp);
        document.addEventListener("keyup", handleKeyUp);

        const handleScroll = () => {
            setSelection(null);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });

        const container = containerRef.current;
        container?.addEventListener("scroll", handleScroll, { passive: true });

        return () => {
            document.removeEventListener("selectionchange", handleSelection);
            document.removeEventListener("mouseup", handleMouseUp);
            document.removeEventListener("keyup", handleKeyUp);
            window.removeEventListener("scroll", handleScroll);
            container?.removeEventListener("scroll", handleScroll);
        };
    }, []);

    function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
        setNumPages(numPages);
        setLoading(false);
    }

    const handleZoomIn = () => setScale((prev) => Math.min(prev + 0.2, 3));
    const handleZoomOut = () => setScale((prev) => Math.max(prev - 0.2, 0.5));
    const handleRotate = () => setRotation((prev) => (prev + 90) % 360);
    const handlePrevPage = () => setPageNumber((prev) => Math.max(prev - 1, 1));
    const handleNextPage = () =>
        setPageNumber((prev) => Math.min(prev + 1, numPages));

    const handleExplain = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (selection && onExplain) {
            onExplain(selection.text);
            window.getSelection()?.removeAllRanges();
            setSelection(null);
        }
    };

    if (!fileUrl) {
        return (
            <div className="flex h-full items-center justify-center p-8">
                <div className="group relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-lg border border-white/5 bg-white/5">
                    {/* Glassmorphism Paper Effect */}
                    <div className="absolute inset-12 flex flex-col rounded bg-white/90 p-10 shadow-2xl transition-transform duration-500 group-hover:scale-105">
                        <div className="mb-4 h-4 w-3/4 rounded bg-slate-200" />
                        <div className="mb-2 h-3 w-full rounded bg-slate-100" />
                        <div className="mb-2 h-3 w-full rounded bg-slate-100" />
                        <div className="mb-8 h-3 w-5/6 rounded bg-slate-100" />
                        <div className="mb-4 h-4 w-1/2 rounded bg-slate-200" />
                        <div className="mb-2 h-3 w-full rounded bg-slate-100" />
                        <div className="mb-2 h-3 w-full rounded bg-slate-100" />
                        <div className="h-3 w-4/6 rounded bg-slate-100" />
                    </div>
                    <span className="z-10 rounded-full border border-white/10 bg-slate-900/90 px-4 py-2 text-sm text-slate-300 backdrop-blur-md">
                        No PDF uploaded
                    </span>
                </div>
            </div>
        );
    }

    return (
        <div className="relative flex h-full flex-col overflow-hidden bg-slate-900/50 backdrop-blur-sm">
            {/* Toolbar */}
            <div className="flex items-center justify-between border-b border-white/5 bg-slate-950/50 p-2 backdrop-blur-md">
                <div className="flex items-center gap-1">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={handlePrevPage}
                        disabled={pageNumber <= 1}
                        className="h-8 w-8 text-slate-400 hover:bg-white/5 hover:text-white"
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <span className="text-xs font-medium text-slate-400">
                        {pageNumber} / {numPages || "--"}
                    </span>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleNextPage}
                        disabled={pageNumber >= numPages}
                        className="h-8 w-8 text-slate-400 hover:bg-white/5 hover:text-white"
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>

                <div className="flex items-center gap-1">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleZoomOut}
                        className="h-8 w-8 text-slate-400 hover:bg-white/5 hover:text-white"
                    >
                        <ZoomOut className="h-4 w-4" />
                    </Button>
                    <span className="w-12 text-center text-xs font-medium text-slate-400">
                        {Math.round(scale * 100)}%
                    </span>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleZoomIn}
                        className="h-8 w-8 text-slate-400 hover:bg-white/5 hover:text-white"
                    >
                        <ZoomIn className="h-4 w-4" />
                    </Button>
                </div>

                <div className="flex items-center gap-1">
                    {selection && (
                        <Button
                            variant="default"
                            size="sm"
                            onClick={handleExplain}
                            className="mr-2 h-8 bg-indigo-600 px-3 text-xs text-white hover:bg-indigo-700"
                        >
                            <Sparkles className="mr-1.5 h-3 w-3" />
                            Explain
                        </Button>
                    )}
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleRotate}
                        className="h-8 w-8 text-slate-400 hover:bg-white/5 hover:text-white"
                    >
                        <RotateCw className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            {/* Document Viewer */}
            <div
                ref={containerRef}
                className="flex flex-1 justify-center overflow-auto p-4"
            >
                <div className="relative">
                    {loading && (
                        <div className="absolute inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm">
                            <Loader2 className="h-8 w-8 animate-spin text-indigo-500" />
                        </div>
                    )}
                    <Document
                        file={fileUrl}
                        onLoadSuccess={onDocumentLoadSuccess}
                        loading={
                            <div className="flex h-96 items-center justify-center">
                                <Loader2 className="h-8 w-8 animate-spin text-indigo-500" />
                            </div>
                        }
                        error={
                            <div className="flex h-96 flex-col items-center justify-center text-rose-500">
                                <p>Failed to load PDF</p>
                            </div>
                        }
                        className="flex justify-center"
                    >
                        <Page
                            pageNumber={pageNumber}
                            scale={scale}
                            rotate={rotation}
                            className="shadow-2xl"
                            renderTextLayer={true}
                            renderAnnotationLayer={true}
                        />
                    </Document>
                </div>
            </div>
        </div>
    );
}
