"use client";

import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-[#0f172a]/50 backdrop-blur-sm rounded-xl border border-slate-800 p-8 shadow-2xl">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-xl font-semibold text-slate-100">
            Log into <span className="text-indigo-400">ShikShya</span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">
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
              className="w-full bg-[#1e293b]/50 border border-slate-700 rounded-md px-3 py-2 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
            />
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-slate-300">
                Password
              </label>
              <Link href="#" className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors">
                Forgot password?
              </Link>
            </div>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#1e293b]/50 border border-slate-700 rounded-md px-3 py-2 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center items-center gap-3 pt-2">
            <button
              type="submit"
              className="w-full px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded-md shadow-lg shadow-indigo-500/20 transition-all active:scale-95"
            >
              Sign In
            </button>
          </div>
        </form>

        {/* Footer */}
        <div className="mt-8 text-center border-t border-slate-800 pt-6">
          <p className="text-sm text-slate-400">
            New to ShikShya?{" "}
            <Link href="/register" className="text-indigo-400 font-semibold hover:underline decoration-2 underline-offset-4">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}