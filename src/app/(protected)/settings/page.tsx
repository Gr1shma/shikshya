"use client";

import React, { useState } from "react";
import { User, Lock, Trash2, Settings as SettingsIcon } from "lucide-react";
import AccountDeletion from "~/modules/settings/ui/account-deletion";
import PasswordReset from "~/modules/settings/ui/password-change";
import PersonalSettings from "~/modules/settings/ui/personal-details";

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState<
        "personal" | "password" | "danger"
    >("personal");

    const tabs = [
        {
            id: "personal" as const,
            label: "Personal Info",
            icon: User,
            description: "Manage your profile and preferences",
        },
        {
            id: "password" as const,
            label: "Password",
            icon: Lock,
            description: "Update your password",
        },
        {
            id: "danger" as const,
            label: "Account",
            icon: Trash2,
            description: "Delete your account",
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950/30 to-slate-900 p-4 md:p-8">
            <div className="mx-auto max-w-6xl">
                {/* Header Section */}
                <div className="mb-8 flex items-start justify-between">
                    <div>
                        <div className="mb-2 flex items-center gap-3">
                            <div className="rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 p-2.5 shadow-lg shadow-indigo-500/20">
                                <SettingsIcon className="h-6 w-6 text-white" />
                            </div>
                            <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
                                Settings
                            </h1>
                        </div>
                        <p className="text-muted-foreground ml-1 text-sm">
                            Manage your account settings and preferences
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
                    {/* Sidebar Navigation */}
                    <div className="lg:col-span-1">
                        <div className="space-y-1 rounded-2xl border border-slate-800/50 bg-slate-900/50 p-2 backdrop-blur-sm lg:sticky lg:top-8">
                            {tabs.map((tab) => {
                                const Icon = tab.icon;
                                const isActive = activeTab === tab.id;
                                const isDanger = tab.id === "danger";

                                return (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`group flex w-full items-start gap-3 rounded-xl px-4 py-3.5 text-left transition-all duration-200 ${
                                            isActive
                                                ? isDanger
                                                    ? "border border-red-500/30 bg-red-500/10"
                                                    : "bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg"
                                                : isDanger
                                                  ? "text-red-400/60 hover:bg-red-500/5"
                                                  : "text-slate-400 hover:bg-slate-800/50 hover:text-white"
                                        }`}
                                    >
                                        <Icon
                                            className={`mt-0.5 h-5 w-5 flex-shrink-0 ${isActive ? "text-white" : ""}`}
                                        />
                                        <div className="min-w-0 flex-1">
                                            <div
                                                className={`text-sm font-semibold ${isActive ? "text-white" : ""}`}
                                            >
                                                {tab.label}
                                            </div>
                                            <div
                                                className={`text-xs ${isActive ? "text-white/70" : "text-slate-500"}`}
                                            >
                                                {tab.description}
                                            </div>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="lg:col-span-3">
                        {activeTab === "personal" && <PersonalSettings />}

                        {activeTab === "password" && <PasswordReset />}

                        {activeTab === "danger" && <AccountDeletion />}
                    </div>
                </div>
            </div>
        </div>
    );
}
