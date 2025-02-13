import { Button } from "@repo/ui/button"

interface AppbarProps{
    user?:{
        name?:string|null;
    },
    onSignin:()=>void,
    onSignout:()=>void,
}

export const AppBar=({
    user,
    onSignin,
    onSignout
}:AppbarProps)=>{
    return <div className="flex justify-between border-b px-4">
        <div className="text-lg flex flex-col justify-center">PayTM</div>
        <div className="flex flex-col justify-center py-2">
            <Button onClick={user?onSignout:onSignin} className="rounded bg-[#6a51a6] text-white py-2 px-3 hover:bg-white hover:ring-2 hover:ring-[#6a51a6] hover:text-[#6a51a6] hover:font-semibold">
                {user?"Logout":"Login"}
            </Button>
        </div>
    </div>
}