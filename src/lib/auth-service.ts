import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { cache } from "react";

const getSelfUncached = async () => {
  let self;

  //get user details from clerk
  try {
    self = await currentUser();
    if (!self || !self.username) {
      throw new Error("Unauthorized");
    }
  } catch (error) {
    console.error("Error fetching current user from clerk:", error);
    throw new Error("Authentication failed");
  }

  //get user details from db 
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

export const getSelf = cache(getSelfUncached)