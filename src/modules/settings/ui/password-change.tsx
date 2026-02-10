"use client";

import React, { useState } from "react";
import { Lock, Eye, EyeOff, Shield, Check, X, AlertCircle } from "lucide-react";

interface PasswordResetProps {
    onPasswordChange?: (data: {
        currentPassword: string;
        newPassword: string;
    }) => Promise<boolean>;
}

export default function PasswordReset({
    onPasswordChange,
}: PasswordResetProps) {
    const [formData, setFormData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const [showPasswords, setShowPasswords] = useState({
        current: false,
        new: false,
        confirm: false,
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    // Password validation
    const passwordRequirements = [
        {
            label: "At least 8 characters",
            test: (pwd: string) => pwd.length >= 8,
        },
        {
            label: "One uppercase letter",
            test: (pwd: string) => /[A-Z]/.test(pwd),
        },
        {
            label: "One lowercase letter",
            test: (pwd: string) => /[a-z]/.test(pwd),
        },
        { label: "One number", test: (pwd: string) => /[0-9]/.test(pwd) },
        {
            label: "One special character",
            test: (pwd: string) => /[!@#$%^&*(),.?":{}|<>]/.test(pwd),
        },
    ];

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        setError("");
        setSuccess(false);
    };

    const togglePasswordVisibility = (field: "current" | "new" | "confirm") => {
        setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }));
    };

    const validatePassword = () => {
        if (!formData.currentPassword) {
            setError("Please enter your current password");
            return false;
        }
        if (!formData.newPassword) {
            setError("Please enter a new password");
            return false;
        }
        if (formData.newPassword === formData.currentPassword) {
            setError("New password must be different from current password");
            return false;
        }
        if (
            !passwordRequirements.every((req) => req.test(formData.newPassword))
        ) {
            setError("New password does not meet all requirements");
            return false;
        }
        if (formData.newPassword !== formData.confirmPassword) {
            setError("Passwords do not match");
            return false;
        }
        return true;
    };

    const handleSubmit = async () => {
        if (!validatePassword()) return;

        setIsSubmitting(true);
        setError("");

        try {
            const result = await onPasswordChange?.({
                currentPassword: formData.currentPassword,
                newPassword: formData.newPassword,
            });

            if (result !== false) {
                setSuccess(true);
                setFormData({
                    currentPassword: "",
                    newPassword: "",
                    confirmPassword: "",
                });
                setTimeout(() => setSuccess(false), 5000);
            } else {
                setError("Current password is incorrect");
            }
        } catch {
            setError("Failed to update password. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const allRequirementsMet = passwordRequirements.every((req) =>
        req.test(formData.newPassword)
    );
    const passwordsMatch =
        formData.newPassword &&
        formData.confirmPassword &&
        formData.newPassword === formData.confirmPassword;

    return (
        <div className="overflow-hidden rounded-2xl border border-slate-800/50 bg-slate-900/50 backdrop-blur-sm">
            <div className="space-y-6 p-6 md:p-8">
                {/* Header */}
                <div>
                    <h2 className="mb-2 text-2xl font-bold text-white">
                        Change Password
                    </h2>
                    <p className="text-sm text-slate-400">
                        Update your password to keep your account secure
                    </p>
                </div>

                {/* Success Message */}
                {success && (
                    <div className="flex items-start gap-3 rounded-xl border border-green-500/30 bg-green-500/10 p-4">
                        <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-400" />
                        <div>
                            <p className="font-medium text-green-300">
                                Password updated successfully!
                            </p>
                            <p className="mt-1 text-sm text-slate-400">
                                Your password has been changed. Please use your
                                new password to login.
                            </p>
                        </div>
                    </div>
                )}

                {/* Error Message */}
                {error && (
                    <div className="flex items-start gap-3 rounded-xl border border-red-500/30 bg-red-500/10 p-4">
                        <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-400" />
                        <div>
                            <p className="font-medium text-red-300">{error}</p>
                        </div>
                    </div>
                )}

                {/* Form Fields */}
                <div className="space-y-5">
                    {/* Current Password */}
                    <div>
                        <label className="mb-2.5 block flex items-center gap-2 text-sm font-medium text-slate-300">
                            <Lock className="h-4 w-4 text-indigo-400" />
                            Current Password
                        </label>
                        <div className="relative">
                            <input
                                type={
                                    showPasswords.current ? "text" : "password"
                                }
                                value={formData.currentPassword}
                                onChange={(e) =>
                                    handleInputChange(
                                        "currentPassword",
                                        e.target.value
                                    )
                                }
                                className="w-full rounded-xl border border-slate-700/50 bg-slate-800/50 px-4 py-3 pr-12 text-white placeholder-slate-500 transition-all focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/50 focus:outline-none"
                                placeholder="Enter your current password"
                            />
                            <button
                                type="button"
                                onClick={() =>
                                    togglePasswordVisibility("current")
                                }
                                className="absolute top-1/2 right-3 -translate-y-1/2 p-1 text-slate-500 transition-colors hover:text-slate-300"
                            >
                                {showPasswords.current ? (
                                    <EyeOff className="h-5 w-5" />
                                ) : (
                                    <Eye className="h-5 w-5" />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* New Password */}
                    <div>
                        <label className="mb-2.5 block flex items-center gap-2 text-sm font-medium text-slate-300">
                            <Lock className="h-4 w-4 text-indigo-400" />
                            New Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPasswords.new ? "text" : "password"}
                                value={formData.newPassword}
                                onChange={(e) =>
                                    handleInputChange(
                                        "newPassword",
                                        e.target.value
                                    )
                                }
                                className="w-full rounded-xl border border-slate-700/50 bg-slate-800/50 px-4 py-3 pr-12 text-white placeholder-slate-500 transition-all focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/50 focus:outline-none"
                                placeholder="Enter your new password"
                            />
                            <button
                                type="button"
                                onClick={() => togglePasswordVisibility("new")}
                                className="absolute top-1/2 right-3 -translate-y-1/2 p-1 text-slate-500 transition-colors hover:text-slate-300"
                            >
                                {showPasswords.new ? (
                                    <EyeOff className="h-5 w-5" />
                                ) : (
                                    <Eye className="h-5 w-5" />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Confirm New Password */}
                    <div>
                        <label className="mb-2.5 block flex items-center gap-2 text-sm font-medium text-slate-300">
                            <Lock className="h-4 w-4 text-indigo-400" />
                            Confirm New Password
                        </label>
                        <div className="relative">
                            <input
                                type={
                                    showPasswords.confirm ? "text" : "password"
                                }
                                value={formData.confirmPassword}
                                onChange={(e) =>
                                    handleInputChange(
                                        "confirmPassword",
                                        e.target.value
                                    )
                                }
                                className={`w-full rounded-xl border bg-slate-800/50 px-4 py-3 pr-12 text-white placeholder-slate-500 transition-all focus:ring-2 focus:outline-none ${
                                    formData.confirmPassword && !passwordsMatch
                                        ? "border-red-500/50 focus:border-red-500/50 focus:ring-red-500/50"
                                        : formData.confirmPassword &&
                                            passwordsMatch
                                          ? "border-green-500/50 focus:border-green-500/50 focus:ring-green-500/50"
                                          : "border-slate-700/50 focus:border-indigo-500/50 focus:ring-indigo-500/50"
                                }`}
                                placeholder="Confirm your new password"
                            />
                            <button
                                type="button"
                                onClick={() =>
                                    togglePasswordVisibility("confirm")
                                }
                                className="absolute top-1/2 right-3 -translate-y-1/2 p-1 text-slate-500 transition-colors hover:text-slate-300"
                            >
                                {showPasswords.confirm ? (
                                    <EyeOff className="h-5 w-5" />
                                ) : (
                                    <Eye className="h-5 w-5" />
                                )}
                            </button>
                        </div>
                        {formData.confirmPassword && (
                            <div className="mt-2 flex items-center gap-2">
                                {passwordsMatch ? (
                                    <>
                                        <Check className="h-4 w-4 text-green-400" />
                                        <p className="text-sm text-green-400">
                                            Passwords match
                                        </p>
                                    </>
                                ) : (
                                    <>
                                        <X className="h-4 w-4 text-red-400" />
                                        <p className="text-sm text-red-400">
                                            Passwords do not match
                                        </p>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Password Requirements */}
                <div className="rounded-xl border border-slate-700/30 bg-slate-800/30 p-5">
                    <div className="mb-4 flex items-start gap-3">
                        <Shield className="mt-0.5 h-5 w-5 flex-shrink-0 text-indigo-400" />
                        <div>
                            <p className="mb-1 font-medium text-indigo-300">
                                Password Requirements
                            </p>
                            <p className="text-sm text-slate-400">
                                Your password must meet all the following
                                criteria:
                            </p>
                        </div>
                    </div>

                    <div className="space-y-2">
                        {passwordRequirements.map((req, index) => {
                            const isMet = req.test(formData.newPassword);
                            return (
                                <div
                                    key={index}
                                    className="flex items-center gap-2.5"
                                >
                                    <div
                                        className={`flex h-5 w-5 items-center justify-center rounded-full transition-colors ${
                                            isMet
                                                ? "bg-green-500/20 text-green-400"
                                                : "bg-slate-700/50 text-slate-500"
                                        }`}
                                    >
                                        {isMet ? (
                                            <Check className="h-3 w-3" />
                                        ) : (
                                            <X className="h-3 w-3" />
                                        )}
                                    </div>
                                    <span
                                        className={`text-sm transition-colors ${
                                            isMet
                                                ? "text-green-300"
                                                : "text-slate-400"
                                        }`}
                                    >
                                        {req.label}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Security Tip */}
                <div className="rounded-xl border border-indigo-500/30 bg-indigo-500/10 p-4">
                    <div className="flex gap-3">
                        <Shield className="mt-0.5 h-5 w-5 flex-shrink-0 text-indigo-400" />
                        <div className="text-sm text-slate-300">
                            <p className="mb-1 font-medium text-indigo-300">
                                Security Tip
                            </p>
                            <p className="text-slate-400">
                                Use a unique password that you don&apos;t use
                                anywhere else. Consider using a password manager
                                to generate and store strong passwords.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-3 border-t border-slate-800/50 pt-6 sm:flex-row">
                    <button
                        onClick={handleSubmit}
                        disabled={
                            isSubmitting ||
                            !allRequirementsMet ||
                            !passwordsMatch ||
                            !formData.currentPassword
                        }
                        className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-3 font-medium text-white shadow-lg shadow-indigo-500/20 transition-all hover:from-indigo-500 hover:to-purple-500 hover:shadow-indigo-500/30 disabled:cursor-not-allowed disabled:from-slate-700 disabled:to-slate-700 disabled:opacity-50 sm:flex-none"
                    >
                        <Lock className="h-4 w-4" />
                        {isSubmitting ? "Updating..." : "Update Password"}
                    </button>
                    <button
                        onClick={() =>
                            setFormData({
                                currentPassword: "",
                                newPassword: "",
                                confirmPassword: "",
                            })
                        }
                        className="rounded-xl border border-slate-700/30 bg-slate-800/50 px-6 py-3 font-medium text-slate-300 transition-all hover:border-slate-600/50 hover:bg-slate-700/50 hover:text-white"
                    >
                        Clear
                    </button>
                </div>
            </div>
        </div>
    );
}
