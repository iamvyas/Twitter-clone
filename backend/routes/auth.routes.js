import express from 'express';
import { getMe, login, logout,signup } from '../controllers/auth.controller.js';
import { protectRoute } from '../middleware/protectRoute.js';

const router  = express.Router();

router.get("/me", protectRoute , getMe);  //protectRoute is a middleware need to be created specifically

router.post("/signup", signup );

router.post("/login",login);

router.get("/logout",logout);

export default router;