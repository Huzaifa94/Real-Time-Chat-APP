import express from 'express';
import { protectRoute } from '../middleware/auth.middleware.js';
import { getMessages, getUsersForSidebar, sendMessages } from '../controllers/messages.controller.js';
const router = express.Router();

router.get("/users",protectRoute,getUsersForSidebar)
router.get("/:id",protectRoute,getMessages)
router.get("/send/:id",protectRoute,sendMessages)

export default router;