"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { api } from "~/trpc/react";
import { Button } from "~/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import { useToast } from "~/hooks/use-toast";
import { ConfirmDeleteDialog } from "~/modules/course/features/confirm-delete-dialog";

interface EditCourseDialogProps {
    courseId: string;
    title: string;
    description?: string | null;
    trigger?: React.ReactNode;
}

export function EditCourseDialog({
    courseId,
    title,
    description,
    trigger,
}: EditCourseDialogProps) {
    const [open, setOpen] = useState(false);
    const [courseTitle, setCourseTitle] = useState(title);
    const [courseDescription, setCourseDescription] = useState(
        description ?? ""
    );
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
    const { toast } = useToast();
    const router = useRouter();

    const utils = api.useUtils();

    useEffect(() => {
        if (open) {
            setCourseTitle(title);
            setCourseDescription(description ?? "");
        }
    }, [open, title, description]);

    const updateCourse = api.course.update.useMutation({
        onSuccess: () => {
            toast({
                title: "Course updated",
                description: "Your course details have been saved.",
            });
            setOpen(false);
            void utils.course.getById.invalidate({ id: courseId });
            void utils.course.list.invalidate();
        },
        onError: (error) => {
            toast({
                title: "Update failed",
                description: error.message || "Failed to update course",
                variant: "destructive",
            });
        },
    });

    const deleteCourse = api.course.delete.useMutation({
        onSuccess: () => {
            toast({
                title: "Course deleted",
                description: "The course has been removed.",
            });
            setConfirmDeleteOpen(false);
            setOpen(false);
            void utils.course.list.invalidate();
            router.push("/course");
        },
        onError: (error) => {
            toast({
                title: "Delete failed",
                description: error.message || "Failed to delete course",
                variant: "destructive",
            });
        },
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!courseTitle.trim()) return;

        setIsSubmitting(true);
        try {
            await updateCourse.mutateAsync({
                id: courseId,
                title: courseTitle.trim(),
                description: courseDescription.trim() || undefined,
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
            <DialogContent className="sm:max-w-md">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Edit Course</DialogTitle>
                        <DialogDescription>
                            Update the course title and description.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="course-title">Title</Label>
                            <Input
                                id="course-title"
                                value={courseTitle}
                                onChange={(e) => setCourseTitle(e.target.value)}
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="course-description">
                                Description (optional)
                            </Label>
                            <Textarea
                                id="course-description"
                                value={courseDescription}
                                onChange={(e) =>
                                    setCourseDescription(e.target.value)
                                }
                                rows={3}
                            />
                        </div>
                    </div>
                    <DialogFooter className="flex items-center justify-between">
                        <Button
                            type="button"
                            variant="destructive"
                            onClick={() => setConfirmDeleteOpen(true)}
                        >
                            Delete Course
                        </Button>
                        <Button
                            type="submit"
                            disabled={isSubmitting || !courseTitle.trim()}
                        >
                            {isSubmitting ? "Saving..." : "Save Changes"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
            <ConfirmDeleteDialog
                open={confirmDeleteOpen}
                title="Delete course?"
                description="This will permanently delete the course and its contents."
                confirmLabel="Delete Course"
                isPending={deleteCourse.isPending}
                onConfirm={() => deleteCourse.mutate({ id: courseId })}
                onOpenChange={setConfirmDeleteOpen}
            />
        </Dialog>
    );
}
