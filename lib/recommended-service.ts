import { db } from "@/lib/db";
import { getSelf } from "@/lib/auth-service";

export const getRecommended = async () => {
  // await new Promise((resolve, reject) => setTimeout(resolve, 5000));
  let userId = undefined;
  try {
    const self = await getSelf();
    userId = self.id;
  } catch (error) {
    userId = undefined;
  }

  const users = await db.user.findMany({
    where: {
      id: {
        not: userId,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return users;
};
