import { BiSolidDashboard } from "react-icons/bi";
import { SidebarItem } from "../../components/sidebar";
import { GrTransaction } from "react-icons/gr";
import { FcMoneyTransfer } from "react-icons/fc";
import { RiP2pFill } from "react-icons/ri";

export default function Layout({
    children
}: { children: React.ReactNode }) {
    return (
        <div className="flex h-screen">
            <div className="border pr-10 pt-5">
                <SidebarItem href={"/dashboard"} icon={<BiSolidDashboard />} title="Dashboard" ></SidebarItem>
                <SidebarItem href={"/transfer"} icon={<FcMoneyTransfer />} title="Transfers" ></SidebarItem>
                <SidebarItem href={"/transactions"} icon={<GrTransaction />} title="Transactions" ></SidebarItem>
                <SidebarItem href={"/p2p"} icon={<RiP2pFill />} title="P2P Transfer" ></SidebarItem>
            </div>
            <div className="w-full p-10 h-full bg-[#efecf6]">
                {children}
            </div>
        </div>
    )
}