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
            <Card className="w-full max-w-md border-slate-700/50 bg-slate-900/80 backdrop-blur-sm">
                <CardHeader className="space-y-1 text-center">
                    <CardTitle className="text-2xl font-bold tracking-tight text-white">
                        Welcome back
                    </CardTitle>
                    <CardDescription className="text-slate-400">
                        Enter your credentials to access your account
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
                                className="mt-2 w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
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

                <CardFooter className="justify-center bg-slate-800/50">
                    <p className="text-sm text-slate-400">
                        Don&apos;t have an account?{" "}
                        <Link
                            href="/sign-up"
                            className="font-medium text-blue-400 transition-colors hover:text-blue-300"
                        >
                            Sign up
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
}
