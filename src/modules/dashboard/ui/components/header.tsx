"use client";

import React from "react";
import { useSession } from "~/lib/auth-client";

export const DashboardHeader = () => {
    const { data: session } = useSession();
    const userName = session?.user?.name ?? "User";

    return (
        <header className="mx-auto mb-12 text-center">
            <h1 className="text-5xl font-medium text-white">
                Welcome, <span className="text-indigo-400">{userName}</span>
            </h1>

            <p className="text-muted-foreground mt-1 text-sm">
                Ready to learn something new today?
            </p>
        </header>
    );
};
