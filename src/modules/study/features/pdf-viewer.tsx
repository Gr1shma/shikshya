"use client";

interface PdfViewerProps {
    fileUrl: string | null;
    title: string;
}

export function PdfViewer({ fileUrl, title }: PdfViewerProps) {
    if (!fileUrl) {
        return (
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
        );
    }

    return (
        <iframe
            src={fileUrl}
            className="h-full w-full border-0"
            title={title}
        />
    );
}
