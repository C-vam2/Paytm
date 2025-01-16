import { Card } from "@repo/ui/card";

export const BalanceCard=({amount,locked}:{
    amount:number;
    locked:number;
})=>{
    return (
        <Card title={'Balance'}>
            <div className="">
                <div>
                    Unlocked balance
                </div>
                <div>
                    {amount / 100} INR
                </div>
            </div>
            <div className="">
                <div>
                    Total Locked Balance
                </div>
                <div>
                    {locked/100} INR
                </div>
            </div>
            <div className="">
                <div>
                    Total Balance
                </div>
                <div>
                    {(locked+amount)/100}INR
                </div>
            </div>
        </Card>
    )
}