import mongoose from "mongoose";
import { InvalidateCacheProps } from "../types/types.js";
import { myCache } from "../app.js";
import { Product } from "../models/product.js";

export const connectDB = (uri: string) => {
  mongoose
    .connect(uri, {
      dbName: "Ecommerce2024",
    })
    .then((c) => console.log(`DB connected to ${c.connection.host} `))
    .catch((e) => console.log(e));
};

export const invalidateCache = async ({
  product,
  order,
  admin,
}: InvalidateCacheProps) => {
  if (product) {
    const productKeys: string[] = [
      "latest-products",
      "categories",
      "all-products",
    ];
    // `product-${id}`;
    const products = await Product.find({}).select("_id");
    products.forEach((i) => {
      productKeys.push(`product-${i._id}`);
    });
    myCache.del(productKeys);
  }
  if (order) {
  }
  if (admin) {
  }
};
