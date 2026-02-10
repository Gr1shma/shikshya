"use client";

import { useState } from "react";
import { api } from "~/trpc/react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

export default function AdminPanel() {
    const [email, setEmail] = useState("");
    const [searchedEmail, setSearchedEmail] = useState<string | null>(null);

    const userQuery = api.user.getByEmail.useQuery(
        { email: searchedEmail ?? "" },
        { enabled: !!searchedEmail }
    );
    const user = userQuery.data;
    const isFetching = userQuery.isFetching;

    const utils = api.useUtils();

    const setRole = api.user.setRole.useMutation({
        onSuccess: async () => {
            if (searchedEmail) {
                await utils.user.getByEmail.invalidate({
                    email: searchedEmail,
                });
            }
        },
    });

    const verifyTeacher = api.user.verifyTeacher.useMutation({
        onSuccess: async () => {
            if (searchedEmail) {
                await utils.user.getByEmail.invalidate({
                    email: searchedEmail,
                });
            }
        },
    });

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        const trimmed = email.trim().toLowerCase();
        if (!trimmed) return;
        setSearchedEmail(trimmed);
    };

    const handleToggle = () => {
        if (!user) return;
        const nextRole = user.role === "admin" ? "student" : "admin";
        setRole.mutate({ id: user.id, role: nextRole });
    };

    const handleTeacherVerification = () => {
        if (user?.role !== "teacher") return;
        verifyTeacher.mutate({
            id: user.id,
            verified: !user.teacherVerified,
        });
    };

    return (
        <div className="mx-auto max-w-3xl space-y-6">
            <Card className="border-slate-700/50 bg-slate-900/70">
                <CardHeader>
                    <CardTitle>Admin Panel</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <form onSubmit={handleSearch} className="flex gap-3">
                        <Input
                            type="email"
                            placeholder="Search by email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="border-slate-700 bg-slate-800"
                        />
                        <Button type="submit" disabled={isFetching}>
                            {isFetching ? "Searching..." : "Search"}
                        </Button>
                    </form>

                    {searchedEmail && !user && !isFetching && (
                        <p className="text-sm text-slate-400">
                            No user found for that email.
                        </p>
                    )}

                    {user && (
                        <div className="rounded-xl border border-white/10 bg-slate-950/60 p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-slate-400">
                                        {user.email}
                                    </p>
                                    <p className="text-lg font-semibold text-white">
                                        {user.name}
                                    </p>
                                    <p className="text-sm text-slate-400">
                                        Role:{" "}
                                        <span className="text-indigo-300">
                                            {user.role}
                                        </span>
                                    </p>
                                    {user.role === "teacher" && (
                                        <p className="text-sm text-slate-400">
                                            Teacher verified:{" "}
                                            <span className="text-indigo-300">
                                                {user.teacherVerified
                                                    ? "Yes"
                                                    : "No"}
                                            </span>
                                        </p>
                                    )}
                                </div>
                                <div className="flex flex-col gap-2">
                                    <Button
                                        onClick={handleToggle}
                                        disabled={setRole.isPending}
                                        variant={
                                            user.role === "admin"
                                                ? "outline"
                                                : "default"
                                        }
                                    >
                                        {user.role === "admin"
                                            ? "Demote to Student"
                                            : "Promote to Admin"}
                                    </Button>
                                    {user.role === "teacher" && (
                                        <Button
                                            onClick={handleTeacherVerification}
                                            disabled={verifyTeacher.isPending}
                                            variant={
                                                user.teacherVerified
                                                    ? "outline"
                                                    : "default"
                                            }
                                        >
                                            {user.teacherVerified
                                                ? "Unverify Teacher"
                                                : "Verify Teacher"}
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
