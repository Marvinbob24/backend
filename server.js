// // server.js
// import express, { json } from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import path from "path";
// import { fileURLToPath } from "url";
// import connectDB from "./config/db.js";

// // Routes
// import userRoutes from "./routes/userRoutes.js";
// import cartRoutes from "./routes/cartRoutes.js";
// import orderRoutes from "./routes/orderRoutes.js";
// import productRoutes from "./routes/productRoutes.js";
// import adminRoutes from "./routes/admin.js";
// import adminProductsRouter from "./routes/adminProducts.js";
// import adminOrdersRouter from "./routes/adminOrders.js";
// import paymentRoutes from "./routes/paymentRoutes.js"; // keep this line if you need payments

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// // For __dirname in ES modules
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // Middleware
// app.use(json());

// // Enable CORS for frontend only
// app.use(cors({
//   origin: "http://localhost:5173", // your frontend URL
//   credentials: true,
// }));

// // Serve uploaded images
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// // Routes
// app.use("/api/users", userRoutes);
// app.use("/api/carts", cartRoutes);
// app.use("/api/orders", orderRoutes);
// app.use("/api/products", productRoutes);
// app.use("/api/admin", adminRoutes);
// app.use("/api/admin/products", adminProductsRouter);
// app.use("/api/admin/orders", adminOrdersRouter);
// app.use("/api/payments", paymentRoutes); // keep this if needed

// // Connect DB and start server
// connectDB()
//   .then(() => {
//     console.log("Database connected successfully");
//     app.listen(PORT, () => {
//       console.log(`Server running at http://localhost:${PORT}`);
//     });
//   })
//   .catch(err => {
//     console.error("Database connection failed:", err);
//   });



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
import paymentRoutes from "./routes/paymentRoutes.js"; // optional

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// For __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(json());

// CORS setup for local and deployed frontend
app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like mobile apps, Postman, curl)
      if (!origin) return callback(null, true);

      // ✅ Allow localhost during dev
      if (origin.includes("localhost:5173")) {
        return callback(null, true);
      }

      // ✅ Allow any frontend deployed on Vercel
      if (origin.endsWith(".vercel.app")) {
        return callback(null, true);
      }

      // ❌ Reject other origins
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);
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
app.use("/api/payments", paymentRoutes); // optional

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
