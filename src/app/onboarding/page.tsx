"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2, GraduationCap, School } from "lucide-react";
import { api } from "~/trpc/react";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "~/components/ui/card";
import { Button } from "~/components/ui/button";

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
        if (!selectedRole) return;
        completeOnboarding({ role: selectedRole });
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
            <Card className="w-full max-w-2xl border-slate-700/50 bg-slate-900/80 shadow-2xl backdrop-blur-sm">
                <CardHeader className="space-y-2 text-center">
                    <CardTitle className="text-3xl font-bold tracking-tight text-white">
                        Welcome to Shik
                        <span className="text-indigo-400">क्ष</span>ya
                    </CardTitle>
                    <CardDescription className="text-lg text-slate-400">
                        Tell us how you plan to use the platform
                    </CardDescription>
                </CardHeader>

                <CardContent className="flex flex-col gap-8 pb-8">
                    <div className="grid gap-6 md:grid-cols-2">
                        <button
                            onClick={() => setSelectedRole("student")}
                            className={`group relative flex flex-col items-center gap-4 rounded-xl border-2 p-8 transition-all hover:border-indigo-500 hover:bg-slate-800/50 ${
                                selectedRole === "student"
                                    ? "border-indigo-500 bg-slate-800/50 ring-2 ring-indigo-500/20"
                                    : "border-slate-700 bg-slate-800/20"
                            }`}
                        >
                            <div className="rounded-full bg-indigo-500/10 p-4 transition-colors group-hover:bg-indigo-500/20">
                                <GraduationCap className="h-12 w-12 text-indigo-400" />
                            </div>
                            <div className="space-y-2 text-center">
                                <h3 className="text-xl font-semibold text-white">
                                    I am a Student
                                </h3>
                                <p className="text-sm text-slate-400">
                                    I want to join courses, access learning
                                    materials, and track my progress.
                                </p>
                            </div>
                        </button>

                        <button
                            onClick={() => setSelectedRole("teacher")}
                            className={`group relative flex flex-col items-center gap-4 rounded-xl border-2 p-8 transition-all hover:border-indigo-500 hover:bg-slate-800/50 ${
                                selectedRole === "teacher"
                                    ? "border-indigo-500 bg-slate-800/50 ring-2 ring-indigo-500/20"
                                    : "border-slate-700 bg-slate-800/20"
                            }`}
                        >
                            <div className="rounded-full bg-indigo-500/10 p-4 transition-colors group-hover:bg-indigo-500/20">
                                <School className="h-12 w-12 text-indigo-400" />
                            </div>
                            <div className="space-y-2 text-center">
                                <h3 className="text-xl font-semibold text-white">
                                    I am a Teacher
                                </h3>
                                <p className="text-sm text-slate-400">
                                    I want to create courses, upload content,
                                    and manage students.
                                </p>
                            </div>
                        </button>
                    </div>

                    <Button
                        onClick={handleRoleSelection}
                        disabled={isLoading || !selectedRole}
                        size="lg"
                        className="w-full bg-indigo-600 text-lg font-medium text-white hover:bg-indigo-700 disabled:opacity-50"
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
                </CardContent>
            </Card>
        </div>
    );
}
