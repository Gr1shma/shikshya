"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import {
    User,
    Mail,
    Lock,
    Loader2,
    GraduationCap,
    Presentation,
} from "lucide-react"; // Added icons

import { authClient } from "~/lib/auth-client";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import {
    Field,
    FieldLabel,
    FieldError,
    FieldGroup,
} from "~/components/ui/field";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "~/components/ui/input-group";

// 1. Updated Schema to include role
const signUpSchema = z
    .object({
        role: z.enum(["student", "teacher"]),
        name: z.string().min(2, "Name must be at least 2 characters"),
        email: z.string().email("Please enter a valid email address"),
        password: z.string().min(8, "Password must be at least 8 characters"),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

type SignUpFormData = z.infer<typeof signUpSchema>;

export default function SignUpPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm<SignUpFormData>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            role: "student", // Default role
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    const currentRole = watch("role");

    const onSubmit = async (data: SignUpFormData) => {
        setIsLoading(true);
        try {
            const response = await authClient.signUp.email({
                name: data.name,
                email: data.email,
                password: data.password,
            });

            if (response.error) {
                toast.error(
                    response.error.message ?? "Failed to create account"
                );
                return;
            }

            toast.success("Account created successfully!");
            router.push("/dashboard");
        } catch {
            toast.error("Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
            <Card className="w-full max-w-md border-slate-700/50 bg-slate-900/80 shadow-2xl backdrop-blur-sm">
                <CardHeader className="space-y-1 text-center">
                    <CardTitle className="text-2xl font-bold tracking-tight text-white">
                        Create an account
                    </CardTitle>
                    <CardDescription className="text-slate-400">
                        Join{" "}
                        <span className="text-xl text-indigo-400">
                            Shik<span className="text-xl">क्ष</span>ya
                        </span>{" "}
                        to manage your stay effortlessly.
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <FieldGroup>
                            {/* --- Role Selection Section --- */}
                            <div className="mb-2 space-y-3">
                                <FieldLabel className="text-slate-200">
                                    Register as a:
                                </FieldLabel>
                                <div className="grid grid-cols-2 gap-4">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setValue("role", "student")
                                        }
                                        className={`flex items-center justify-center gap-2 rounded-md border p-3 transition-all duration-200 ${
                                            currentRole === "student"
                                                ? "border-indigo-500 bg-indigo-600/20 text-indigo-100 ring-2 ring-indigo-500/20"
                                                : "border-slate-700 bg-slate-800/50 text-slate-400 hover:border-slate-600"
                                        }`}
                                    >
                                        <GraduationCap className="size-4" />
                                        <span className="text-sm font-semibold">
                                            Student
                                        </span>
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setValue("role", "teacher")
                                        }
                                        className={`flex items-center justify-center gap-2 rounded-md border p-3 transition-all duration-200 ${
                                            currentRole === "teacher"
                                                ? "border-indigo-500 bg-indigo-600/20 text-indigo-100 ring-2 ring-indigo-500/20"
                                                : "border-slate-700 bg-slate-800/50 text-slate-400 hover:border-slate-600"
                                        }`}
                                    >
                                        <Presentation className="size-4" />
                                        <span className="text-sm font-semibold">
                                            Teacher
                                        </span>
                                    </button>
                                </div>
                            </div>
                            {/* ----------------------------- */}

                            <Field data-invalid={!!errors.name}>
                                <FieldLabel
                                    htmlFor="name"
                                    className="text-slate-200"
                                >
                                    Full Name
                                </FieldLabel>
                                <InputGroup className="border-slate-700 bg-slate-800/50">
                                    <InputGroupAddon align="inline-start">
                                        <User className="size-4 text-slate-400" />
                                    </InputGroupAddon>
                                    <InputGroupInput
                                        id="name"
                                        type="text"
                                        placeholder="John Doe"
                                        disabled={isLoading}
                                        className="text-white placeholder:text-slate-500"
                                        {...register("name")}
                                    />
                                </InputGroup>
                                {errors.name && (
                                    <FieldError>
                                        {errors.name.message}
                                    </FieldError>
                                )}
                            </Field>

                            <Field data-invalid={!!errors.email}>
                                <FieldLabel
                                    htmlFor="email"
                                    className="text-slate-200"
                                >
                                    Email
                                </FieldLabel>
                                <InputGroup className="border-slate-700 bg-slate-800/50">
                                    <InputGroupAddon align="inline-start">
                                        <Mail className="size-4 text-slate-400" />
                                    </InputGroupAddon>
                                    <InputGroupInput
                                        id="email"
                                        type="email"
                                        placeholder="you@example.com"
                                        disabled={isLoading}
                                        className="text-white placeholder:text-slate-500"
                                        {...register("email")}
                                    />
                                </InputGroup>
                                {errors.email && (
                                    <FieldError>
                                        {errors.email.message}
                                    </FieldError>
                                )}
                            </Field>

                            <Field data-invalid={!!errors.password}>
                                <FieldLabel
                                    htmlFor="password"
                                    className="text-slate-200"
                                >
                                    Password
                                </FieldLabel>
                                <InputGroup className="border-slate-700 bg-slate-800/50">
                                    <InputGroupAddon align="inline-start">
                                        <Lock className="size-4 text-slate-400" />
                                    </InputGroupAddon>
                                    <InputGroupInput
                                        id="password"
                                        type="password"
                                        placeholder="••••••••"
                                        disabled={isLoading}
                                        className="text-white placeholder:text-slate-500"
                                        {...register("password")}
                                    />
                                </InputGroup>
                                {errors.password && (
                                    <FieldError>
                                        {errors.password.message}
                                    </FieldError>
                                )}
                            </Field>

                            <Field data-invalid={!!errors.confirmPassword}>
                                <FieldLabel
                                    htmlFor="confirmPassword"
                                    className="text-slate-200"
                                >
                                    Confirm Password
                                </FieldLabel>
                                <InputGroup className="border-slate-700 bg-slate-800/50">
                                    <InputGroupAddon align="inline-start">
                                        <Lock className="size-4 text-slate-400" />
                                    </InputGroupAddon>
                                    <InputGroupInput
                                        id="confirmPassword"
                                        type="password"
                                        placeholder="••••••••"
                                        disabled={isLoading}
                                        className="text-white placeholder:text-slate-500"
                                        {...register("confirmPassword")}
                                    />
                                </InputGroup>
                                {errors.confirmPassword && (
                                    <FieldError>
                                        {errors.confirmPassword.message}
                                    </FieldError>
                                )}
                            </Field>

                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="mt-2 w-full bg-indigo-600 font-semibold text-white shadow-lg shadow-indigo-500/20 transition-all hover:bg-indigo-500 active:scale-[0.98]"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 size-4 animate-spin" />
                                        Creating account...
                                    </>
                                ) : (
                                    "Get Started"
                                )}
                            </Button>
                        </FieldGroup>
                    </form>
                </CardContent>

                <CardFooter className="justify-center border-t border-slate-800 pt-6">
                    <p className="text-sm text-slate-400">
                        Already have an account?{" "}
                        <Link
                            href="/login"
                            className="font-semibold text-indigo-400 decoration-2 underline-offset-4 hover:underline"
                        >
                            Sign in
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
}
