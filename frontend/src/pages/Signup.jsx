import "../App.css";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { Popup } from "../components/Popup";
import { SubHeading } from "../components/SubHeading";
import { Button } from "../components/Button";
import { WarningLink } from "../components/WarningLink";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Signup(){
     const navigate=useNavigate();

    const [firstName,setFirstName]=useState("");
    const [lastName,setLastName]=useState("");
    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");
    const [err,setErr]=useState("");



    return <Popup>
       <Heading label={"Sign up"}></Heading>
       <SubHeading label={"Enter your information to create an account"}></SubHeading>
       <InputBox onChange={(e)=>{
        setFirstName(e.target.value);
       }} label="First Name" placeholder="John"></InputBox>
       <InputBox onChange={(e)=>{
        setLastName(e.target.value);
       }} label="Last Name" placeholder="Doe"></InputBox>
       <InputBox onChange={(e)=>{
        setUsername(e.target.value);
       }} label="Email" placeholder="johndoe@example.com"></InputBox>
       <InputBox onChange={(e)=>{
        setPassword(e.target.value);
       }} label="Password"></InputBox>
       <div className="text-center text-red-400">{err} </div>
       <Button onClick={async ()=>{

        try{
          const res= await axios.post("http://localhost:3000/api/v1/user/signup",{
            firstName,
            lastName,
            username,
            password
           });

           if(res.request.status==200){
               navigate("/signin");
           }
        } catch(e){
              setErr(e.response.data.message);

        }

       }} text="Sign Up" to="/signin" ></Button>
       <WarningLink content={"Already have an account?"} linkContent={"Sign In"} to={"/signin"}></WarningLink>
    </Popup>
}


