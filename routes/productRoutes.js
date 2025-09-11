import { Router } from "express";
import authenticateUser from "../middlewares/authenticateUser.js";
import authorizeAdmin from "../middlewares/authorizeAdmin.js";
import { createProduct, getProducts, deleteProduct } from "../controllers/productController.js";
import upload from "../middlewares/upload.js"; // multer middleware

const router = Router();

// ✅ Public route: all users can view products
router.get("/get", getProducts);

// ✅ Admin route: create product with image upload and stockCount
router.post(
  "/create",
  authenticateUser,
  authorizeAdmin,
  upload.single("image"), // "image" field in the form
  createProduct
);

// ✅ Admin route: delete product
router.delete(
  "/delete/:id",
  authenticateUser,
  authorizeAdmin,
  deleteProduct
);

export default router;
