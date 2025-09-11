// import mongoose from 'mongoose';

// const orderSchema = new mongoose.Schema({
//     user: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User',
//         required: true
//     },
//     orderItems: [
//         {
//             product: {
//                 type: mongoose.Schema.Types.ObjectId,
//                 ref: 'Product'
//             },
//             quantity: Number
//         }
//     ],
//     shippingAddress: {
//         address: String,
//         city: String,
//         postalCode: String,
//         country: String
//     },
//     paymentMethod: String,
//     totalPrice: Number,
//     isPaid: {
//         type: Boolean,
//         default: false
//     },
//     paidAt: Date,
//     isDelivered: {
//         type: Boolean,
//         default: false
//     },
//     deliveredAt: Date
// }, { timestamps: true });

// const Order = mongoose.model('Order', orderSchema);

// export default Order;


// models/orderSchema.js
// import mongoose from "mongoose";

// const orderSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//   products: [
//     {
//       productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
//       name: { type: String, required: true },
//       price: { type: Number, required: true },
//       quantity: { type: Number, default: 1 },
//       imageUrl: { type: String, default: "/images/placeholder.jpg" },
//     }
//   ],
//   shippingAddress: {
//     fullName: { type: String, required: true },
//     address: { type: String, required: true },
//     city: { type: String, required: true },
//     state: { type: String, required: true },
//     postalCode: { type: String, required: true }, // <-- updated from zipCode
//     country: { type: String, required: true }
//   },
//   paymentMethod: { type: String, required: true },
//   total: { type: Number, required: true },
//   status: { type: String, default: "Pending" }
// }, { timestamps: true });

// export default mongoose.model("Order", orderSchema);


import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, default: 1 },
        imageUrl: { type: String, default: "/images/placeholder.jpg" },
      },
    ],
    shippingAddress: {
      fullName: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      postalCode: { type: String, required: true }, 
      country: { type: String, required: true },
      phoneNumber: { type: String, required: true }, // ✅ added phone number
    },
    paymentMethod: {
      type: String,
      enum: ["credit_card", "paypal", "stripe", "cash_on_delivery"],
      required: true,
    },
    total: { type: Number, required: true },
    status: {
      type: String,
      enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
