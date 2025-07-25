import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "../models/userModel.js";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

// Verify token
export const verifyToken = async (req, res) => {
  try {
    // If we reach here, the token is valid (auth middleware already verified it)
    res.json({ success: true, message: "Token is valid" });
  } catch (error) {
    console.error("Token verification error:", error);
    res.status(401).json({ success: false, message: "Invalid token" });
  }
};

// Route for user login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    // doesnot let user to login if no email registered
    if (!user) {
      return res
        .status(400)
        .json({ message: "User doestn't exist", success: false });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Invalid credentials", success: false });
    } else {
      const token = createToken(user._id);
      res.json({
        user,
        success: true,
        token,
        username: user.name,
        email: email,
      });
    }
  } catch (error) {
    console.log("Error in user login:", error);
    res.json({
      message: `Error in user login: ${error.message}`,
      success: false,
    });
  }
};

// Route for user register
const userRegister = async (req, res) => {
  // res.json({msg:"Register API Working"});
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const userExists = await UserModel.findOne({ email });
    if (userExists) {
      return res
        .status(400)
        .json({ message: "User already exists", success: false });
    }

    // Validating email format and strong password
    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ message: "Invalid email format", success: false });
    }
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Password must be at least 8 characters long",
      });
    }

    // hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = await UserModel({
      name,
      email,
      password: hashedpassword,
    });

    const user = await newUser.save();

    const token = createToken(user._id);
    res.json({ success: true, token, username: user.name, email: email });
  } catch (error) {
    console.log("Error in user registration:", error);
    res.json({
      message: `Error in user registration: ${error.message}`,
      success: false,
    });
  }
};

const saveSetting = async (req, res) => {
  try {
    const { name, email } = req.body;

    // Find user by email (assuming email is unique identifier)
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Update the user's name
    user.name = name;
    await user.save();

    res.json({
      success: true,
      message: "Name updated successfully",
      name: user.name,
    });
  } catch (error) {
    console.log("Error in saving settings:", error);
    res.json({
      message: `Error in saving settings: ${error.message}`,
      success: false,
    });
  }
};

const getSavedUsername = async (req, res) => {
  try {
    // Get user id from req.userId (set by validateToken middleware)
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: No user id found",
      });
    }

    // Find user by id
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      username: user.name,
      email: user.email,
    });
  } catch (error) {
    console.log("Error in getting saved username:", error);
    res.json({
      message: `Error in getting saved username: ${error.message}`,
      success: false,
    });
  }
};

export { loginUser, userRegister, saveSetting, getSavedUsername };
