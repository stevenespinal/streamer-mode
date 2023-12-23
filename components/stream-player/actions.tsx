"use client";

import { onFollow, onUnfollow } from "@/actions/follow";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@clerk/nextjs";
import { HeartIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

interface ActionsProps {
  isFollowing: boolean;
  isHost: boolean;
  hostIdentity: string;
}
export const Actions = ({
  hostIdentity,
  isFollowing,
  isHost,
}: ActionsProps) => {
  const { userId } = useAuth();
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const handleFollow = () => {
    startTransition(() => {
      onFollow(hostIdentity)
        .then((data) =>
          toast.success(`You are now following ${data.following.username}`)
        )
        .catch(() => toast.error("Something went wrong"));
    });
  };
  const handleUnfollow = () => {
    startTransition(() => {
      onUnfollow(hostIdentity)
        .then((data) =>
          toast.success(`You have unfollowed ${data.following.username}`)
        )
        .catch(() => toast.error("Something went wrong"));
    });
  };

  const toggleFollow = async () => {
    if (!userId) {
      return router.push("/sign-in");
    }
    if (isHost) {
      return;
    }

    if (isFollowing) {
      handleUnfollow();
    } else {
      handleFollow();
    }
  };
  return (
    <Button
      className="w-full lg:w-auto"
      size="sm"
      variant="primary"
      onClick={toggleFollow}
      disabled={isPending || isHost}
    >
      <HeartIcon
        className={cn("h-4 w-4 mr-2", isFollowing ? "fill-white" : "fill-none")}
      />
      {isFollowing ? "Unfollow" : "Follow"}
    </Button>
  );
};

export const ActionsSkeleton = () => {
  return <Skeleton className="h-10 w-full lg:w-24" />;
};
