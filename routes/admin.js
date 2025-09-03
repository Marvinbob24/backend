import express from "express";
import User from "../models/userSchema.js";
import Product from "../models/productSchema.js";
import Order from "../models/orderSchema.js";
import authenticateUser from "../middlewares/authenticateUser.js";
import authorizeAdmin from "../middlewares/authorizeAdmin.js";

const router = express.Router();

// ✅ Get all users
router.get("/users", authenticateUser, authorizeAdmin, async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
});

// ✅ Get users count
router.get("/users/count", authenticateUser, authorizeAdmin, async (req, res) => {
  try {
    const count = await User.countDocuments();
    res.json({ count });
  } catch (err) {
    res.status(500).json({ message: "Failed to get users count" });
  }
});

// ✅ Get orders count
router.get("/orders/count", authenticateUser, authorizeAdmin, async (req, res) => {
  try {
    const count = await Order.countDocuments();
    res.json({ count });
  } catch (err) {
    res.status(500).json({ message: "Failed to get orders count" });
  }
});

// ✅ Get products count
router.get("/products/count", authenticateUser, authorizeAdmin, async (req, res) => {
  try {
    const count = await Product.countDocuments();
    res.json({ count });
  } catch (err) {
    res.status(500).json({ message: "Failed to get products count" });
  }
});

// ✅ Get inventory (total stock)
router.get("/inventory/count", authenticateUser, authorizeAdmin, async (req, res) => {
  try {
    const products = await Product.find({});
    const totalStock = products.reduce((sum, p) => sum + (p.stock || 0), 0);
    res.json({ totalStock });
  } catch (err) {
    res.status(500).json({ message: "Failed to get inventory count" });
  }
});

// ✅ Get analytics summary
router.get("/analytics/summary", authenticateUser, authorizeAdmin, async (req, res) => {
  try {
    const orders = await Order.find({});
    const totalSales = orders.reduce((sum, o) => sum + (o.total || 0), 0);
    res.json({ totalSales });
  } catch (err) {
    res.status(500).json({ message: "Failed to get analytics summary" });
  }
});

export default router;
