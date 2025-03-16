export function Balance({value}){
     return <div className="flex m-4 border border-gray p-4 m-0">
     <div className="font-bold text-md md:text-lg">
         Balance
     </div>
     <div className="font-semibold text-md md:text-lg ml-4">
         Rs {value}
     </div>
 </div>
}

