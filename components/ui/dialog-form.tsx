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
      <DialogContent className="grid max-h-[calc(100dvh-2rem)] w-full grid-rows-[auto_minmax(0,1fr)] overflow-hidden md:max-w-150 lg:max-w-200">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="grid min-h-0 overflow-y-auto overscroll-contain pr-1">
          {children}
        </div>
      </DialogContent>
    </Dialog>
  );
}
