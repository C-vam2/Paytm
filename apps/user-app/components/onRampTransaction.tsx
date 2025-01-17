import { Card } from "@repo/ui/card"

export const OnRampTransactions = ({ transactions }: {
    transactions: {
        time: Date,
        amount: number,
        status: any,
        provider: string
    }[]
}) => {
    if (!transactions.length) {
        return <Card title="Recent Transactions">
            <div className="w-full h-full flex justify-center items-center p-5">
                No Recent transactions
            </div>
        </Card>
    }

    return <Card title="Recent Transactions">
        <div className="">
            {transactions.map((t) => (<><div key={Math.random()} className="flex justify-between w-full h-full text-sm font-semibold pt-2">
                <div className="flex justify-between w-[40%]">
                    <div>
                        <div>
                            Received INR
                        </div>
                        <div className="font-thin text-sm">
                            {t.time.toDateString()}
                        </div>
                    </div>
                    <div className="text-[#6a51a6] bg-[#efecf6] flex items-center px-2 rounded-md h-[75%] text-xs">
                        {t.status}
                    </div>
                </div>
                <div className="">
                    + Rs {t.amount / 100}
                </div>
            </div><hr /></>)
            )}
        </div>
    </Card>
}