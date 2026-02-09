"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Mail, Lock, Loader2 } from "lucide-react";

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

const signInSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(1, "Password is required"),
});

type SignInFormData = z.infer<typeof signInSchema>;

export default function SignInPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignInFormData>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (data: SignInFormData) => {
        setIsLoading(true);

        try {
            const response = await authClient.signIn.email({
                email: data.email,
                password: data.password,
            });

            if (response.error) {
                toast.error(
                    response.error.message ?? "Invalid email or password"
                );
                return;
            }

            toast.success("Signed in successfully!");
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
                <CardHeader className="space-y-2 text-center">
                    <CardTitle className="flex flex-col items-center gap-1">
                        <span className="text-3xl font-bold tracking-tight text-indigo-400">
                            Shik<span className="text-3xl">क्ष</span>ya
                        </span>
                    </CardTitle>
                    <CardDescription className="text-slate-400">
                        Enter your credentials to access your account.
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <FieldGroup>
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
                                        autoComplete="email"
                                        disabled={isLoading}
                                        aria-invalid={!!errors.email}
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
                                <div className="flex items-center justify-between">
                                    <FieldLabel
                                        htmlFor="password"
                                        className="text-slate-200"
                                    >
                                        Password
                                    </FieldLabel>
                                    <Link
                                        href="#"
                                        className="text-xs text-indigo-400 underline-offset-4 hover:underline"
                                    >
                                        Forgot?
                                    </Link>
                                </div>
                                <InputGroup className="border-slate-700 bg-slate-800/50">
                                    <InputGroupAddon align="inline-start">
                                        <Lock className="size-4 text-slate-400" />
                                    </InputGroupAddon>
                                    <InputGroupInput
                                        id="password"
                                        type="password"
                                        placeholder="••••••••"
                                        autoComplete="current-password"
                                        disabled={isLoading}
                                        aria-invalid={!!errors.password}
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

                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="mt-2 w-full bg-indigo-600 font-semibold text-white shadow-lg shadow-indigo-500/20 transition-all hover:bg-indigo-500 active:scale-[0.98]"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 size-4 animate-spin" />
                                        Signing in...
                                    </>
                                ) : (
                                    "Sign in"
                                )}
                            </Button>
                        </FieldGroup>
                    </form>
                </CardContent>

                <CardFooter className="justify-center border-t border-slate-800 pt-6">
                    <p className="text-sm text-slate-400">
                        Don&apos;t have an account?{" "}
                        <Link
                            href="/register"
                            className="font-semibold text-indigo-400 decoration-2 underline-offset-4 hover:underline"
                        >
                            Register
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
}
