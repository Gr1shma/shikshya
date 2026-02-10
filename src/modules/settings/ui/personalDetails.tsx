"use client";

import React, { useState } from "react";
import { User, Mail, Camera, Save } from "lucide-react";

type PersonalDetails = {
    name: string;
    email: string;
    bio: string;
};

interface PersonalSettingsProps {
    initialData?: PersonalDetails;
    onSave?: (data: PersonalDetails) => void;
}
export default function PersonalSettings({
    initialData,
    onSave,
}: PersonalSettingsProps) {
    const [formData, setFormData] = useState({
        name: initialData?.name ?? "Shikshya",
        email: initialData?.email ?? "shikshya@example.com",
        bio: initialData?.bio ?? "Learning enthusiast",
    });

    const [isSaving, setIsSaving] = useState(false);

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSave = () => {
        setIsSaving(true);
        setTimeout(() => {
            setIsSaving(false);
            onSave?.(formData);
        }, 1000);
    };

    return (
        <div className="overflow-hidden rounded-2xl border border-slate-800/50 bg-slate-900/50 backdrop-blur-sm">
            <div className="space-y-6 p-6 md:p-8">
                {/* Header */}
                <div>
                    <h2 className="mb-2 text-2xl font-bold text-white">
                        Personal Information
                    </h2>
                    <p className="text-sm text-slate-400">
                        Update your profile details and information
                    </p>
                </div>

                {/* Profile Picture */}
                <div className="flex items-center gap-6 border-b border-slate-800/50 pb-6">
                    <div className="group relative">
                        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 text-3xl font-bold text-white shadow-xl ring-4 shadow-indigo-500/30 ring-slate-900/50">
                            {formData.name.charAt(0).toUpperCase()}
                        </div>
                        <button className="absolute right-0 bottom-0 rounded-full border-2 border-slate-900 bg-slate-800 p-2.5 text-slate-300 shadow-lg transition-all hover:bg-indigo-600 hover:text-white hover:shadow-indigo-500/30">
                            <Camera className="h-4 w-4" />
                        </button>
                    </div>
                    <div>
                        <h3 className="mb-1 text-lg font-semibold text-white">
                            Profile Photo
                        </h3>
                    </div>
                </div>

                {/* Form Fields */}
                <div className="space-y-5">
                    <div>
                        <label className="mb-2.5 block flex items-center gap-2 text-sm font-medium text-slate-300">
                            <User className="h-4 w-4 text-indigo-400" />
                            Full Name
                        </label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) =>
                                handleInputChange("name", e.target.value)
                            }
                            className="w-full rounded-xl border border-slate-700/50 bg-slate-800/50 px-4 py-3 text-white placeholder-slate-500 transition-all focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/50 focus:outline-none"
                            placeholder="Enter your full name"
                        />
                    </div>

                    <div>
                        <label className="mb-2.5 block flex items-center gap-2 text-sm font-medium text-slate-300">
                            <Mail className="h-4 w-4 text-indigo-400" />
                            Email Address
                        </label>
                        <div className="relative">
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) =>
                                    handleInputChange("email", e.target.value)
                                }
                                className="w-full rounded-xl border border-slate-700/50 bg-slate-800/50 px-4 py-3 text-white placeholder-slate-500 transition-all focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/50 focus:outline-none"
                                placeholder="your.email@example.com"
                            />
                        </div>
                        <p className="mt-2 text-xs text-slate-500">
                            We&apos;ll send verification to this email
                        </p>
                    </div>

                    <div>
                        <label className="mb-2.5 block text-sm font-medium text-slate-300">
                            Bio
                        </label>
                        <textarea
                            value={formData.bio}
                            onChange={(e) =>
                                handleInputChange("bio", e.target.value)
                            }
                            rows={4}
                            maxLength={200}
                            className="w-full resize-none rounded-xl border border-slate-700/50 bg-slate-800/50 px-4 py-3 text-white placeholder-slate-500 transition-all focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/50 focus:outline-none"
                            placeholder="Tell us about yourself..."
                        />
                        <div className="mt-2 flex justify-between">
                            <p className="text-xs text-slate-500">
                                Brief description for your profile
                            </p>
                            <p className="text-xs text-slate-500">
                                {formData.bio.length}/200
                            </p>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-3 border-t border-slate-800/50 pt-6 sm:flex-row">
                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-3 font-medium text-white shadow-lg shadow-indigo-500/20 transition-all hover:from-indigo-500 hover:to-purple-500 hover:shadow-indigo-500/30 disabled:cursor-not-allowed disabled:from-slate-700 disabled:to-slate-700 sm:flex-none"
                    >
                        <Save className="h-4 w-4" />
                        {isSaving ? "Saving..." : "Save Changes"}
                    </button>
                    <button className="rounded-xl border border-slate-700/30 bg-slate-800/50 px-6 py-3 font-medium text-slate-300 transition-all hover:border-slate-600/50 hover:bg-slate-700/50 hover:text-white">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}
