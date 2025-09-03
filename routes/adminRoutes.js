// routes/adminRoutes.js
import { Router } from "express";
import authenticateUser from "../middlewares/authenticateUser.js";
import authorizeAdmin from "../middlewares/authorizeAdmin.js";
import Order from "../models/orderSchema.js";

const router = Router();

router.get("/orders/admin-stats", authenticateUser, authorizeAdmin, async (req, res) => {
  try {
    const orders = await Order.find();
    const totalOrders = orders.length;
    const totalSales = orders.reduce((sum, o) => sum + o.total, 0);

    res.status(200).json({ totalOrders, totalSales });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch orders stats" });
  }
});

export default router;
