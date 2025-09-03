import express from "express";
import Order from "../models/orderSchema.js";
import authenticateUser from "../middlewares/authenticateUser.js";
import authorizeAdmin from "../middlewares/authorizeAdmin.js";

const router = express.Router();

// GET /api/admin/orders -> Get all orders (admin only)
// GET /api/admin/orders
router.get("/", authenticateUser, authorizeAdmin, async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("userId", "fullName email") // Populate user info
      .populate("products.productId", "name price"); // Populate product info
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
});


// GET /api/admin/orders/count -> Get total orders count
router.get("/count", authenticateUser, authorizeAdmin, async (req, res) => {
  try {
    const count = await Order.countDocuments();
    res.json({ count });
  } catch (err) {
    res.status(500).json({ message: "Failed to count orders" });
  }
});

// PUT /api/admin/orders/:id/status -> Update order status
router.put("/:id/status", authenticateUser, authorizeAdmin, async (req, res) => {
  const { status } = req.body;
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.status = status;
    await order.save();

    res.json({ message: "Order status updated successfully", order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update order status" });
  }
});

export default router;
