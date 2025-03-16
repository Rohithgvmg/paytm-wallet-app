import {Link} from "react-router-dom";

export function WarningLink({content,linkContent,to}){
    return <div className="mt-2 mb-2 font-semibold flex justify-center items-center ">

         {content}
   
    <Link className="ml-2 underline" to={to}>{linkContent}</Link>
    </div>
}


