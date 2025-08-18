import express from "express";
import { chatWithOpenAI } from "../controllers/aiController.js";
import { validateToken } from "../middlewares/auth.js";

const router = express.Router();

router.use(validateToken);
router.post("/chat", chatWithOpenAI);

export default router;
