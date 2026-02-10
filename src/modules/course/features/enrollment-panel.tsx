"use client";

import { useState } from "react";
import { UserPlus, X } from "lucide-react";

import { api } from "~/trpc/react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { UserAvatar } from "~/components/user-avatar";
import { useToast } from "~/hooks/use-toast";
import { ConfirmDeleteDialog } from "~/modules/course/features/confirm-delete-dialog";

interface EnrollmentPanelProps {
    courseId: string;
    canManage: boolean;
}

export function EnrollmentPanel({ courseId, canManage }: EnrollmentPanelProps) {
    const { toast } = useToast();
    const [email, setEmail] = useState("");
    const [pendingRemoval, setPendingRemoval] = useState<{
        userId: string;
        name: string | null;
    } | null>(null);

    const { data: students = [] } = api.enrollment.listByCourse.useQuery({
        courseId,
    });

    const utils = api.useUtils();

    const addStudent = api.enrollment.addByEmail.useMutation({
        onSuccess: (result) => {
            toast({
                title: result.alreadyEnrolled
                    ? "Already enrolled"
                    : "Student added",
                description: result.alreadyEnrolled
                    ? "That student is already in this course."
                    : "Student was added to the course.",
            });
            setEmail("");
            void utils.enrollment.listByCourse.invalidate({ courseId });
        },
        onError: (error) => {
            toast({
                title: "Add failed",
                description: error.message || "Failed to add student",
                variant: "destructive",
            });
        },
    });

    const removeStudent = api.enrollment.removeByUser.useMutation({
        onSuccess: () => {
            toast({
                title: "Student removed",
                description: "The student has been removed from the course.",
            });
            void utils.enrollment.listByCourse.invalidate({ courseId });
        },
        onError: (error) => {
            toast({
                title: "Remove failed",
                description: error.message || "Failed to remove student",
                variant: "destructive",
            });
        },
    });

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email.trim()) return;
        addStudent.mutate({ courseId, email: email.trim().toLowerCase() });
    };

    return (
        <Card className="border-slate-700/50 bg-slate-900/50">
            <CardHeader className="space-y-1">
                <CardTitle className="text-base text-white">
                    Enrolled Students
                </CardTitle>
                <p className="text-xs text-slate-400">
                    Ranked by total reward points
                </p>
            </CardHeader>
            <CardContent className="space-y-4">
                {canManage && (
                    <form onSubmit={handleAdd} className="flex gap-2">
                        <Input
                            type="email"
                            placeholder="Add student by email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="border-slate-700 bg-slate-800"
                        />
                        <Button
                            type="submit"
                            className="gap-2"
                            disabled={addStudent.isPending}
                        >
                            <UserPlus className="h-4 w-4" />
                            Add
                        </Button>
                    </form>
                )}

                {students.length === 0 ? (
                    <div className="rounded-lg border border-dashed border-slate-700 p-4 text-center text-xs text-slate-400">
                        No students enrolled yet.
                    </div>
                ) : (
                    <div className="space-y-3">
                        {students.map((student, index) => (
                            <div
                                key={student.userId}
                                className="flex items-center justify-between rounded-lg border border-slate-800/60 bg-slate-950/40 px-3 py-2"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="flex h-7 w-7 items-center justify-center rounded-full border border-slate-700 text-xs font-semibold text-slate-300">
                                        {index + 1}
                                    </div>
                                    <UserAvatar
                                        size="xs"
                                        name={student.name ?? "Student"}
                                        imageUrl={student.image ?? ""}
                                    />
                                    <div>
                                        <p className="text-sm text-white">
                                            {student.name ?? "Student"}
                                        </p>
                                        <p className="text-xs text-slate-400">
                                            {student.totalPoints ?? 0} pts
                                        </p>
                                    </div>
                                </div>
                                {canManage && (
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 text-slate-400 hover:text-red-400"
                                        onClick={() =>
                                            setPendingRemoval({
                                                userId: student.userId,
                                                name: student.name ?? "Student",
                                            })
                                        }
                                        disabled={removeStudent.isPending}
                                    >
                                        <X className="h-4 w-4" />
                                    </Button>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </CardContent>
            <ConfirmDeleteDialog
                open={!!pendingRemoval}
                title="Remove student?"
                description={
                    pendingRemoval
                        ? `This will remove "${pendingRemoval.name}" from the course.`
                        : ""
                }
                confirmLabel="Remove"
                isPending={removeStudent.isPending}
                onConfirm={() => {
                    if (!pendingRemoval) return;
                    removeStudent.mutate({
                        courseId,
                        userId: pendingRemoval.userId,
                    });
                    setPendingRemoval(null);
                }}
                onOpenChange={(open) => {
                    if (!open) setPendingRemoval(null);
                }}
            />
        </Card>
    );
}
