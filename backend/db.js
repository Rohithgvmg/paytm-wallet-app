import mongoose,{Schema,model} from "mongoose";



const connectionString= "mongodb+srv://rgvmanikanta05:Rohith%40123@cluster0.8osxq.mongodb.net/";


mongoose.connect(connectionString).then(()=>{
    console.log("Connected to mongoDB");
}).catch((err)=>{
    console.log("Error while connecting "+err);
});



const userSchema=new Schema({
        username:{
            type:String,
            required:true,
            unique:true,
            trim:true,
            lowercase:true,
            minLength:3,
            maxLength:30
        },
        password:{
            type:String,
            required:true,
            minLength:6   
        },
        firstName:{
            type:String,
             required:true,
             trim:true,
             maxLength:20
        },
        lastName:{
            type:String,
             required:true,
             trim:true,
             maxLength:20
        }
});

const accountSchema=new Schema({
      userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
         required:true
      },
      balance:{
        type:Number,
        required:true
      }
});

export const Account=mongoose.model("Account",accountSchema);

export const User=model('User',userSchema);



