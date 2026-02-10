import React from "react";
import { Flame, Zap, ShieldCheck } from "lucide-react";

const ProductFeatures = () => {
    return (
        <div>
            <section className="mx-auto max-w-6xl px-6 py-12 md:px-12">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div className="rounded-2xl border border-slate-800 bg-[#0f172a]/20 p-8 transition-all hover:border-slate-700">
                        <Flame className="mb-4 size-8 text-orange-500" />
                        <h3 className="text-lg font-bold text-white">
                            Streak Integrity
                        </h3>
                        <p className="mt-2 text-sm text-slate-400">
                            Maintain discipline with your visual learning
                            streak.
                        </p>
                    </div>
                    <div className="rounded-2xl border border-slate-800 bg-[#0f172a]/20 p-8 transition-all hover:border-slate-700">
                        <Zap className="mb-4 size-8 text-yellow-500" />
                        <h3 className="text-lg font-bold text-white">
                            Focus Workflow
                        </h3>
                        <p className="mt-2 text-sm text-slate-400">
                            A minimalist interface designed for deep focus.
                        </p>
                    </div>
                    <div className="rounded-2xl border border-slate-800 bg-[#0f172a]/20 p-8 transition-all hover:border-slate-700">
                        <ShieldCheck className="mb-4 size-8 text-indigo-500" />
                        <h3 className="text-lg font-bold text-white">
                            Encrypted Data
                        </h3>
                        <p className="mt-2 text-sm text-slate-400">
                            Your resources are private and secured end-to-end.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ProductFeatures;
