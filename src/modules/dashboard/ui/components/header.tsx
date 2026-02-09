import React from "react";

export const DashboardHeader = () => {
    return (
        <header className="mx-auto mb-12 text-center">
            <h1 className="text-5xl font-medium text-white">
                Welcome, <span className="text-indigo-400">Test</span>
            </h1>

            <p className="mt-1 text-sm text-slate-400">
                Ready to learn something new today?
            </p>
        </header>
    );
};
