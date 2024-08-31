import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export const getSelf = async () => {
  let self;
  try {
    self = await currentUser();
    if (!self || !self.username) {
      throw new Error("Unauthorized");
    }
  } catch (error) {
    console.error("Error fetching current user:", error);
    throw new Error("Authentication failed");
  }

  try {
    const user = await db.user.findUnique({
      where: { externalUserId: self.id },
    });

    if (!user) {
      throw new Error("Not Found");
    }

    return user;
  } catch (error) {
    console.error("Error fetching user from database:", error);
    throw new Error("User retrieval failed");
  }
};
