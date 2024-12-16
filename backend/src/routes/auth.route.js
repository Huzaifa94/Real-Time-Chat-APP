import express from 'express';
import { checkAuth } from '../controllers/auth.controller.js';
import {signup,signin,signout,updateprofile} from '../controllers/auth.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';
const router = express.Router();

router.post('/signup',signup)
router.post('/signin',signin)  

router.post('/signout',signout)
router.put('/update-profile',protectRoute,updateprofile)

router.get("/check",protectRoute,checkAuth)

export default router;