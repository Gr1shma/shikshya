"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2, GraduationCap, School, Check } from "lucide-react";
import { api } from "~/trpc/react";
import { Button } from "~/components/ui/button";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "~/lib/utils";

export default function OnboardingPage() {
    const router = useRouter();
    const [selectedRole, setSelectedRole] = useState<
        "student" | "teacher" | null
    >(null);

    const { mutate: completeOnboarding, isPending: isLoading } =
        api.user.completeOnboarding.useMutation({
            onSuccess: () => {
                toast.success("Profile updated!");
                router.push("/dashboard");
            },
            onError: (error) => {
                toast.error(
                    error.message || "Something went wrong. Please try again."
                );
            },
        });

    const handleRoleSelection = () => {
        if (!selectedRole) {
            toast.error("Please select a role to continue");
            return;
        }
        completeOnboarding({ role: selectedRole });
    };

    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 p-4">
            {/* Background matching auth page */}
            <div className="fixed inset-0 -z-10 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />
            <div className="fixed top-0 left-1/2 -z-10 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-indigo-600/10 blur-[140px]" />
            <div className="fixed top-20 left-1/2 -z-10 h-[300px] w-[500px] -translate-x-1/2 rounded-full bg-sky-500/5 blur-[100px]" />

            {/* Noise texture */}
            <div
                className="fixed inset-0 -z-10 opacity-[0.015]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
                }}
            />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="w-full max-w-2xl"
            >
                <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/40 p-8 shadow-2xl backdrop-blur-xl transition-all duration-300 md:p-12">
                    <div className="mb-10 flex flex-col items-center gap-6 text-center">
                        <div className="flex items-center gap-3">
                            <div className="relative h-12 w-12 shrink-0">
                                <Image
                                    src="/logo.png"
                                    alt="Shikshya logo"
                                    fill
                                    className="object-contain"
                                    priority
                                />
                            </div>
                            <span className="text-3xl font-black tracking-tight text-white">
                                ShikShya
                            </span>
                        </div>
                        <div className="space-y-2">
                            <h1 className="text-2xl font-bold text-white md:text-3xl">
                                Welcome to ShikShya
                            </h1>
                            <p className="text-base text-slate-400">
                                How do you plan to use the platform?
                            </p>
                        </div>
                    </div>

                    <div className="mb-10 grid gap-6 md:grid-cols-2">
                        <button
                            onClick={() => setSelectedRole("student")}
                            className={cn(
                                "group relative flex flex-col items-center gap-4 rounded-2xl border p-6 text-center transition-all duration-300",
                                selectedRole === "student"
                                    ? "border-indigo-500 bg-indigo-500/10 shadow-lg shadow-indigo-500/10"
                                    : "border-slate-800 bg-slate-800/30 hover:border-slate-600 hover:bg-slate-800/50"
                            )}
                        >
                            {selectedRole === "student" && (
                                <div className="absolute top-4 right-4 flex h-6 w-6 items-center justify-center rounded-full bg-indigo-500">
                                    <Check className="h-3.5 w-3.5 text-white" />
                                </div>
                            )}
                            <div
                                className={cn(
                                    "rounded-full p-4 transition-colors",
                                    selectedRole === "student"
                                        ? "bg-indigo-500/20 text-indigo-400"
                                        : "bg-slate-800 text-slate-400 group-hover:text-indigo-400"
                                )}
                            >
                                <GraduationCap className="h-10 w-10" />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-lg font-bold text-white">
                                    I am a Student
                                </h3>
                                <p className="text-sm leading-relaxed text-slate-400">
                                    I want to join courses, access learning
                                    materials, and track my progress.
                                </p>
                            </div>
                        </button>

                        <button
                            onClick={() => setSelectedRole("teacher")}
                            className={cn(
                                "group relative flex flex-col items-center gap-4 rounded-2xl border p-6 text-center transition-all duration-300",
                                selectedRole === "teacher"
                                    ? "border-indigo-500 bg-indigo-500/10 shadow-lg shadow-indigo-500/10"
                                    : "border-slate-800 bg-slate-800/30 hover:border-slate-600 hover:bg-slate-800/50"
                            )}
                        >
                            {selectedRole === "teacher" && (
                                <div className="absolute top-4 right-4 flex h-6 w-6 items-center justify-center rounded-full bg-indigo-500">
                                    <Check className="h-3.5 w-3.5 text-white" />
                                </div>
                            )}
                            <div
                                className={cn(
                                    "rounded-full p-4 transition-colors",
                                    selectedRole === "teacher"
                                        ? "bg-indigo-500/20 text-indigo-400"
                                        : "bg-slate-800 text-slate-400 group-hover:text-indigo-400"
                                )}
                            >
                                <School className="h-10 w-10" />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-lg font-bold text-white">
                                    I am a Teacher
                                </h3>
                                <p className="text-sm leading-relaxed text-slate-400">
                                    I want to create courses, upload content,
                                    and manage students.
                                </p>
                            </div>
                        </button>
                    </div>

                    <Button
                        onClick={handleRoleSelection}
                        disabled={isLoading || !selectedRole}
                        className="h-14 w-full rounded-xl bg-indigo-600 text-base font-bold text-white shadow-lg shadow-indigo-500/20 transition-all hover:bg-indigo-500 hover:shadow-indigo-500/30 active:scale-[0.98] disabled:opacity-50 disabled:shadow-none"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                Setting up your account...
                            </>
                        ) : (
                            "Continue"
                        )}
                    </Button>
                </div>
            </motion.div>
        </div>
    );
}
