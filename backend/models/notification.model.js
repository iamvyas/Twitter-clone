import mongoose from "mongoose";
import User from "./user.model.js";


const notficationSchema = mongoose.Schema({
    from:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        require:true 
    },
    to:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        require:true 
    },
    type:{
        type:String,
        require:true,
        enum:['follow','like'],
    },
    read:{
        type:Boolean,
        default:false
    }

},{timestamp : true});

const Notification = mongoose.model('Notification',notficationSchema);

export default Notification;
