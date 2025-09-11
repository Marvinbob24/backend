

// import mongoose from "mongoose";

// const productSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     price: { type: Number, required: true },
//     category: { type: String, required: true },
//     imageUrl: { type: String, required: true }, // store uploaded image URL
//     description: { type: String },
//   },
//   { timestamps: true }
// );

// export default mongoose.model("Product", productSchema);

import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    price: { type: Number, required: true, default: 0 },
    imageUrl: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    stockCount: { type: Number, required: true, default: 0 }, // ✅ added stock count
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;

