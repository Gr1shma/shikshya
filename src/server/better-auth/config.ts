import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "~/server/db";
import * as schema from "~/server/db/schema";
import { env } from "~/env";

export const auth = betterAuth({
    baseURL:
        process.env.BETTER_AUTH_BASE_URL ?? process.env.NEXT_PUBLIC_APP_URL,
    database: drizzleAdapter(db, {
        provider: "pg",
        schema,
    }),
    socialProviders: {
        google: {
            clientId: env.GOOGLE_CLIENT_ID,
            clientSecret: env.GOOGLE_CLIENT_SECRET,
        },
    },
    user: {
        additionalFields: {
            role: {
                type: "string",
                required: true,
                defaultValue: "student",
                input: true,
                fieldName: "role",
            },
            onboardingCompleted: {
                type: "boolean",
                required: true,
                defaultValue: false,
                input: false,
                fieldName: "onboardingCompleted",
            },
            teacherVerified: {
                type: "boolean",
                required: true,
                defaultValue: false,
                input: false,
                fieldName: "teacherVerified",
            },
        },
    },
    emailAndPassword: {
        enabled: true,
    },
});

export type Session = typeof auth.$Infer.Session;
