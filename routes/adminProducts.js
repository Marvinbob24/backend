import express from "express";
import Product from "../models/productSchema.js";
import authenticateUser from "../middlewares/authenticateUser.js";
import authorizeAdmin from "../middlewares/authorizeAdmin.js";

const router = express.Router();

// GET all products
router.get("/", authenticateUser, authorizeAdmin, async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch products" });
  }
});

// POST add new product
router.post("/add", authenticateUser, authorizeAdmin, async (req, res) => {
  try {
    const { name, category, price, description, imageUrl, stock } = req.body;
    const newProduct = new Product({ name, category, price, description, imageUrl, stock });
    await newProduct.save();
    res.json(newProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to add product" });
  }
});

// PUT update product
router.put("/update/:id", authenticateUser, authorizeAdmin, async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update product" });
  }
});

// DELETE product
router.delete("/delete/:id", authenticateUser, authorizeAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete product" });
  }
});

export default router;
