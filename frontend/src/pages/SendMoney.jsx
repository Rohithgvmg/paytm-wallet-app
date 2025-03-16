import { useSearchParams } from "react-router-dom"
import { Button } from "../components/Button"
import { InputBox } from "../components/InputBox"
import axios from "axios"
import { useState } from "react"

export const SendMoney = () => {
    const [searchParams]=useSearchParams();
   const id=searchParams.get("id");
   const name=searchParams.get("name");
   const [amount,setAmount]=useState("");
   const [loading,setLoading]=useState(false);

    return <div class="flex justify-center h-screen bg-gray-100">
        <div className="h-full flex flex-col justify-center">
            <div
                class="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg"
            >
                <div class="flex flex-col space-y-1.5 p-2">
                <div class="text-3xl font-bold text-center">Send Money</div>
                </div>
                <div class="p-2">
                <div class="flex pl-6 items-center space-x-4">


                    <div class="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center pb-1">
                    <span class="text-2xl text-white">{name[0]}</span>
                    </div>

                    <h3 class="text-2xl font-semibold">{name}</h3>

                    
                </div>
                <div class="space-y-4">
                    <div class="space-y-2">
                    <br></br>
                    <InputBox label={
                        "Enter Amount in Rs"
                    }  onChange={(e)=>{
                        setAmount(e.target.value);
                    }}></InputBox>
                   </div>
                    <Button text="Initiate transfer" onClick={async ()=>{
                        setLoading(true);
          const res= await axios.post("http://localhost:3000/api/v1/account/transfer",{
                to:id,
                amount
           },{
              headers:{
                authorization:localStorage.getItem("token")
              }
           })
           setLoading(false);
           console.log(res);

                    }}></Button>
                </div>
                </div>
        </div>
      </div>
    </div>
}

