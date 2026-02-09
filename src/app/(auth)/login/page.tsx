"use client";

import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className="flex min-h-screen items-center justify-center p-4">
            <div className="w-full max-w-md rounded-xl border border-slate-800 bg-[#0f172a]/50 p-8 shadow-2xl backdrop-blur-sm">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-xl font-semibold text-slate-100">
                        Log into{" "}
                        <span className="text-indigo-400">ShikShya</span>
                    </h1>
                    <p className="mt-1 text-sm text-slate-400">
                        Please enter your details below
                    </p>
                </div>

                <form className="space-y-6">
                    {/* Email/Username Field */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300">
                            Email / Username
                        </label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full rounded-md border border-slate-700 bg-[#1e293b]/50 px-3 py-2 text-sm text-slate-200 transition-all placeholder:text-slate-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 focus:outline-none"
                        />
                    </div>

                    {/* Password Field */}
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <label className="text-sm font-medium text-slate-300">
                                Password
                            </label>
                            <Link
                                href="#"
                                className="text-xs text-indigo-400 transition-colors hover:text-indigo-300"
                            >
                                Forgot password?
                            </Link>
                        </div>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full rounded-md border border-slate-700 bg-[#1e293b]/50 px-3 py-2 text-sm text-slate-200 transition-all placeholder:text-slate-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 focus:outline-none"
                        />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-center gap-3 pt-2">
                        <button
                            type="submit"
                            className="w-full rounded-md bg-indigo-600 px-6 py-2 text-sm font-medium text-white shadow-lg shadow-indigo-500/20 transition-all hover:bg-indigo-500 active:scale-95"
                        >
                            Sign In
                        </button>
                    </div>
                </form>

                {/* Footer */}
                <div className="mt-8 border-t border-slate-800 pt-6 text-center">
                    <p className="text-sm text-slate-400">
                        New to ShikShya?{" "}
                        <Link
                            href="/register"
                            className="font-semibold text-indigo-400 decoration-2 underline-offset-4 hover:underline"
                        >
                            Create an account
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
