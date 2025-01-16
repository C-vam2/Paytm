"use client"
export const Select = ({options,onSelect}:{   onSelect:(value:string)=>void,
    options:{
        key:string;
        value:string;
    }[]
})=>{
    return <select onChange={(e)=>{
        onSelect(e.target.value);
    }} className="bg-grey-50 border-gray-300 text-gray-900 text-sm rounded-lg focus:rind-blue-500 focus:border-blue-500 block w-full p-2.5">{
        options.map(option=><option key={option.key} value={option.key}>{option.value}</option>)
    }</select>
}