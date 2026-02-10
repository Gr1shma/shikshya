"use client";

import { useEffect, useState } from "react";

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
    const { toast } = useToast();

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
                    <DialogFooter>
                        <Button
                            type="submit"
                            disabled={isSubmitting || !courseTitle.trim()}
                        >
                            {isSubmitting ? "Saving..." : "Save Changes"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
