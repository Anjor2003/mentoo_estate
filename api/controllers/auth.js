import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
const { userName, email, password } = req.body;
const hashedPassword =  bcryptjs.hashSync(password, 10);

const NewUser = new User({ userName, email, password: hashedPassword });
try {
  await NewUser.save();
  res.status(201).json("user has been created successfully!!");
   
} catch (error) {
  next(error);
}
}

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return next(errorHandler(404, "user not found"));
    }
    const validPassword = bcryptjs.compareSync(password, user.password);
    if (!validPassword) {
      return next(errorHandler(401, "Wrong credentials!"));
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
    const { password: pass, ...rest } = user._doc;
    res.cookie("access_token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    }).status(200).json(rest);

  } catch (error) {
    next(error);
  }
}

export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) { 
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
      const { password: pass, ...rest } = user._doc;
      res.cookie("access_token", token, {
        httpOnly: true,
        // expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
      }).status(200).json(rest);
    } else {
      const generatePassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
      const hashedPassword =  bcryptjs.hashSync(generatePassword, 10);
      const newUser = new User({userName: req.body.name, email: req.body.email, password: hashedPassword, avatar: req.body.image }); 
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET)
      const { password: pass, ...rest } = newUser._doc;
      res.cookie("access_token", token, {
        httpOnly: true,
        // expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
      }).status(200).json(rest);
    } 
  } catch (error) { 
    next(error); 
  }
}

export const SignOut = async (req, res, next) => {
  try {
    res
    .clearCookie("access_token", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .json("User has been logged out");
  } catch (error) {
    next(error);
  }   
}