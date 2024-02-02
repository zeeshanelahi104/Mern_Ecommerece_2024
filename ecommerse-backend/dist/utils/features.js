import mongoose from "mongoose";
import { myCache } from "../app.js";
import { Product } from "../models/product.js";
export const connectDB = () => {
    mongoose
        .connect("mongodb+srv://zeeshanelahi:Zeeshan93052@cluster0.s6fdfsk.mongodb.net/Ecommerce2024?retryWrites=true", {
        dbName: "Ecommerce2024",
    })
        .then((c) => console.log(`DB connected to ${c.connection.host} `))
        .catch((e) => console.log(e));
};
export const invalidateCache = async ({ product, order, admin, userId, productId, orderId, }) => {
    if (product) {
        const productKeys = [
            "latest-products",
            "categories",
            "all-products",
        ];
        if (typeof productId === "string")
            productKeys.push(`product-${productId}`);
        if (typeof productId === "object")
            productId.forEach((i) => productKeys.push(`product-${i}`));
        myCache.del(productKeys);
    }
    if (order) {
        const orderKeys = [
            "all-orders",
            `my-orders-${userId}`,
            `order-${orderId}`,
        ];
        myCache.del(orderKeys);
    }
    if (admin) {
    }
};
export const reduceStock = async (orderItems) => {
    for (let i = 0; i < orderItems.length; i++) {
        const order = orderItems[i];
        const product = await Product.findById(order.productId);
        if (!product)
            throw new Error("Product Not Found");
        product.stock -= order.quantity;
        await product.save();
    }
};
