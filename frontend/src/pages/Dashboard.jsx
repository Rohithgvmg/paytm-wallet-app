import { AppBar } from "../components/AppBar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";
import axios from "axios";
import { useState,useEffect } from "react";

export function Dashboard(){
    const [balance,setBalance]=useState("");
   
    useEffect(()=>{
          axios.get("http://localhost:3000/api/v1/account/balance",{
            headers:{
                authorization:localStorage.getItem("token")
              }
          }).then(res=>{
                setBalance(res.data.balance);
                
          })
    },[]);

    return <div className="w-screen h-screen  flex justify-center items-center bg-primary"> 
        <div className="bg-white border-2 border-black lg:w-[95%] lg:h-[90%] 
         rounded-md  w-[100%] h-[100%]">

            <AppBar Title={"PayTM"} Profile={"Rohith"}></AppBar>
            <Balance value={balance}></Balance>
            <Users></Users>
         </div>
    </div>
}
