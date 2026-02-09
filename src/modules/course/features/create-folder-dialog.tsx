"use client";

import { useState } from "react";

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
import { useToast } from "~/hooks/use-toast";

interface CreateFolderDialogProps {
    courseId: string;
    parentId: string | null;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    trigger?: React.ReactNode;
}

export function CreateFolderDialog({
    courseId,
    parentId,
    open: controlledOpen,
    onOpenChange: setControlledOpen,
    trigger,
}: CreateFolderDialogProps) {
    const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
    const [name, setName] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { toast } = useToast();

    const isControlled = controlledOpen !== undefined;
    const open = isControlled ? controlledOpen : uncontrolledOpen;
    const setOpen = isControlled ? setControlledOpen : setUncontrolledOpen;

    const utils = api.useUtils();

    const createFolder = api.folder.create.useMutation({
        onSuccess: () => {
            toast({
                title: "Folder created",
                description: "Your new folder has been created successfully.",
            });
            setOpen?.(false);
            setName("");
            // Invalidate the getContents query to refresh the list
            void utils.folder.getContents.invalidate({
                courseId,
                folderId: parentId,
            });
        },
        onError: (error) => {
            toast({
                title: "Error",
                description: error.message || "Failed to create folder",
                variant: "destructive",
            });
        },
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) return;

        setIsSubmitting(true);
        try {
            await createFolder.mutateAsync({
                name: name.trim(),
                courseId,
                parentId,
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
                        <DialogTitle>Create New Folder</DialogTitle>
                        <DialogDescription>
                            Create a folder to organize your course notes.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Folder Name</Label>
                            <Input
                                id="name"
                                placeholder="e.g. Week 1, Assignments"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            type="submit"
                            disabled={isSubmitting || !name.trim()}
                        >
                            {isSubmitting ? "Creating..." : "Create Folder"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
