import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./config.js";

export function authMiddleware(req,res,next){
      const authHeader=req.headers.authorization;
      // console.log(req.headers);
      if(!authHeader || !authHeader.startsWith('Bearer')){
        return res.status(403).json({
            message:"Credentials not found, Try Signin again"
        })
      }
     
      const token=authHeader.split(" ")[1];

     try{
        const decoded=jwt.verify(token,JWT_SECRET);
        
        req.userId=decoded.userId;

        next();

     } catch(err){
         console.log("error "+err);
            //  res.redirect("/signin");
     }
    }

