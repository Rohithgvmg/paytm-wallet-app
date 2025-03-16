import express from "express";
import {z} from "zod";
import { Account, User } from "../db.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { authMiddleware } from "../middleware.js";

dotenv.config();

const signupBody=z.object({
       username:z.string().email().min(3).max(30),
       password:z.string().min(6),
       firstName:z.string().max(20),
       lastName:z.string().max(20)
})

const signinBody=z.object({
    username:z.string().email().min(3).max(30),
    password:z.string().min(6)
})


const userRouter=express.Router();

const updateBody=z.object({
    password:z.string().optional(),
    firstName:z.string().optional(),
    lastName:z.string().optional()
})


userRouter.get("/",(req,res)=>{
       res.json({
        msg:"Hello user"
       })
})

userRouter.get("/bulk",async (req,res)=>{
      const filter=req.query.filter||"";

      const users=await User.find({
          $or:[
            {
                firstName:{
                    "$regex":filter,
                     "$options":"i"
                }
            },
            {
                lastName:{
                    "$regex":filter,
                    "$options":"i"
                }
            }
          ]
      })

      res.json({
           user:users.map(user=>({
               username:user.username,
               firstName:user.firstName,
               lastName:user.lastName,
               _id:user._id
           }))
      })


})

userRouter.post("/signup",async (req,res)=>{
      const {success,error} =signupBody.safeParse(req.body);
      if(!success){
       return res.status(411).json({
              message:error
       })
      }
//       console.log("JWT SECRET: "+JWT_SECRET);
       try{
      const user=await User.create({
         username:req.body.username,
         password:req.body.password,
         firstName:req.body.firstName,
         lastName:req.body.lastName
      })

      const userId=user._id;

      await Account.create({
           userId,
           balance:1+Math.random()*10000
      })

      if(user._id){
          res.json({
              message:"Signed up successfully"
          })
      }else{

       res.status(411).json({
             message:"Unsuccessful "+user.errors 
       })
      }  } catch(err){
    if (err.code === 11000 && err.keyPattern?.username) {
        return res.status(409).json({
            message: "Username already in use, try a different one",
        });
    }

    res.status(500).json({
        message: "An unexpected error occurred",
    });
      }

})

userRouter.post("/signin",async (req,res)=>{
       const {success,error} =signinBody.safeParse(req.body);
       if(!success){
        return res.status(411).json({
               message:error
        })
       }
        try{
       const user=await User.findOne({
          username:req.body.username,
          password:req.body.password,

       })
       if(user){
          const token=jwt.sign({
               userId:user._id
          },process.env.JWT_SECRET);
        
          res.status(200).json({
              jwt:token,
              message:"Signed up successfully"
          })

       }else{
 
        res.status(411).json({
              message:"User not found"
        })
       }  } catch(err){
 
     res.status(500).json({
         message: "An unexpected error occurred "+err
     });}
 })

userRouter.put("/",authMiddleware,async (req,res)=>{
     const {success}= updateBody.safeParse(req.body);

     if(!success){
        res.status(411).json({
            message:"Error while updating information"
        })
     }
    //  console.log('Username:', req.username);

     await User.updateOne({
        _id:req.userId
     },req.body);

     res.json({
        message:"Updated successfully"
     })

})


export {userRouter}; 

