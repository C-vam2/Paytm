import { Card } from "@repo/ui/card";

export const BalanceCard=({amount,locked}:{
    amount:number;
    locked:number;
})=>{
    const style:string="flex justify-between py-1 text-sm font-semibold";
    return (
        <Card title={'Balance'}>
            <div className={style}>
                <div>
                    Unlocked balance
                </div>
                <div>
                    {amount / 100} INR
                </div>
            </div>
            <hr/>
            <div className={style}>
                <div>
                    Total Locked Balance
                </div>
                <div>
                    {locked/100} INR
                </div>
            </div>
            <hr/>
            <div className={style}>
                <div>
                    Total Balance
                </div>
                <div>
                    {(locked+amount)/100} INR
                </div>
            </div>
            <hr/>
        </Card>
    )
}