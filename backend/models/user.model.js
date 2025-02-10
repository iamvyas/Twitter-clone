import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
    },
    fullName:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
        minLength:6 , 
    },
    email:{
        type:String , 
        required: true,
        unique: true,
        
    },
    followers:[
        {
            type: mongoose.Schema.Types.ObjectId , // 16 bit hex string
            ref:"User",
            default:[],
        }
    ],
    following:[
        {
            type: mongoose.Schema.Types.ObjectId , // 16 bit hex string
            ref:"User",
            default:[],
        }
    ],
    profileImg:{
        type: String,
        default:"",
    },
    coverImg:{
        type: String,
        default:"",
    },
    link:{
        type:String,
        default:"",
    },
    likedPosts:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post",
            default:[],
        }
    ]
},{timestamps: true}); // time stamp used to display how old the acc is


const User = mongoose.model("User",userSchema);

export default User;