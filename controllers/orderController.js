// import Cart from "../models/cartSchema.js";
// import Order from "../models/orderSchema.js";
// import Product from "../models/productSchema.js";

// // PLACE ORDER
// const placeOrder = async (req, res) => {
//   try {
//     if (!req.user) {
//       return res.status(401).json({ message: "Not authorized" });
//     }

//     const userId = req.user.id;

//     // Get user's cart and populate product details
//     const cart = await Cart.findOne({ userId }).populate("products.productId");
//     if (!cart || cart.products.length === 0) {
//       return res.status(400).json({ message: "Cart is empty" });
//     }

//     let { shippingAddress = {}, paymentMethod } = req.body;

//     // Assign defaults for Quick Checkout
//     shippingAddress = {
//       fullName: shippingAddress.fullName || "Guest User",
//       address: shippingAddress.address || "N/A",
//       city: shippingAddress.city || "N/A",
//       state: shippingAddress.state || "N/A",
//       postalCode: shippingAddress.postalCode || "0000",
//       country: shippingAddress.country || "N/A",
//     };

//     paymentMethod = paymentMethod || "credit_card";

//     // Validate shipping fields
//     const requiredFields = ["fullName", "address", "city", "state", "postalCode", "country"];
//     for (const field of requiredFields) {
//       if (!shippingAddress[field] || shippingAddress[field].trim() === "") {
//         return res.status(400).json({ message: `Shipping ${field} is required` });
//       }
//     }

//     // Prepare order products
//     const orderProducts = [];
//     for (const item of cart.products) {
//       const product = item.productId;
//       if (!product) continue; // Skip deleted products

//       const quantity = item.quantity || 1;

//       if (product.stockCount != null && product.stockCount < quantity) {
//         return res.status(400).json({
//           message: `Not enough stock for ${product.name}. Available: ${product.stockCount}`,
//         });
//       }

//       // Reduce stock safely
//       if (product.stockCount != null) {
//         product.stockCount -= quantity;
//         await product.save();
//       }

//       orderProducts.push({
//         productId: product._id,
//         name: product.name || item.name || "Product",
//         price: product.price || item.price || 0,
//         quantity,
//         imageUrl: product.imageUrl || item.imageUrl || "/images/placeholder.jpg",
//       });
//     }

//     if (!orderProducts.length) {
//       return res.status(400).json({ message: "No valid products to order." });
//     }

//     const totalPrice = orderProducts.reduce((sum, p) => sum + p.price * p.quantity, 0);

//     // Create order
//     const newOrder = await Order.create({
//       userId,
//       products: orderProducts,
//       shippingAddress,
//       paymentMethod,
//       total: totalPrice,
//       status: "Pending",
//     });

//     // Clear cart
//     cart.products = [];
//     cart.total = 0;
//     await cart.save();

//     res.status(201).json({ message: "Order placed successfully", order: newOrder });
//   } catch (error) {
//     console.error("Place order error:", error);
//     res.status(500).json({ message: error.message || "Failed to place order" });
//   }
// };

// // GET CURRENT USER ORDERS
// const getUserOrders = async (req, res) => {
//   try {
//     const orders = await Order.find({ userId: req.user.id }).populate("products.productId");

//     const safeOrders = orders.map(order => ({
//       ...order._doc,
//       products: order.products.map(item => ({
//         productId: item.productId?._id || null,
//         name: item.productId?.name || item.name || "Product not found",
//         price: item.productId?.price ?? item.price ?? 0,
//         quantity: item.quantity || 1,
//         imageUrl: item.productId?.imageUrl || item.imageUrl || "/images/placeholder.jpg",
//       })),
//     }));

//     res.json(safeOrders);
//   } catch (error) {
//     console.error("Get user orders error:", error);
//     res.status(500).json({ message: "Failed to get user orders" });
//   }
// };

// // ADMIN STATS
// const getAdminStats = async (req, res) => {
//   try {
//     const totalOrders = await Order.countDocuments();
//     const orders = await Order.find();
//     const totalRevenue = orders.reduce((sum, order) => sum + (order.total || 0), 0);

//     const statusCounts = await Order.aggregate([
//       { $group: { _id: "$status", count: { $sum: 1 } } },
//     ]);

//     res.json({ totalOrders, totalRevenue, statusCounts });
//   } catch (error) {
//     console.error("Admin stats error:", error);
//     res.status(500).json({ message: "Failed to fetch admin stats" });
//   }
// };

// export { placeOrder, getUserOrders, getAdminStats };



import Cart from "../models/cartSchema.js";
import Order from "../models/orderSchema.js";
import Product from "../models/productSchema.js";

// Helper: normalize payment method
const normalizePaymentMethod = (method) => {
  if (!method) return "credit_card";
  return method.toLowerCase().replace(/\s+/g, "_");
};

// PLACE ORDER
const placeOrder = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const userId = req.user.id;

    // Fetch user's cart
    const cart = await Cart.findOne({ userId }).populate("products.productId");
    if (!cart || cart.products.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    let { shippingAddress = {}, paymentMethod } = req.body;

    // Support zipCode or postalCode
    shippingAddress.postalCode = shippingAddress.postalCode || shippingAddress.zipCode || "0000";

    // Assign default values
    shippingAddress = {
      fullName: shippingAddress.fullName || "Guest User",
      address: shippingAddress.address || "N/A",
      city: shippingAddress.city || "N/A",
      state: shippingAddress.state || "N/A",
      postalCode: shippingAddress.postalCode,
      country: shippingAddress.country || "N/A",
      phoneNumber: shippingAddress.phoneNumber || "0000000000", // ✅ phone number
    };

    paymentMethod = normalizePaymentMethod(paymentMethod);

    // Validate shipping fields
    const requiredFields = ["fullName", "address", "city", "state", "postalCode", "country", "phoneNumber"];
    for (const field of requiredFields) {
      if (!shippingAddress[field] || shippingAddress[field].trim() === "") {
        return res.status(400).json({ message: `Shipping ${field} is required` });
      }
    }

    // Prepare order products and check stock
    const orderProducts = [];
    for (const item of cart.products) {
      const product = item.productId;
      if (!product) continue;

      const quantity = item.quantity || 1;

      if (product.stockCount != null && product.stockCount < quantity) {
        return res.status(400).json({
          message: `Not enough stock for ${product.name}. Available: ${product.stockCount}`,
        });
      }

      // Reduce stock
      if (product.stockCount != null) {
        product.stockCount -= quantity;
        await product.save();
      }

      orderProducts.push({
        productId: product._id,
        name: product.name || item.name || "Product",
        price: product.price || item.price || 0,
        quantity,
        imageUrl: product.imageUrl || item.imageUrl || "/images/placeholder.jpg",
      });
    }

    if (!orderProducts.length) {
      return res.status(400).json({ message: "No valid products to order." });
    }

    const totalPrice = orderProducts.reduce((sum, p) => sum + p.price * p.quantity, 0);

    // Create order
    const newOrder = await Order.create({
      userId,
      products: orderProducts,
      shippingAddress,
      paymentMethod,
      total: totalPrice,
      status: "Pending",
    });

    // Clear cart
    cart.products = [];
    cart.total = 0;
    await cart.save();

    res.status(201).json({ message: "Order placed successfully", order: newOrder });
  } catch (error) {
    console.error("Place order error:", error);
    res.status(500).json({ message: error.message || "Failed to place order" });
  }
};

// GET CURRENT USER ORDERS
const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id }).populate("products.productId");

    const safeOrders = orders.map(order => ({
      ...order._doc,
      products: order.products.map(item => ({
        productId: item.productId?._id || null,
        name: item.productId?.name || item.name || "Product not found",
        price: item.productId?.price ?? item.price ?? 0,
        quantity: item.quantity || 1,
        imageUrl: item.productId?.imageUrl || item.imageUrl || "/images/placeholder.jpg",
      })),
    }));

    res.json(safeOrders);
  } catch (error) {
    console.error("Get user orders error:", error);
    res.status(500).json({ message: "Failed to get user orders" });
  }
};

// ADMIN: GET ALL ORDERS
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("userId", "fullName email")
      .populate("products.productId");

    const safeOrders = orders.map(order => ({
      ...order._doc,
      products: order.products.map(item => ({
        productId: item.productId?._id || null,
        name: item.productId?.name || item.name || "Product not found",
        price: item.productId?.price ?? item.price ?? 0,
        quantity: item.quantity || 1,
        imageUrl: item.productId?.imageUrl || item.imageUrl || "/images/placeholder.jpg",
      })),
    }));

    res.json(safeOrders);
  } catch (error) {
    console.error("Get all orders error:", error);
    res.status(500).json({ message: "Failed to fetch all orders" });
  }
};

<<<<<<< HEAD
// ADMIN STATS (with optional date filters)
const getAdminStats = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    const dateFilter = {};
    if (startDate || endDate) {
      dateFilter.createdAt = {};
      if (startDate) dateFilter.createdAt.$gte = new Date(startDate);
      if (endDate) dateFilter.createdAt.$lte = new Date(endDate);
    }

    const totalOrders = await Order.countDocuments(dateFilter);
    const orders = await Order.find(dateFilter);
    const totalRevenue = orders.reduce((sum, order) => sum + (order.total || 0), 0);

    const statusCounts = await Order.aggregate([
      { $match: dateFilter },
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);

    const revenueOverTime = await Order.aggregate([
      { $match: dateFilter },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          revenue: { $sum: "$total" },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.json({ totalOrders, totalRevenue, statusCounts, revenueOverTime });
=======
// ADMIN STATS
const getAdminStats = async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    const orders = await Order.find();
    const totalRevenue = orders.reduce((sum, order) => sum + (order.total || 0), 0);

    const statusCounts = await Order.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);

    res.json({ totalOrders, totalRevenue, statusCounts });
>>>>>>> 1d3ff7e24b59e7e4f9ffbd19ca6f0b7b76c411b0
  } catch (error) {
    console.error("Admin stats error:", error);
    res.status(500).json({ message: "Failed to fetch admin stats" });
  }
};

<<<<<<< HEAD

=======
>>>>>>> 1d3ff7e24b59e7e4f9ffbd19ca6f0b7b76c411b0
export { placeOrder, getUserOrders, getAllOrders, getAdminStats };
