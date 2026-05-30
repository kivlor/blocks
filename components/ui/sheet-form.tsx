import type * as React from "react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

export type SheetFormProps = {
  title: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
};

export function SheetForm({
  title,
  open,
  onOpenChange,
  children,
}: SheetFormProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full md:max-w-150 lg:max-w-200">
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
        </SheetHeader>
        <div className="grid flex-1 overflow-y-scroll px-4 pb-6">
          {children}
        </div>
      </SheetContent>
    </Sheet>
  );
}
