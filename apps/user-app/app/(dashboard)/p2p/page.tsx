
import { getServerSession } from "next-auth";
import { P2pTransactions } from "../../../components/p2pTransactions";
import SendCard from "../../../components/sendCard";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";



async function getSentTransaction() {
    const session = await getServerSession(authOptions);
    const data = await prisma.p2pTransfer.findMany({
        where: {
            //@ts-ignore
            fromUserId: Number(session?.user?.id)
        }
    })
    return data.map((item) => ({
        time: item.timestamp,
        amount: item.amount,
        to: item.toUserId,
        from: item.fromUserId
    }));
}

async function getReceivedTransaction() {
    const session = await getServerSession(authOptions);
    const data = await prisma.p2pTransfer.findMany({
        where: {
            //@ts-ignore
            toUserId: Number(session?.user?.id)
        }
    })
    return data.map((item) => ({
        time: item.timestamp,
        amount: item.amount,
        to: item.toUserId,
        from: item.fromUserId
    }));
}

export default async function P2pPage() {
    const sentData = await getSentTransaction();
    const receivedData = await getReceivedTransaction();
    return <div>
        <div className="m-5 flex justify-stretch text-[#6a51a6] font-bold text-5xl">
            P2P Transfer
        </div>
        <div className="flex gap-[10%] ">
            <div className="w-[40%]">
                <SendCard />
            </div>
            <div className="w-[50%] gap-10">
                <div className="pb-10">
                    <P2pTransactions transactions={sentData} type="Sent" ></P2pTransactions>
                </div>
                <div>
                    <P2pTransactions transactions={receivedData} type="Received"></P2pTransactions>
                </div>
            </div>
        </div>
    </div >
}