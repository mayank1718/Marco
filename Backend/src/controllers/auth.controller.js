import "dotenv/config";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import userModel from "../models/user.model.js";

export async function registerUser(req, res) {
  const { username, email, password } = req.body;
  const isUser = await userModel.findOne({ $or: [{ email }, { username }] });
  if (isUser) {
    return res.status(409).json({
      message: email == isUser.email ? "email-address not found":"user-name not found",
    });
  }
  const hash = await bcrypt.hash(password, 10);
  const user = await userModel.create({
    username,
    email,
    password: hash,
  });
  const token = jwt.sign(
    {
      userId: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );
  res.cookie("token", token);
  res.status(201).json({
    message: "user registered successfully",
    user: {
      username: user.username,
      email: user.email,
    },
  });
}

export async function loginUser(req, res) {
  const { username, password } = req.body;
  const user = await userModel
    .findOne({
      username,
    })
    .select("+password");
  if (!user) {
    return res.status(404).json({
      message: "invalid credentials",
    });
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    return res.status(404).json({
      message: "invalid credentials",
    });
  }
  const token = jwt.sign(
    {
      userId: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );
  res.cookie("token", token);
  res.status(201).json({
    message: "user logged in successfully",
    user: {
      username: user.username,
      email: user.email,
    },
  });
}

export async function getMe(req, res) {
  const userId = req.user.userId;
  const user = await userModel.findById(userId);
  if (!user) {
    return res.status(404).json({
      message: "user not found",
    });
  }
  res.status(200).json({
    message: "user fetched successfully",
    user,
  });
}
