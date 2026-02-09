import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient();

export type SignUpData = {
    name: string;
    email: string;
    password: string;
    role: "student" | "teacher";
};

export type Session = typeof authClient.$Infer.Session;
