import express from "express";
import {
  loginUser,
  userRegister,
  verifyToken,
} from "../controllers/userController.js";
import { validateToken } from "../middlewares/auth.js";

const userRouter = express.Router();

userRouter.post("/login", loginUser);
userRouter.post("/register", userRegister);

// Protected routes
userRouter.get("/verify-token", validateToken, verifyToken);

export default userRouter;
