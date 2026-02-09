"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
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
import { Textarea } from "~/components/ui/textarea";
import { Label } from "~/components/ui/label";
import { useSession } from "~/lib/auth-client";
import { useToast } from "~/hooks/use-toast";

function generateJoinCode() {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
}

export function CreateCourseDialog() {
    const { data: session } = useSession();
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { toast } = useToast();

    const utils = api.useUtils();

    const createCourse = api.course.create.useMutation({
        onSuccess: () => {
            toast({
                title: "Course created",
                description: "Your new course has been created successfully.",
            });
            setOpen(false);
            setTitle("");
            setDescription("");
            void utils.course.list.invalidate();
        },
        onError: (error) => {
            toast({
                title: "Error",
                description: error.message || "Failed to create course",
                variant: "destructive",
            });
        },
    });

    // Fetch user to check role
    const { data: user } = api.user.getById.useQuery(
        { id: session?.user?.id ?? "" },
        { enabled: !!session?.user?.id }
    );

    // Only show for teachers
    if (!user || user.role !== "teacher") {
        return null;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!session?.user?.id || !title.trim()) return;

        setIsSubmitting(true);
        try {
            await createCourse.mutateAsync({
                title: title.trim(),
                description: description.trim() || undefined,
                joinCode: generateJoinCode(),
                teacherId: session.user.id,
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    Create Course
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Create New Course</DialogTitle>
                        <DialogDescription>
                            Create a new course that students can join using a
                            code.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="title">Course Title</Label>
                            <Input
                                id="title"
                                placeholder="e.g. Introduction to Programming"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="description">
                                Description (optional)
                            </Label>
                            <Textarea
                                id="description"
                                placeholder="Brief description of the course..."
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                rows={3}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            type="submit"
                            disabled={isSubmitting || !title.trim()}
                        >
                            {isSubmitting ? "Creating..." : "Create Course"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
