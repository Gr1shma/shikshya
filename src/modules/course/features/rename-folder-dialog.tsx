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
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { useToast } from "~/hooks/use-toast";

interface RenameFolderDialogProps {
    courseId: string;
    parentId: string | null;
    folder: { id: string; name: string } | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function RenameFolderDialog({
    courseId,
    parentId,
    folder,
    open,
    onOpenChange,
}: RenameFolderDialogProps) {
    const [name, setName] = useState(folder?.name ?? "");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { toast } = useToast();

    const utils = api.useUtils();

    useEffect(() => {
        if (open) {
            setName(folder?.name ?? "");
        }
    }, [open, folder]);

    const renameFolder = api.folder.update.useMutation({
        onSuccess: () => {
            toast({
                title: "Folder renamed",
                description: "Folder name updated successfully.",
            });
            onOpenChange(false);
            void utils.folder.getContents.invalidate({
                courseId,
                folderId: parentId,
            });
        },
        onError: (error) => {
            toast({
                title: "Rename failed",
                description: error.message || "Failed to rename folder",
                variant: "destructive",
            });
        },
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!folder || !name.trim()) return;

        setIsSubmitting(true);
        try {
            await renameFolder.mutateAsync({
                id: folder.id,
                name: name.trim(),
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Rename Folder</DialogTitle>
                        <DialogDescription>
                            Update the folder name to keep things organized.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="folder-name">Folder Name</Label>
                            <Input
                                id="folder-name"
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
                            {isSubmitting ? "Saving..." : "Save"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
