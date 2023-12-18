import { db } from "@/lib/db";
import { getSelf } from "@/lib/auth-service";
import { User } from "@prisma/client";

export const getRecommended = async () => {
  // await new Promise((resolve, reject) => setTimeout(resolve, 5000));
  let userId;
  try {
    const self = await getSelf();
    userId = self.id;
  } catch (error) {
    userId = null;
  }

  console.log(userId);
  let users: User[] = [];

  if (userId) {
    users = await db.user.findMany({
      where: {
        AND: [
          {
            NOT: {
              id: userId,
            },
          },
          {
            NOT: {
              followedBy: {
                some: {
                  followerId: userId,
                },
              },
            },
          },
        ],
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  } else {
    users = await db.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }
  return users;
};
