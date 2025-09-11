// import { Router } from "express";
// import { register, login } from "../controllers/userController.js";

// const router = Router();

// router.post("/register", register);
// router.post("/login", login);



// export default router;


import { Router } from "express";
import { register, login, updateProfile, changePassword } from "../controllers/userController.js";
import authenticateUser from "../middlewares/authenticateUser.js";

const router = Router();

// Public routes
router.post("/register", register);
router.post("/login", login);

// Protected routes
router.put("/update-profile", authenticateUser, updateProfile);
router.put("/change-password", authenticateUser, changePassword);

export default router;

