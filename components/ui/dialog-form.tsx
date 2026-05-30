import type * as React from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export type DialogFormProps = {
  title: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
};

export function DialogForm({
  title,
  open,
  onOpenChange,
  children,
}: DialogFormProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full md:max-w-150 lg:max-w-200">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="grid flex-1 no-scrollbar overflow-y-scroll max-h-screen md:max-h-[90vh]">
          {children}
        </div>
      </DialogContent>
    </Dialog>
  );
}
