import { useState } from "react";

import { Button } from "@/components/ui/button";
import { ConfirmAction } from "@/components/ui/confirm-action";

export function ConfirmActionDemo() {
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);

  return (
    <div className="flex min-h-32 items-center justify-center rounded-md border border-dashed border-zinc-200 bg-zinc-50 p-6">
      <Button variant="destructive" onClick={() => setOpen(true)}>
        Delete project
      </Button>
      <ConfirmAction
        title="Delete project"
        description="This action cannot be undone."
        open={open}
        onOpenChange={setOpen}
        actionPending={pending}
        confirmText="DELETE"
        onConfirm={() => {
          setPending(true);
          setTimeout(() => {
            setPending(false);
            setOpen(false);
          }, 2000);
        }}
      />
    </div>
  );
}
