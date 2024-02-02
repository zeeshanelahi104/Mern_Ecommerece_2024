import { TryCatch } from "../middlewares/error.js";
import { Coupon } from "../models/coupon.js";
import ErrorHandler from "../utils/utility-class.js";
import { Request, Response, NextFunction } from "express";

export const newCoupon = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const { coupon, amount } = req.body;
    if (!coupon || !amount)
      return next(new ErrorHandler("Please enter Coupon code and Amount", 400));
    await Coupon.create({ code: coupon, amount });
    return res.status(201).json({
      success: true,
      message: `Coupon ${coupon} Created Successfully`,
    });
  }
);
export const applyDiscount = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const { coupon } = req.query;
    const discount = await Coupon.findOne({ code: coupon });
    if (!discount) return next(new ErrorHandler("Invalid Coupon Code", 400));
    return res.status(200).json({
      success: true,
      discount: discount.amount,
    });
  }
);
export const allCoupons = TryCatch(async (req, res, next) => {
  const coupons = await Coupon.find({});

  return res.status(200).json({
    success: true,
    message: `Total Coupens: ${coupons.length}`,
    coupons,
  });
});
export const deleteCoupon = TryCatch(async (req, res, next) => {
  const { id } = req.params;
  const coupon = await Coupon.findById(id);
  if (!coupon) return next(new ErrorHandler("Invalid Coupon ID", 404));
  await coupon.deleteOne();
  return res.status(200).json({
    success: true,
    message: `Coupon ${coupon?.code} Deleted Successfully`,
  });
});
