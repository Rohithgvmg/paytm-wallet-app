import express from "express";
import {router} from "./routes/index.js";
import { userRouter } from "./routes/user.js";
import cors from "cors";
import { accountRouter } from "./routes/account.js";
const app=express();

app.use(cors());
app.use(express.json());

app.use("/api/v1",router);

app.use("/api/v1/user",userRouter);

app.use("/api/v1/account",accountRouter);

app.use("/api/v1/account",accountRouter);
// console.log(JWT_SECRET);
app.listen(3000,()=>{
    console.log("At port 3000");
})



