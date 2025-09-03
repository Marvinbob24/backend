// // import { Router } from "express";
// // import authorizeAdmin from "../middlewares/authorizeAdmin.js";
// // import authenticateUser from "../middlewares/authenticateUser.js";
// // import { getProducts, createProduct } from "../controllers/productController.js";

// // const router = Router();

// // router.post("/create", authenticateUser, authorizeAdmin, createProduct);
// // router.get("/get", authenticateUser, getProducts);

// // export default router;

// // import { Router } from "express";
// // import { createProduct, getProducts } from "../controllers/productController.js";
// // import authenticateUser from "../middlewares/authenticateUser.js";
// // import authorizeAdmin from "../middlewares/authorizeAdmin.js";
// // import upload from "../middlewares/upload.js";

// // const router = Router();

// // // Upload single image with field name "image"
// // router.post("/create", authenticateUser, authorizeAdmin, upload.single("image"), createProduct);

// // // Get all products (public)
// // router.get("/get", getProducts);

// // export default router;

// import { Router } from "express";
// import authenticateUser from "../middlewares/authenticateUser.js";
// import authorizeAdmin from "../middlewares/authorizeAdmin.js";
// import { createProduct, getProducts, deleteProduct } from "../controllers/productController.js";
// import upload from "../middlewares/upload.js"; // multer upload

// const router = Router();

// // All users can view products
// router.get("/get", getProducts);

// // Only admins can create products
// router.post(
//   "/create",
//   authenticateUser,
//   authorizeAdmin,
//   upload.single("image"), // "image" matches the field name in the form
//   createProduct
// );

// // Only admins can delete products
// router.delete(
//   "/delete/:id",
//   authenticateUser,
//   authorizeAdmin,
//   deleteProduct
// );

// export default router;


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
