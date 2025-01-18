import { Card } from "@repo/ui/card"

export const P2pTransactions = ({ transactions, type }: {
    transactions: {
        time: Date,
        amount: number,
        to: number,
        from: number
    }[],
    type: string
}) => {
    if (!transactions.length) {
        return <Card title={type + " Amounts"}>
            <div className="w-full h-full flex justify-center items-center p-5">
                No Recent transactions
            </div>
        </Card>
    }

    return <Card title={type + " Amounts"}>
        <div className="">
            {transactions.map((t) => (<><div key={Math.random().toString()} className="flex justify-between w-full h-full text-sm font-semibold pt-2">
                <div className="flex justify-between w-[40%]">
                    <div>
                        <div>
                            {type} INR
                        </div>
                        <div className="font-thin text-sm">
                            {t.time.toDateString()}
                        </div>
                    </div>
                    {/* <div className="text-[#6a51a6] bg-[#efecf6] flex items-center px-2 rounded-md h-[75%] text-xs">
                        {type == "Received" ? "From " + t.from : "To " + t.to}
                    </div> */}
                </div>
                <div className="">
                    + Rs {t.amount / 100}
                </div>
            </div><hr /></>)
            )}
        </div>
    </Card>
}