import express from "express";
import {
  getSavedUsername,
  loginUser,
  saveSetting,
  userRegister,
  verifyToken,
} from "../controllers/userController.js";
import { validateToken } from "../middlewares/auth.js";

const userRouter = express.Router();

userRouter.post("/login", loginUser);
userRouter.post("/register", userRegister);
userRouter.post("/savesetting", saveSetting);
userRouter.get("/getusername", validateToken, getSavedUsername);

// Protected routes
userRouter.get("/verify-token", validateToken, verifyToken);

export default userRouter;
