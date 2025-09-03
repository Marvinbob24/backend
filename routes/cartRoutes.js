// import { Router } from "express";
// import authenticateUser from "../middlewares/authenticateUser.js";
// import { addToCart, getCart } from "../controllers/cartController.js";

// const router = Router();

// router.get("/get", authenticateUser, getCart);
// router.post("/add", authenticateUser, addToCart);

// export default router;

import { Router } from "express";
import authenticateUser from "../middlewares/authenticateUser.js";
import { addToCart, getCart, removeFromCart } from "../controllers/cartController.js";

const router = Router();

// User must be logged in to add or view cart
router.post("/add", authenticateUser, addToCart);
router.get("/", authenticateUser, getCart);
router.delete("/remove/:productId", authenticateUser, removeFromCart);

export default router;
