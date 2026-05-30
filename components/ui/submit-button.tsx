import type * as React from "react";
import { Loader2Icon } from "lucide-react";

import { Button } from "@/components/ui/button";

type SubmitButtonProps = React.ComponentProps<typeof Button> & {
  isPending?: boolean;
};

export function SubmitButton({
  isPending = false,
  disabled,
  children,
  ...props
}: SubmitButtonProps) {
  return (
    <Button aria-busy={isPending} disabled={disabled || isPending} {...props}>
      {isPending && (
        <Loader2Icon
          role="status"
          aria-label="Loading"
          className="size-4 animate-spin"
        />
      )}
      {children}
    </Button>
  );
}
