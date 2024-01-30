import { TryCatch } from "../middlewares/error.js";
import { Order } from "../models/order.js";
import { invalidateCache, reduceStock } from "../utils/features.js";
import ErrorHandler from "../utils/utility-class.js";
import { myCache } from "../app.js";
export const newOrder = TryCatch(async (req, res, next) => {
    const { shippingInfo, user, subTotal, tax, shippingCharges, discount, total, orderItems, } = req.body;
    if (!shippingInfo ||
        !user ||
        !subTotal ||
        !tax ||
        //   !shippingCharges ||
        //   !discount ||
        !total ||
        !orderItems)
        return next(new ErrorHandler("Please Enter All the Fields", 400));
    await Order.create({
        shippingInfo,
        user,
        subTotal,
        tax,
        shippingCharges,
        discount,
        total,
        orderItems,
    });
    await reduceStock(orderItems);
    await invalidateCache({ product: true, order: true, admin: true });
    return res.status(200).json({
        success: true,
        message: "Order Placed Successfully",
    });
});
export const myOrders = TryCatch(async (req, res, next) => {
    const { id: user } = req.query;
    const key = `my-orders-${user}`;
    let orders = [];
    if (myCache.has(key))
        orders = JSON.parse(myCache.get(key));
    else {
        orders = await Order.find({ user });
        myCache.set(key, JSON.stringify(orders));
    }
    await invalidateCache({ product: true, order: true, admin: true });
    return res.status(200).json({
        success: true,
        message: `Total My Orders: ${orders.length}`,
        orders,
    });
});
export const allOrders = TryCatch(async (req, res, next) => {
    const key = `all-orders`;
    let orders = [];
    if (myCache.has(key))
        orders = JSON.parse(myCache.get(key));
    else {
        orders = await Order.find();
        myCache.set(key, JSON.stringify(orders));
    }
    await invalidateCache({ product: true, order: true, admin: true });
    return res.status(201).json({
        success: true,
        message: `Total Orders: ${orders.length}`,
        orders,
    });
});
