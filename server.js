<<<<<<< HEAD
=======
// import cors from "cors";
// import dotenv from "dotenv";
// import connectDB from "./config/db.js";
// import express, { json } from "express";
// import cartRoutes from "./routes/cartRoutes.js";
// import userRoutes from "./routes/userRoutes.js";
// import orderRoutes from "./routes/orderRoutes.js";
// import productRoutes from "./routes/productRoutes.js";

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// app.use(json());
// app.use(cors());

// app.use("/api/carts", cartRoutes);
// app.use("/api/users", userRoutes);
// app.use("/api/orders", orderRoutes);
// app.use("/api/products", productRoutes);

// connectDB().then(() => {
//     console.log("Database connected successfully");
//     app.listen(PORT, () => {
//         console.log(`Server is running on port http://localhost:${PORT}`);
//     });
// });

>>>>>>> 1d3ff7e24b59e7e4f9ffbd19ca6f0b7b76c411b0

// server.js
import express, { json } from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/db.js";

// Routes
import userRoutes from "./routes/userRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import adminRoutes from "./routes/admin.js";
import adminProductsRouter from "./routes/adminProducts.js";
import adminOrdersRouter from "./routes/adminOrders.js";
<<<<<<< HEAD
import paymentRoutes from "./routes/paymentRoutes.js";
=======
>>>>>>> 1d3ff7e24b59e7e4f9ffbd19ca6f0b7b76c411b0

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// For __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(json());

// ✅ Enable CORS for frontend only
app.use(cors({
  origin: "http://localhost:5173", // your frontend URL
  credentials: true,               // allow cookies/auth headers
}));

// Serve uploaded images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/carts", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/products", productRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/admin/products", adminProductsRouter);
app.use("/api/admin/orders", adminOrdersRouter);
<<<<<<< HEAD
app.use("/api/payments", paymentRoutes);
=======
>>>>>>> 1d3ff7e24b59e7e4f9ffbd19ca6f0b7b76c411b0


// Connect DB and start server
connectDB()
  .then(() => {
    console.log("Database connected successfully");
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error("Database connection failed:", err);
  });
