
export const Center = ({childern}:{childern:React.ReactNode})=>{
    return <div className="flex justify-center flex-col h-full">
        <div className="flex justify-center">
            {childern}
        </div>
    </div>
}