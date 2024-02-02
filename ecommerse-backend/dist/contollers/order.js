import { TryCatch } from "../middlewares/error.js";
import { Order } from "../models/order.js";
import { invalidateCache, reduceStock } from "../utils/features.js";
import ErrorHandler from "../utils/utility-class.js";
import { myCache } from "../app.js";
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
        orders = await Order.find().populate("user", "name");
        myCache.set(key, JSON.stringify(orders));
    }
    await invalidateCache({ product: true, order: true, admin: true });
    return res.status(201).json({
        success: true,
        message: `Total Orders: ${orders.length}`,
        orders,
    });
});
export const getSingleOrder = TryCatch(async (req, res, next) => {
    const { id } = req.params;
    const key = `order-${id}`;
    let order;
    if (myCache.has(key))
        order = JSON.parse(myCache.get(key));
    else {
        order = await Order.findById(id).populate("user", "name");
        if (!order)
            return next(new ErrorHandler("Order Not Found", 404));
        myCache.set(key, JSON.stringify(order));
    }
    await invalidateCache({ product: false, order: true, admin: true });
    return res.status(201).json({
        success: true,
        order,
    });
});
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
    const order = await Order.create({
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
    await invalidateCache({
        product: false,
        order: true,
        admin: true,
        userId: user,
        productId: order.orderItems.map((i) => String(i.productId)),
    });
    return res.status(200).json({
        success: true,
        message: "Order Placed Successfully",
    });
});
export const processOrder = TryCatch(async (req, res, next) => {
    const { id } = req.params;
    const order = await Order.findById(id);
    if (!order)
        return next(new ErrorHandler("Order Not Found", 404));
    switch (order.status) {
        case "Processing":
            order.status = "Shipped";
            break;
        case "Shipped":
            order.status = "Delivered";
            break;
        default:
            order.status = "Delivered";
            break;
    }
    await order.save();
    await invalidateCache({
        product: false,
        order: true,
        admin: true,
        userId: order.user,
        orderId: String(order._id),
    });
    return res.status(200).json({
        success: true,
        message: "Order Processed Successfully",
    });
});
export const deleteOrder = TryCatch(async (req, res, next) => {
    const { id } = req.params;
    const order = await Order.findById(id);
    if (!order)
        return next(new ErrorHandler("Order Not Found", 404));
    await order.deleteOne();
    await invalidateCache({
        product: false,
        order: true,
        admin: true,
        userId: order.user,
        orderId: String(order._id),
    });
    return res.status(200).json({
        success: true,
        message: "Order Deleted Successfully",
    });
});
