import { Heading } from "./Heading"
export function Popup({children}){
     return <div className="bg-primary w-screen h-screen flex justify-center items-center">
       <div className="bg-white border border-solid  p-5 rounded-lg w-[400px] h-auto m-5 shadow-md" >
        {children}
        </div>
     </div>
}

