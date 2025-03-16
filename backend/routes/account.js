

import express from "express";
import { authMiddleware } from "../middleware.js";
import { Account, User } from "../db.js";
import mongoose from "mongoose";

export const accountRouter=express.Router();


accountRouter.get("/balance",authMiddleware,async (req,res)=>{
    

     try{

      const account=await Account.findOne({
        userId:req.userId
      })
      if(account){
        res.json({
          balance:account.balance
      }) 
      }else{
        res.json({
          message:"Account does not exist"
        })
      }
      
}
catch(err){
    res.json({
       message:"Error while fetching balance "+err
    })
}

})

accountRouter.post("/transfer",authMiddleware,async(req,res)=>{
      const session=await mongoose.startSession();

      session.startTransaction();
      const {amount,to}=req.body;

      const account=await Account.findOne({
        userId:req.userId
      }).session(session);

      if(account.balance<amount){
             await session.abortTransaction();
             return res.status(400).json({
                message:"Insufficient balance"
             });
      }

      await Account.updateOne({
        userId:req.userId
      }, {
         $inc:{
            balance:-amount
         }
      }).session(session);

      await Account.updateOne({
        userId:to
      },{
        $inc:{
            balance:amount
        }
      }).session(session);

      await session.commitTransaction();

      res.json({
        message:"Transfer successful"
      });
})







