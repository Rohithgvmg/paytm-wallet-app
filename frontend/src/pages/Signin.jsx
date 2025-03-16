import "../App.css";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { Popup } from "../components/Popup";
import { SubHeading } from "../components/SubHeading";
import { Button } from "../components/Button";
import { WarningLink } from "../components/WarningLink";
import {useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function Signin(){
    const navigate=useNavigate();
    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");
    const [err,setErr]=useState("");


    return  <Popup>
       <Heading label={"Sign in"}></Heading>
       <SubHeading label={"Enter your credentials to access your account"}></SubHeading>
       <InputBox onChange={(e)=>{
           setUsername(e.target.value);
       }} label="Email" placeholder="johndoe@example.com"></InputBox>
       <InputBox onChange={(e)=>{
        setPassword(e.target.value);
       }} label="Password"></InputBox>
         <div className="text-center text-red-400">{err} </div>


<Button 
    onClick={async () => {
        try {
            const res = await axios.post("http://localhost:3000/api/v1/user/signin", {
                username,
                password   
            });

            if (res.status === 200) {
                console.log(res);
                
                localStorage.setItem("token","Bearer "+res.data.jwt);

                navigate("/dashboard");
            }

        } catch (e) {
            if (e.response && e.response.data) {
                const data = e.response.data;

              if(data.message?.issues?.length>0){
                  setErr(JSON.stringify(data.message.issues[0].message));
              }
                else if (data.message) {
                    setErr(JSON.stringify(data.message));
                } 
                else {
                    setErr("An unknown error occurred.");
                }
            } else {
                setErr("Failed to connect to the server.");
            }
        }
    }} 
    text="Sign In" 
    to="/dashboard"
/>

       <WarningLink content={"Don't have an account?"} linkContent={"Sign Up"} to={"/signup"}></WarningLink>
    </Popup>
}
