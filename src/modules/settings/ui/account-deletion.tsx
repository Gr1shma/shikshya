"use client";

import React, { useState } from "react";
import { Trash2, AlertTriangle, Shield, X } from "lucide-react";

interface AccountDeletionProps {
    onDelete?: () => Promise<boolean>;
    onExportData?: () => void;
}

export default function AccountDeletion({
    onDelete,
    onExportData,
}: AccountDeletionProps) {
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [confirmText, setConfirmText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const [error, setError] = useState("");

    const handleDeleteClick = () => {
        setShowDeleteConfirm(true);
        setConfirmText("");
        setError("");
    };

    const handleCancelDelete = () => {
        setShowDeleteConfirm(false);
        setConfirmText("");
        setError("");
    };

    const handleConfirmDelete = async () => {
        if (confirmText !== "DELETE") {
            setError("Please type DELETE to confirm");
            return;
        }

        setIsDeleting(true);
        setError("");

        try {
            const result = await onDelete?.();
            if (result === false) {
                setError("Failed to delete account. Please try again.");
                setIsDeleting(false);
            }
            // If successful, the user will be redirected, so no need to update state
        } catch (err) {
            setError("An error occurred. Please try again.");
            setIsDeleting(false);
        }
    };

    const handleExportData = () => {
        onExportData?.();
    };

    const isConfirmValid = confirmText === "DELETE";

    return (
        <div className="overflow-hidden rounded-2xl border border-slate-800/50 bg-slate-900/50 backdrop-blur-sm">
            <div className="space-y-6 p-6 md:p-8">
                {/* Header */}
                <div>
                    <div className="mb-2 flex items-center gap-3">
                        <div className="rounded-lg bg-red-500/10 p-2">
                            <AlertTriangle className="h-6 w-6 text-red-400" />
                        </div>
                        <h2 className="text-2xl font-bold text-white">
                            Danger Zone
                        </h2>
                    </div>
                    <p className="text-sm text-slate-400">
                        Irreversible actions that will permanently affect your
                        account
                    </p>
                </div>

                {/* Warning Banner */}
                <div className="rounded-xl border-2 border-red-500/30 bg-red-500/10 p-5">
                    <div className="flex gap-3">
                        <Shield className="mt-0.5 h-6 w-6 flex-shrink-0 text-red-400" />
                        <div className="text-sm">
                            <p className="mb-2 text-base font-semibold text-red-300">
                                ⚠️ Warning: Irreversible Actions
                            </p>
                            <p className="leading-relaxed text-slate-300">
                                These actions cannot be undone. Once you delete
                                your account, all your data will be permanently
                                removed from our servers. Please proceed with
                                extreme caution.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Delete Account Section */}
                <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-6">
                    <div className="mb-5 flex items-start justify-between gap-4">
                        <div className="flex-1">
                            <div className="mb-2 flex items-center gap-2">
                                <Trash2 className="h-5 w-5 text-red-400" />
                                <h3 className="text-lg font-semibold text-white">
                                    Delete Account
                                </h3>
                            </div>
                            <p className="mb-3 text-sm text-slate-400">
                                Permanently delete your account and all
                                associated data. This action cannot be reversed.
                            </p>

                            {/* What will be deleted */}
                            <div className="space-y-2">
                                <p className="text-sm font-medium text-red-300">
                                    What will be deleted:
                                </p>
                                <ul className="space-y-1.5 text-sm text-slate-400">
                                    <li className="flex items-center gap-2">
                                        <X className="h-4 w-4 flex-shrink-0 text-red-400" />
                                        All your personal information and
                                        profile data
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <X className="h-4 w-4 flex-shrink-0 text-red-400" />
                                        Your course enrollments and learning
                                        progress
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <X className="h-4 w-4 flex-shrink-0 text-red-400" />
                                        All achievements, badges, and streaks
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <X className="h-4 w-4 flex-shrink-0 text-red-400" />
                                        Your preferences and settings
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {!showDeleteConfirm ? (
                        <button
                            onClick={handleDeleteClick}
                            className="flex w-full items-center justify-center gap-2 rounded-lg border border-red-500/40 bg-red-600/20 px-5 py-2.5 font-medium text-red-400 transition-all hover:border-red-500/60 hover:bg-red-600/30 hover:text-red-300 sm:w-auto"
                        >
                            <Trash2 className="h-4 w-4" />
                            Delete My Account
                        </button>
                    ) : (
                        <div className="space-y-4">
                            {/* Confirmation Input */}
                            <div className="space-y-4 rounded-lg border-2 border-red-500/40 bg-red-500/10 p-5">
                                <div>
                                    <p className="mb-2 text-sm font-semibold text-red-300">
                                        ⚠️ Are you absolutely sure?
                                    </p>
                                    <p className="mb-4 text-sm text-slate-300">
                                        This action{" "}
                                        <span className="font-semibold text-red-400">
                                            cannot be undone
                                        </span>
                                        . This will permanently delete your
                                        account and remove all your data from
                                        our servers.
                                    </p>
                                    <p className="mb-3 text-sm text-slate-300">
                                        Please type{" "}
                                        <span className="rounded bg-red-500/10 px-2 py-0.5 font-mono font-bold text-red-400">
                                            DELETE
                                        </span>{" "}
                                        to confirm:
                                    </p>
                                    <input
                                        type="text"
                                        value={confirmText}
                                        onChange={(e) => {
                                            setConfirmText(e.target.value);
                                            setError("");
                                        }}
                                        placeholder="Type DELETE"
                                        className="w-full rounded-lg border-2 border-red-500/40 bg-slate-900/80 px-4 py-3 font-mono text-white placeholder-slate-500 transition-all focus:border-red-500/60 focus:ring-2 focus:ring-red-500/30 focus:outline-none"
                                    />
                                    {error && (
                                        <p className="mt-2 flex items-center gap-2 text-sm text-red-400">
                                            <AlertTriangle className="h-4 w-4" />
                                            {error}
                                        </p>
                                    )}
                                </div>

                                {/* Final Confirmation */}
                                <div className="flex items-start gap-3 rounded-lg border border-slate-700/50 bg-slate-900/50 p-3">
                                    <input
                                        type="checkbox"
                                        id="final-confirm"
                                        className="mt-1 h-4 w-4 rounded border-slate-600 text-red-600 focus:ring-red-500 focus:ring-offset-slate-900"
                                    />
                                    <label
                                        htmlFor="final-confirm"
                                        className="cursor-pointer text-sm text-slate-300"
                                    >
                                        I understand that this action is
                                        permanent and cannot be reversed. I want
                                        to delete my account and all associated
                                        data.
                                    </label>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col gap-3 sm:flex-row">
                                <button
                                    onClick={handleConfirmDelete}
                                    disabled={!isConfirmValid || isDeleting}
                                    className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-red-600 px-6 py-3 font-semibold text-white shadow-lg shadow-red-500/20 transition-all hover:bg-red-500 hover:shadow-red-500/30 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-500 disabled:shadow-none"
                                >
                                    <Trash2 className="h-4 w-4" />
                                    {isDeleting
                                        ? "Deleting Account..."
                                        : "Yes, Delete My Account Forever"}
                                </button>
                                <button
                                    onClick={handleCancelDelete}
                                    disabled={isDeleting}
                                    className="flex-1 rounded-lg bg-slate-700 px-6 py-3 font-medium text-white transition-all hover:bg-slate-600 disabled:cursor-not-allowed disabled:bg-slate-800"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Help Text */}
                <div className="rounded-xl border border-slate-700/30 bg-slate-800/30 p-4">
                    <p className="text-sm text-slate-400">
                        <span className="font-medium text-slate-300">
                            Need help?
                        </span>{" "}
                        If you&apos;re experiencing issues or have concerns,
                        please{" "}
                        <a
                            href="#"
                            className="text-indigo-400 underline hover:text-indigo-300"
                        >
                            contact our support team
                        </a>{" "}
                        before deleting your account. We&apos;re here to help!
                    </p>
                </div>
            </div>
        </div>
    );
}
