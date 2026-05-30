import { useState } from "react";

import { SubmitButton } from "@/components/ui/submit-button";

export function SubmitButtonDemo() {
  const [pending, setPending] = useState(false);

  return (
    <div className="flex min-h-32 items-center justify-center rounded-md border border-dashed border-zinc-200 bg-zinc-50 p-6">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          setPending(true);
          setTimeout(() => setPending(false), 2000);
        }}
      >
        <SubmitButton isPending={pending}>Save changes</SubmitButton>
      </form>
    </div>
  );
}
