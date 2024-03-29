import express from "express";

import { adminOnly } from "../middlewares/auth.js";
import {
  deleteProduct,
  getAdminProducts,
  getAllCategories,
  getAllProducts,
  getLatestProducts,
  getSingleProduct,
  newProduct,
  updateProduct,
} from "../contollers/product.js";
import { singleUpload } from "../middlewares/multer.js";

const app = express.Router();
//Create New Product  -  /api/v1/product/new
app.post("/new", adminOnly, singleUpload, newProduct);
//To get all products with Filters  -   /api/v1/product/latest
app.get("/all", getAllProducts);
//To get last 5 products  -   /api/v1/product/latest
app.get("/latest", getLatestProducts);
//To get all unique Categories -   /api/v1/product/categories
app.get("/categories", getAllCategories);
//To get all Products  -  /api/v1/product/admin-products
app.get("/admin-products", adminOnly, getAdminProducts);

app
  .route("/:id")
  .get(getSingleProduct)
  .put(adminOnly, singleUpload, updateProduct)
  .delete(adminOnly, deleteProduct);
export default app;
