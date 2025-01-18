"use client"
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { TextInput } from "@repo/ui/textInput";
import { useState } from "react";
import { sendP2pTransfer } from "../app/lib/actions/p2pTransfer";

export default function SendCard() {
    const [amount, setAmount] = useState(0);
    const [number, setNumber] = useState("");

    return <Card title="Send">
        <div>
            <TextInput label="Number" placeholder="Number" onChange={(val) => {
                setNumber(val);
            }}></TextInput>
            <TextInput label="Amount" placeholder="Amount" onChange={(val) => {
                setAmount(Number(val));
            }}></TextInput>
        </div>
        <div className="flex justify-center pt-5 pb-2">
            <Button onClick={async () => {
                await sendP2pTransfer(number, amount * 100);
            }} className="rounded bg-[#6a51a6] text-white py-2 px-5 hover:bg-white hover:ring-2 hover:ring-[#6a51a6] hover:text-[#6a51a6] hover:font-semibold">Send</Button>
        </div>

    </Card>
}