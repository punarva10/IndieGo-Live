import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export const getSelf = async () => {
  let self;

  //get user details from clerk in client
  try {
    self = await currentUser();
    if (!self || !self.username) {
      throw new Error("Unauthorized");
    }
  } catch (error) {
    console.error("Error fetching current user from clerk:", error);
    throw new Error("Authentication failed");
  }

  //get user details from db in the server
  try {
    const user = await db.user.findUnique({
      where: { externalUserId: self.id },
    });

    if (!user) {
      throw new Error("Not Found");
    }

    return user;
  } catch (error) {
    console.error("Error fetching current user from database:", error);
    throw new Error("User retrieval failed");
  }
};
