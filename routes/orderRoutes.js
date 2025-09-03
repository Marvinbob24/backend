// import { Router } from "express";
// import authenticateUser from "../middlewares/authenticateUser.js";
// import { getOrders, placeOrder } from "../controllers/orderController.js";

// const router = Router();

// router.post("/create", authenticateUser, placeOrder);
// router.get("/get", authenticateUser, getOrders);

// export default router;

import { Router } from "express";
import authenticateUser from "../middlewares/authenticateUser.js";
import authorizeAdmin from "../middlewares/authorizeAdmin.js";
import { placeOrder, getUserOrders, getAdminStats } from "../controllers/orderController.js";

const router = Router();

// User routes
router.post("/place", authenticateUser, placeOrder);
router.get("/my-orders", authenticateUser, getUserOrders);

// Admin route
router.get("/admin-stats", authenticateUser, authorizeAdmin, getAdminStats);

export default router;

