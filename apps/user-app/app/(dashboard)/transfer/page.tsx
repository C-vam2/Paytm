import { getServerSession } from "next-auth";
import { AddMoney } from "../../../components/addMoneyCard";
import { BalanceCard } from "../../../components/balanceCard";
import { OnRampTransactions } from "../../../components/onRampTransaction";
import prisma from "@repo/db/client";
import { authOptions } from "../../lib/auth";

async function getBalance(){
    const session = await getServerSession(authOptions);
    const balance = await prisma.balance.findFirst({
        where:{
            //@ts-ignore
            userId:Number(session?.user?.id)
        }
    });
    return {
        amount:balance?.amount||0,
        locked:balance?.locked||0
    }
}

async function getOnRampTransactions(){
    const session = await getServerSession(authOptions);
    const txns = await prisma.onRampTransaction.findMany({
        where:{
            //@ts-ignore
            userId:Number(session?.user?.id)
        }
    });
    return txns.map(t=>({
        time:t.startTime,
        amount:t.amount,
        status:t.status,
        provider:t.provider
    }));
}

export default async function TransferPage() {
    const balance = await getBalance();
    const transactions = await getOnRampTransactions();
    return <div>
        <div className="">
            Transfer
        </div>
        <div className="">
            <div>
                <AddMoney/>
            </div>
            <div>
                <BalanceCard amount={balance.amount} locked={balance.locked}/>
                <div className="pt-4">
                    <OnRampTransactions transactions={transactions}/>
                </div>
            </div>
        </div>
    </div>
}