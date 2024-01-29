import { Request } from "express";
import { TryCatch } from "../middlewares/error.js";
import { NewProductRequestBody } from "../types/types.js";
import { Product } from "../models/product.js";
import ErrorHandler from "../utils/utility-class.js";
import { rm } from "fs";

export const newProduct = TryCatch(
  async (req: Request<{}, {}, NewProductRequestBody>, res, next) => {
    const { name, category, price, stock } = req.body;
    const photo = req.file;
    if (!photo) return next(new ErrorHandler("Please add photo", 400));
    if (!name || !category || !price || !stock) {
      rm(photo.path, () => {
        console.log("Deleted");
      });
      return next(new ErrorHandler("Please enter All Fields", 400));
    }
    await Product.create({
      name,
      category: category.toLowerCase(),
      price,
      stock,
      photo: photo.path,
    });
    return res.status(201).json({
      success: true,
      message: "Product Created Successfully",
    });
  }
);
export const getLatestProducts = TryCatch(async (req, res, next) => {
  const products = await Product.find({}).sort({ createdAt: -1 }).limit(5);
  return res.status(200).json({
    success: true,
    products,
  });
});
export const getAllCategories = TryCatch(async (req, res, next) => {
  const categories = await Product.distinct("category");
  return res.status(200).json({
    success: true,
    categories,
  });
});
export const getAdminProducts = TryCatch(async (req, res, next) => {
  const products = await Product.find({});
  return res.status(200).json({
    success: true,
    products,
  });
});
export const getSingleProduct = TryCatch(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  return res.status(200).json({
    success: true,
    product,
  });
});
export const updateProduct = TryCatch(async (req, res, next) => {
  const { id } = req.params;
  const { name, category, price, stock } = req.body;
  const photo = req.file;
  const product = await Product.findById(id);
  if (!product) return next(new ErrorHandler("Product Not Found", 404));
  if (photo) {
    rm(product.photo!, () => {
      console.log("Old Photo Deleted");
    });
    product.photo = photo.path;
  }
  if (name) product.name = name;
  if (price) product.price = price;
  if (stock) product.stock = stock;
  if (category) product.category = category;
  await product.save();
  return res.status(200).json({
    success: true,
    message: "Product Updated Successfully",
  });
});
export const deleteProduct = TryCatch(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) return next(new ErrorHandler("Product Not Found", 404));

  rm(product.photo!, () => {
    console.log("Product Photo Deleted");
  });
  await Product.deleteOne();
  return res.status(200).json({
    success: true,
    message: "Product Deleted Successfully",
  });
});
