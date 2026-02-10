"use client";

import React, { useState } from "react";
import { User, Mail, Camera, Save } from "lucide-react";
import { updateUser } from "~/lib/auth-client";

export default function PersonalSettings() {
    const [formData, setFormData] = useState({
        name: "",
    });

    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (field: "name", value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSave = async () => {
        setIsSaving(true);
        setError(null);

        try {
            if (formData.name) {
                await updateUser({ name: formData.name });
            }
        } catch (err) {
            console.error(err);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="rounded-2xl border border-slate-800/50 bg-slate-900/50 p-6">
            <h2 className="mb-1 text-2xl font-bold text-white">
                Personal Information
            </h2>
            <p className="mb-6 text-sm text-slate-400">
                Update your profile details
            </p>

            {/* Profile avatar */}
            <div className="mb-6 flex items-center gap-4">
                <div className="relative">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-indigo-600 text-2xl font-bold text-white">
                        {formData.name?.charAt(0)?.toUpperCase() || "U"}
                    </div>
                    <button className="absolute right-0 bottom-0 rounded-full bg-slate-800 p-2 text-slate-300">
                        <Camera size={14} />
                    </button>
                </div>
            </div>

            {/* Name */}
            <label className="mb-2 flex items-center gap-2 text-sm text-slate-300">
                <User size={16} /> Full Name
            </label>
            <input
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className="mb-4 w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white"
                placeholder="Your name"
            />

            <button
                onClick={handleSave}
                disabled={isSaving}
                className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 font-medium text-white disabled:opacity-50"
            >
                <Save size={16} />
                {isSaving ? "Saving..." : "Save Changes"}
            </button>
        </div>
    );
}
