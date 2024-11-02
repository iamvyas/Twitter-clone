import User from "../models/user.model.js";


export const getUserProfile = async (req,res) => {
    const { username } = req.params ;
    console.log("inside get user profile");
    try{
        const user = await User.findOne({username}).select("-password");
        console.log("got user from mdb");
        if(!user) {
            console.log("no user condition");
            res.status(400).json({error: "user does not exists"});
        }
        else{
        console.log("fair user got");
        return res.status(200).json(user);
        }
    }
    catch(error){
        console.log("error in getUserProfile controller",error.message);
        return res.status(500).json({error: "internal server error"});
    }
}