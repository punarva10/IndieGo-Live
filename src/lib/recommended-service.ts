import { db } from "@/lib/db";
import { getSelf } from "@/lib/auth-service";
import { cache } from "react";

const getRecommendedUncached = async () => {
  let userId;

  //get the current user details
  try {
    const self = await getSelf();
    userId = self.id;
  } catch {
    userId = null;
  }

  let users = [];

  //get Recommended list
  if (userId) {
    //For signed in user
    try {
      users = await db.user.findMany({
        where: {
          NOT: {
            id: userId,
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      return users
    } catch (error) {
      console.error("Error fetching recommended users from database: ", error);
      throw new Error("Authentication failed");
    }
  } else {
    //For signed out user
    try {
      const users = await db.user.findMany({
        orderBy: {
          createdAt: "desc",
        },
      });

      return users;
    } catch (error) {
      console.error("Error fetching recommended users from database: ", error);
      throw new Error("Authentication failed");
    }
  }
};

export const getRecommended = cache(getRecommendedUncached)
