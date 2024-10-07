import User from "../models/User.js";
import asyncHandler from "../utils/asyncHandler.js";
import ErrorResponse from "../utils/ErrorResponse.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signUp = asyncHandler(async (req, res, next) => {
  try {
    const { body } = req;

    const existingUser = await User.findOne({ email: body.email });
    if (existingUser) throw new ErrorResponse("User already exists", 400);

    const hashedPassword = await bcrypt.hash(body.password, 10);
    const newUser = await User.create({ ...body, password: hashedPassword });
    if (!newUser) throw new ErrorResponse("Error creating user", 500);

    const secret = process.env.JWT_SECRET; // This will come from the server environment
    const payload = { userId: newUser.id }; // The data we want to enclose in the JWT
    const tokenOptions = { expiresIn: "6d" }; // We will limit the dura
    const token = jwt.sign(payload, secret, tokenOptions);

    const isProduction = process.env.NODE_ENV === "production";
    const cookieOptions = {
      httpOnly: true,
      sameSite: isProduction ? "None" : "Lax",
      secure: isProduction,
    };
    res.cookie("token", token, cookieOptions);
    res.status(201).json({ success: "User successfully created." });
    // res.json({ token });
  } catch (error) {
    next(error);
  }
});

export const signIn = asyncHandler(async (req, res, next) => {
  try {
    const { body } = req;
    const user = await User.findOne({ email: body.email }).select("+password");
    if (!user) throw new ErrorResponse("User not found", 404);

    const isPasswordValid = await bcrypt.compare(body.password, user.password);
    if (!isPasswordValid) throw new ErrorResponse("Invalid credentials", 401);

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "6d",
    });
    const isProduction = process.env.NODE_ENV === "production";
    const cookieOptions = {
      httpOnly: true,
      sameSite: isProduction ? "None" : "Lax",
      secure: isProduction,
    };
    res.cookie("token", token, cookieOptions);
    res.status(200).json({ success: "User successfully logged in." });
  } catch (error) {
    next(error);
  }
});

export const me = asyncHandler(async (req, res, next) => {
  try {
    const { userId } = req; // This is coming from the verifyTokenMiddleware
    console.log(userId);
    
    const user = await User.findById(userId).select("-password");
    if (!user) throw new ErrorResponse("User not found", 404);

    const { firstName, lastName, email } = user;

    res.status(200).json({ firstName, lastName, email });
  } catch (error) {
    next(error);
  }
});
