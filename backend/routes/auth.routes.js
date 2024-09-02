import express from 'express';

const router  = express.Router();

router.get("/signup",(req,res)=>{
    res.json({
        data: "you hit signup endpoint",
    });
});

router.get("/login",(req,res)=>{
    res.json({
        data: "you hit login endpoint",
    });
});

router.get("/logout",(req,res)=>{
    res.json({
        data: "you hit logout endpoint",
    });
});

export default router;