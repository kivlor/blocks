import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export type ConfirmActionProps = {
  title: string;
  description: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  actionPending: boolean;
  confirmText?: string;
};

export function ConfirmAction({
  title,
  description,
  open,
  onOpenChange,
  onConfirm,
  actionPending,
  confirmText,
}: ConfirmActionProps) {
  const [typedConfirmation, setTypedConfirmation] = useState("");

  useEffect(() => {
    if (!open) {
      setTypedConfirmation("");
    }
  }, [open]);

  const requiresTypedConfirmation = Boolean(confirmText);
  const isConfirmed =
    !requiresTypedConfirmation || typedConfirmation.trim() === confirmText;

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        {requiresTypedConfirmation ? (
          <div className="space-y-2">
            <p className="text-sm">
              Type <span className="font-medium">{confirmText}</span> to
              confirm.
            </p>
            <Input
              value={typedConfirmation}
              onChange={(event) => setTypedConfirmation(event.target.value)}
              autoComplete="off"
            />
          </div>
        ) : null}
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button onClick={onConfirm} disabled={actionPending || !isConfirmed}>
            {actionPending ? <Loader2 className="animate-spin" /> : "Confirm"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
