import { db } from "@/lib/db";
import { getSelf } from "@/lib/auth-service";

export const getRecommended = async () => {
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
};
