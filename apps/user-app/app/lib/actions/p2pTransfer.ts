"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export async function sendP2pTransfer(to: string, amount: number) {
  const session = await getServerSession(authOptions);
  //@ts-ignore
  const from = session?.user?.id;
  if (!from) {
    return "Sender do not exist";
  }
  const toUser = await prisma.user.findFirst({
    where: {
      number: to,
    },
  });
  if (!toUser) {
    return "Receiver do not exist";
  }

  await prisma.$transaction(async (tx) => {
    const fromUser = Number(from);
    await tx.$queryRaw`Select * from "Balance" where "userId" = ${fromUser} for update`;

    const fromBalance = await tx.balance.findFirst({
      where: {
        userId: Number(from),
      },
    });
    if (!fromBalance || fromBalance.amount < amount) {
      throw new Error("Insufficient balance");
    }

    await tx.balance.update({
      where: {
        userId: Number(toUser.id),
      },
      data: {
        amount: { increment: amount },
      },
    });

    await tx.balance.update({
      where: {
        userId: Number(from),
      },
      data: {
        amount: { decrement: amount },
      },
    });

    await tx.p2pTransfer.create({
      data: {
        fromUserId: Number(from),
        toUserId: toUser.id,
        amount,
        timestamp: new Date(),
      },
    });
  });
}
