

// import Product from "../models/productSchema.js";

// const createProduct = async (req, res) => {
//   try {
//     const { name, description, price, category } = req.body;
//     const image = req.file ? `/uploads/${req.file.filename}` : null;

//     if (!name || !description || !price || !image || !category) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     const product = await Product.create({
//       name,
//       description,
//       price,
//       category,
//       imageUrl: image,
//     });

//     res.status(201).json({ message: "Product created successfully", product });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// const getProducts = async (req, res) => {
//   try {
//     const products = await Product.find();
//     res.status(200).json({ message: "Products fetched successfully", products });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// const deleteProduct = async (req, res) => {
//   try {
//     const product = await Product.findByIdAndDelete(req.params.id);
//     if (!product) return res.status(404).json({ message: "Product not found" });

//     res.status(200).json({ message: "Product deleted successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// export { createProduct, getProducts, deleteProduct };

import Product from "../models/productSchema.js";

// Create a new product
const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, stockCount } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    if (!name || !description || !price || !image || !category || stockCount === undefined) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const product = await Product.create({
      name,
      description,
      price,
      category,
      imageUrl: image,
      stockCount,
    });

    res.status(201).json({ message: "Product created successfully", product });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ message: "Products fetched successfully", products });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete a product
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { createProduct, getProducts, deleteProduct };


