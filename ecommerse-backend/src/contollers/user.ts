import { Request, Response, NextFunction } from "express";
import { User } from "../models/user.js";
import { NewUserRequestBody } from "../types/types.js";
import ErrorHandler from "../utils/utility-class.js";
import { TryCatch } from "../middlewares/error.js";

export const newUser = TryCatch(
  async (
    req: Request<{}, {}, NewUserRequestBody>,
    res: Response,
    next: NextFunction
  ) => {
    const { _id, name, email, photo, gender, role, dob } = req.body;
    console.log(_id, name, email, photo, gender, role, dob);
    let user = await User.findById(_id);
    if (user)
      return res.status(200).json({
        success: true,
        message: `Welcome, ${user.name}`,
      });
    if (!_id || !name || !email || !photo || !gender || !role || !dob) {
      return next(new ErrorHandler("Please fill all the fields", 400));
    }
    user = await User.create({
      _id,
      name,
      email,
      photo,
      gender,
      role,
      dob: new Date(dob),
    });
    return res.status(201).json({
      success: true,
      message: `Welcome, ${user.name}`,
    });
  }
);
export const getAllUsers = TryCatch(async (req, res, next) => {
  const users = await User.find({});
  return res.status(200).json({
    success: true,
    message: `Total users: ${users.length}`,
    users,
  });
});
export const getSingleUser = TryCatch(async (req, res, next) => {
  const id = req.params.id;
  const user = await User.findById(id);
  if (!user) return next(new ErrorHandler("Invalid Id", 400));
  return res.status(200).json({
    success: true,
    user,
  });
});
export const deleteUser = TryCatch(async (req, res, next) => {
  const id = req.params.id;
  const user = await User.findById(id);
  if (!user) return next(new ErrorHandler("Invalid Id", 400));
  await user.deleteOne();
  return res.status(200).json({
    success: true,
    message: "User Deleted Successfully",
  });
});
