import { BiSolidDashboard } from "react-icons/bi";
import { SidebarItem } from "../../components/sidebar";
import { GrTransaction } from "react-icons/gr";
import { FcMoneyTransfer } from "react-icons/fc";

export default function Layout({
    children
}:{children:React.ReactNode}){
    return (
        <div>
            <div>
                <SidebarItem href={"/dashboard"} icon={<BiSolidDashboard />} title="Dashboard" ></SidebarItem>
                <SidebarItem href={"/transfer"} icon={<FcMoneyTransfer />} title="Transfers" ></SidebarItem>
                <SidebarItem href={"/transactions"} icon={<GrTransaction />} title="Transactions" ></SidebarItem>
            </div>
            {children}
        </div>
    )
}