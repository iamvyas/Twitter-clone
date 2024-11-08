import User from "../models/user.model.js";
import Notification from "../models/notification.model.js";

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

export const followUnfollowUser =async (req,res) => {
    try{
        const { id } = req.params;
		const userToModify = await User.findById(id);
		const currentUser = await User.findById(req.user._id);

		if (id === req.user._id.toString()) {
			return res.status(400).json({ error: "You can't follow/unfollow yourself" });
		}

		if (!userToModify || !currentUser) return res.status(400).json({ error: "User not found" });

		const isFollowing = currentUser.following.includes(id);

		if (isFollowing) {
			// Unfollow the user
            console.log("unfollow process trigger");
			await User.findByIdAndUpdate(id, { $pull: { followers: req.user._id } });
			await User.findByIdAndUpdate(req.user._id, { $pull: { following: id } });

			res.status(200).json({ message: "User unfollowed successfully" });
		} else {
			// Follow the user
            console.log("follow process trigger");
			await User.findByIdAndUpdate(id, { $push: { followers: req.user._id } });
			await User.findByIdAndUpdate(req.user._id, { $push: { following: id } });
			const newNotification = new Notification({
                type: "follow",
                from: req.user._id,
                to: userToModify._id,
            });

            await newNotification.save();

			res.status(200).json({ message: "User followed successfully" });
    }
    }
    catch(error){
        console.log("error in followUnfollowUser controller",error.message);
        return res.status(500).json({error: "internal server error"});
    }
}