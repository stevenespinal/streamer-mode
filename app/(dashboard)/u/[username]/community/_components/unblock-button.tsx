"use client";

import { onUnblock } from "@/actions/block";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { toast } from "sonner";

interface UnblockButtonProps {
  userId: string;
}
export const UnblockButton = ({ userId }: UnblockButtonProps) => {
  const [isPending, startTransition] = useTransition();

  const onClick = () => {
    startTransition(() => {
      onUnblock(userId)
        .then((user) =>
          toast.success(`User ${user.blocked.username} unblocked`)
        )
        .catch(() => toast.error("Something went wrong"));
    });
  };
  return (
    <Button
      onClick={onClick}
      disabled={isPending}
      variant="link"
      size="sm"
      className="text-blue-500 w-full"
    >
      Unblock
    </Button>
  );
};
