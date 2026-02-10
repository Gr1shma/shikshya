"use client";

import { Button } from "~/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "~/components/ui/dialog";

interface ConfirmDeleteDialogProps {
    open: boolean;
    title: string;
    description: string;
    confirmLabel?: string;
    isPending?: boolean;
    onConfirm: () => void;
    onOpenChange: (open: boolean) => void;
}

export function ConfirmDeleteDialog({
    open,
    title,
    description,
    confirmLabel = "Delete",
    isPending,
    onConfirm,
    onOpenChange,
}: ConfirmDeleteDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                        type="button"
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={onConfirm}
                        disabled={isPending}
                        type="button"
                    >
                        {isPending ? "Deleting..." : confirmLabel}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
