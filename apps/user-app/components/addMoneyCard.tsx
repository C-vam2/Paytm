"use client"

import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Select } from "@repo/ui/select";
import { TextInput } from "@repo/ui/textInput";
import { useState } from "react"
import { createOnRampTransaction } from "../app/lib/actions/createOnRamptxn";

const SUPPORTED_BANKS = [{
    name: "HDFC Bank",
    redirectUrl: "https://netbanking.hdfc.com"
}, {
    name: "Axis Bank",
    redirectUrl: "http://www.axisbank.com/"
}
]

export const AddMoney = () => {
    const [redirectUrl, setRedirectUrl] = useState(SUPPORTED_BANKS[0]?.redirectUrl);
    const [provider, setProvider] = useState(SUPPORTED_BANKS[0]?.name || "");
    const [amount, setAmount] = useState(0);

    return <Card title={"Add Money"} >
        <div className="w-full">
            <TextInput label="Amount" placeholder="Amount" onChange={(value) => {
                setAmount(Number(value));
            }} />
            <div className="py-4 text-left">
                Bank
            </div>

            <Select onSelect={(value) => {
                setRedirectUrl(SUPPORTED_BANKS.find(x => x.name === value)?.redirectUrl || "");
                setProvider(SUPPORTED_BANKS.find(x => x.name === value)?.name || "")
            }} options={SUPPORTED_BANKS.map(x => ({ key: x.name, value: x.name }))} />

            <div className="flex justify-center pt-4">
                <Button onClick={async () => {
                    await createOnRampTransaction(amount * 100, provider);

                    window.location.href = redirectUrl || "";
                }} className="rounded bg-[#6a51a6] text-white py-2 px-3 hover:bg-white hover:ring-2 hover:ring-[#6a51a6] hover:text-[#6a51a6] hover:font-semibold">
                    Add Money
                </Button>
            </div>
        </div>

    </Card>
}