import { useState } from "react"
import { Button } from "./Button"
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Users = () => {
    // Replace with backend call
    const [users, setUsers] = useState([]);
    const [filter,setFilter]=useState("");
   
     // use debouncing

    useEffect(()=>{
        axios.get("http://localhost:3000/api/v1/user/bulk?filter="+filter).then(res=>{
            setUsers(res.data.user);
        })
    },[filter]);

    return <>
        <div className="font-bold mt-6 text-lg p-4">
            Users
        </div>
        <div className="my-2">
            <input onChange={(e)=>{
                setFilter(e.target.value);
            }} type="text" placeholder="Search users..." className="w-full px-5 py-3 border rounded border-slate-200"></input>
        </div>
        <div className="max-h-[340px] overflow-y-auto">
            {users.map(user => <User key={user._id} user={user} />)}
        </div>
    </>
}



function User({user}) {
    const navigate=useNavigate();
    return <div className="flex justify-between border border-gray-200 rounded-md p-2 items-center">
        <div className="flex items-center min-w-0 flex-1 overflow-hidden">
            <div
              className="rounded-full h-12 w-12 bg-slate-200 flex justify-center 
              items-center text-xl flex-shrink-0"
            >
              {user.firstName[0]}
            </div>
            <div className="flex flex-col justify-center ml-2 min-w-0 overflow-hidden">
                <div className="truncate">
                    {user.firstName} {user.lastName}
                </div>
            </div>
        </div>

        <div className="flex-shrink-0 ml-2">
            <Button onClick={ ()=>{
                 navigate("/send?id="+user._id+"&name="+user.firstName);
            }} text={"Send Money"} />
        </div>
    </div>
}