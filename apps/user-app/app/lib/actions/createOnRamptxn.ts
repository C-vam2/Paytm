"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export async function createOnRampTransaction(
  amount: number,
  provider: string
) {
  const session = await getServerSession(authOptions);
  const token = Math.random().toString();
  //@ts-ignore
  const userId = Number(session?.user?.id);
  //   console.log("This is user id:", userId);
  if (!userId) {
    return {
      message: "User not logged in",
    };
  }

  await prisma.onRampTransaction.create({
    data: {
      userId,
      amount,
      provider,
      startTime: new Date(),
      status: "Processing",
      token: token,
    },
  });

  return {
    message: "On Ramp Transaction added.",
  };
}
