"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Loader2, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { authClient } from "~/lib/auth-client";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

export default function AuthPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const defaultTab =
        searchParams.get("tab") === "signup" ? "signup" : "signin";
    const [isEmailLoading, setIsEmailLoading] = useState(false);
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    const handleGoogleSignIn = async () => {
        setIsGoogleLoading(true);
        try {
            await authClient.signIn.social({
                provider: "google",
                callbackURL: "/dashboard",
            });
        } catch {
            toast.error("Something went wrong. Please try again.");
            setIsGoogleLoading(false);
        }
    };

    const handleEmailSignIn = async () => {
        if (!email || !password) {
            toast.error("Please fill in all fields");
            return;
        }
        setIsEmailLoading(true);
        try {
            await authClient.signIn.email(
                {
                    email,
                    password,
                    callbackURL: "/dashboard",
                },
                {
                    onSuccess: () => {
                        router.push("/dashboard");
                    },
                    onError: (ctx) => {
                        toast.error(
                            ctx.error.message || "Something went wrong."
                        );
                        setIsEmailLoading(false);
                    },
                }
            );
        } catch {
            toast.error("Something went wrong. Please try again.");
            setIsEmailLoading(false);
        }
    };

    const handleEmailSignUp = async () => {
        if (!email || !password || !name) {
            toast.error("Please fill in all fields");
            return;
        }
        setIsEmailLoading(true);
        try {
            await authClient.signUp.email(
                {
                    email,
                    password,
                    name,
                    callbackURL: "/onboarding",
                },
                {
                    onSuccess: () => {
                        toast.success("Account created!");
                        router.push("/onboarding");
                    },
                    onError: (ctx) => {
                        toast.error(
                            ctx.error.message || "Something went wrong."
                        );
                        setIsEmailLoading(false);
                    },
                }
            );
        } catch {
            toast.error("Something went wrong. Please try again.");
            setIsEmailLoading(false);
        }
    };

    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 p-4">
            {/* Background matching landing page */}
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

            {/* Back to home button */}
            <motion.a
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                href="/"
                className="group fixed top-6 left-6 flex items-center gap-2 text-sm font-semibold text-slate-400 transition-colors hover:text-white"
            >
                <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
                <span>Back to Home</span>
            </motion.a>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="w-full max-w-md"
            >
                <Card className="relative overflow-hidden border-slate-800 bg-slate-900/60 shadow-2xl shadow-indigo-500/5 backdrop-blur-xl">
                    {/* Card glow effect */}
                    <div className="absolute -inset-1 -z-10 rounded-xl bg-gradient-to-r from-indigo-500/20 via-sky-500/20 to-indigo-500/20 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />

                    <CardHeader className="space-y-3 pb-6 text-center">
                        <CardTitle className="flex flex-col items-center gap-2">
                            <span className="bg-gradient-to-r from-indigo-400 via-sky-400 to-indigo-400 bg-clip-text text-4xl font-black tracking-tight text-transparent">
                                Shikshya
                            </span>
                        </CardTitle>
                        <CardDescription className="text-base text-slate-400">
                            {defaultTab === "signin"
                                ? "Welcome back! Sign in to continue your learning journey."
                                : "Join thousands transforming their study workflow."}
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="pb-8">
                        <Tabs defaultValue={defaultTab} className="w-full">
                            <TabsList className="grid w-full grid-cols-2 bg-slate-800/50 p-1">
                                <TabsTrigger
                                    value="signin"
                                    className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white"
                                >
                                    Sign In
                                </TabsTrigger>
                                <TabsTrigger
                                    value="signup"
                                    className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white"
                                >
                                    Sign Up
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent
                                value="signin"
                                className="space-y-4 pt-6"
                            >
                                <div className="space-y-2">
                                    <Label
                                        htmlFor="signin-email"
                                        className="text-slate-300"
                                    >
                                        Email
                                    </Label>
                                    <Input
                                        id="signin-email"
                                        type="email"
                                        placeholder="you@example.com"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        className="border-slate-700 bg-slate-800/50 text-white placeholder:text-slate-500 focus:border-indigo-500 focus:ring-indigo-500"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label
                                        htmlFor="signin-password"
                                        className="text-slate-300"
                                    >
                                        Password
                                    </Label>
                                    <Input
                                        id="signin-password"
                                        type="password"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                        className="border-slate-700 bg-slate-800/50 text-white placeholder:text-slate-500 focus:border-indigo-500 focus:ring-indigo-500"
                                    />
                                </div>
                                <Button
                                    className="w-full bg-indigo-600 font-bold text-white shadow-lg shadow-indigo-600/20 transition-all hover:enabled:scale-[1.02] hover:enabled:bg-indigo-500 hover:enabled:shadow-xl hover:enabled:shadow-indigo-600/30 disabled:opacity-70"
                                    onClick={handleEmailSignIn}
                                    disabled={isEmailLoading || isGoogleLoading}
                                >
                                    {isEmailLoading && (
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    )}
                                    {isEmailLoading
                                        ? "Signing in..."
                                        : "Sign In"}
                                </Button>
                            </TabsContent>

                            <TabsContent
                                value="signup"
                                className="space-y-4 pt-6"
                            >
                                <div className="space-y-2">
                                    <Label
                                        htmlFor="signup-name"
                                        className="text-slate-300"
                                    >
                                        Name
                                    </Label>
                                    <Input
                                        id="signup-name"
                                        type="text"
                                        placeholder="John Doe"
                                        value={name}
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }
                                        className="border-slate-700 bg-slate-800/50 text-white placeholder:text-slate-500 focus:border-indigo-500 focus:ring-indigo-500"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label
                                        htmlFor="signup-email"
                                        className="text-slate-300"
                                    >
                                        Email
                                    </Label>
                                    <Input
                                        id="signup-email"
                                        type="email"
                                        placeholder="you@example.com"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        className="border-slate-700 bg-slate-800/50 text-white placeholder:text-slate-500 focus:border-indigo-500 focus:ring-indigo-500"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label
                                        htmlFor="signup-password"
                                        className="text-slate-300"
                                    >
                                        Password
                                    </Label>
                                    <Input
                                        id="signup-password"
                                        type="password"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                        className="border-slate-700 bg-slate-800/50 text-white placeholder:text-slate-500 focus:border-indigo-500 focus:ring-indigo-500"
                                    />
                                </div>
                                <Button
                                    className="w-full bg-indigo-600 font-bold text-white shadow-lg shadow-indigo-600/20 transition-all hover:enabled:scale-[1.02] hover:enabled:bg-indigo-500 hover:enabled:shadow-xl hover:enabled:shadow-indigo-600/30 disabled:opacity-70"
                                    onClick={handleEmailSignUp}
                                    disabled={isEmailLoading || isGoogleLoading}
                                >
                                    {isEmailLoading && (
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    )}
                                    {isEmailLoading
                                        ? "Creating account..."
                                        : "Create Account"}
                                </Button>
                            </TabsContent>
                        </Tabs>

                        <div className="relative my-6">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-slate-700" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-slate-900 px-2 text-slate-500">
                                    Or continue with
                                </span>
                            </div>
                        </div>

                        <Button
                            variant="outline"
                            onClick={handleGoogleSignIn}
                            disabled={isEmailLoading || isGoogleLoading}
                            className="h-12 w-full border-slate-700 bg-slate-800/30 font-semibold text-white backdrop-blur-sm transition-all hover:enabled:scale-[1.02] hover:enabled:border-slate-600 hover:enabled:bg-slate-800/60 disabled:opacity-70"
                        >
                            {isGoogleLoading ? (
                                <Loader2 className="mr-2 size-4 animate-spin" />
                            ) : (
                                <svg
                                    className="mr-3 h-5 w-5"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fill="#4285F4"
                                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                    ></path>
                                    <path
                                        fill="#34A853"
                                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    ></path>
                                    <path
                                        fill="#FBBC05"
                                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                    ></path>
                                    <path
                                        fill="#EA4335"
                                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                    ></path>
                                </svg>
                            )}
                            Continue with Google
                        </Button>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
}
