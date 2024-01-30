import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    shippingInfo: {
      address: {
        type: String,
        required: [true, "Please enter Address"],
      },
      city: {
        type: String,
        required: [true, "Please enter City Name"],
      },
      state: {
        type: String,
        required: [true, "Please enter State"],
      },
      country: {
        type: String,
        required: [true, "Please enter Country Name"],
      },
      pinCode: {
        type: Number,
        required: [true, "Please enter PinCode"],
      },
    },
    user: {
      type: String,
      ref: "User",
      required: [true, "Invalid User"],
    },
    subTotal: {
      type: Number,
      required: [true, "SubTotal Required"],
    },
    tax: {
      type: Number,
      required: [true, "Tax Required"],
    },
    shippingCharges: {
      type: Number,
      // required: [true, "Please enter Shipping Charges"],
    },
    discount: {
      type: Number,
      // required: [true, "Please enter Discount"],
    },
    total: {
      type: Number,
      required: [true, "Total amount is missing"],
    },
    status: {
      type: String,
      enum: ["Processing", "Shipped", "Delivered"],
      default: "Processing",
    },
    orderItems: [
      {
        name: String,
        photo: String,
        price: Number,
        quantity: Number,
        productId: {
          type: mongoose.Types.ObjectId,
          ref: "Product",
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Order = mongoose.model("Order", schema);
