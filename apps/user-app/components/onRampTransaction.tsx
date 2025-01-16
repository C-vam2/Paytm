import { Card } from "@repo/ui/card"

export const OnRampTransactions = ({transactions}:{
    transactions:{
        time:Date,
        amount:number,
        status:any, 
        provider:string
    }[]
})=>{
    if(!transactions.length){
        return <Card title="Recent Transactions">
            <div className="">
                No Recent transactions
            </div>
        </Card>
    }

    return <Card title="Recent Transactions">
        <div className="">
            {transactions.map((t)=><div key={Math.random()} className="">
                <div>
                    <div>
                        Received INR
                    </div>
                    <div className="">
                        {t.time.toDateString()}
                    </div>
                </div>
                <div className="">
                    + Rs {t.amount / 100}
                </div>
            </div>)}
        </div>
    </Card>
}