export function InputBox({label,placeholder,onChange}){

    return <div className="ml-6 mb-4">
        <div className="text-left font-semibold text-md ">
       {label}
       </div>
       <div className="mt-2 mr-8">
       <input onChange={onChange} className="border-2 border-gray-300 p-2 rounded w-full" placeholder={placeholder}></input>
       </div>
       </div>
}

