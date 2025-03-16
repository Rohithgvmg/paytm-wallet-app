import {useNavigate} from "react-router-dom";


export function Button({text,to,onClick}){
    // const navigate=useNavigate();

    return <div className="flex justify-center items-center">
        <button onClick={onClick} className="mt-4 mb-2 p-2 rounded-md text-gray-100 bg-black hover:bg-gray-700 w-full ml-6 mr-8 text-md 
        font-normal ">
          {text}
    </button>
    </div>
}

