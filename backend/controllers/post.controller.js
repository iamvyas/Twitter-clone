import User from '../models/user.model.js';
import Post from '../models/post.model.js';

export const createPost = async(req , res) => {
    try {
        console.log("entering post create");
        const {text} = req.body;
        let {img} = req.body;
        const userId = req.user._id.toString();

        const user = await User.findById(userId);
        if(!user ) return res.status(404).json({message:"User not found"})
        if(!text && !img){
            return res.status(400).json({error:"Post must have text or image"});
        }

        img= "sample";

        const newPost = new Post({
            user:userId,
            text,
            img
        })

        await newPost.save();
        res.status(201).json(newPost);
    } catch (error){
        res.status(500).json({error:"internal server error"});
        console.log("Error in creation controller:",error);
    }
}

export const deletePost = async(req , res) => {
    try{
        const post = await Post.findById(req.params.id)
        if(!post){
            return res.status(404).json({error: "Post not found"});
        }

        if(post.user.toString() !== req.user._id.toString()){
            return res.status(401).json({error: "you are not authorised to delete this post"});
        }

        await Post.findByIdAndDelete(req.params.id);
        res.status(200).json({message: "Post deleted successfully"});

    }
    catch(error){
        res.status(500).json({error:"internal server error"});
        console.log("Error in delete post controller:",error);
    }
}

export const commentOnPost = async(req, res) => {
    try{
        console.log("entering comment on post");
        const {text} = req.body;
        const postId = req.params.id;
        const userId = req.user._id;

        if(!text){
            res.status(400).json({error:"text field required"});
        }

        const post  = await Post.findById(postId);

        if(!post){
            res.status(400).json({error:"post not found"});
        }

        const comment = {user:userId ,text }

        post.comments.push(comment);

        await post.save();
        res.status(200).json(post);

    }catch(error){
        res.status(500).json({error:"internal server error"});
        console.log("Error in comment on post controller:",error);
    }
}