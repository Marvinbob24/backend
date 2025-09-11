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
    if (!req.user) return res.status(401).json({ message: "Not authorized" });

    const userId = req.user.id;
    const cart = await Cart.findOne({ userId }).populate("products.productId");
    if (!cart || cart.products.length === 0) return res.status(400).json({ message: "Cart is empty" });

    let { shippingAddress = {}, paymentMethod } = req.body;
    shippingAddress.postalCode = shippingAddress.postalCode || shippingAddress.zipCode || "0000";
    shippingAddress = {
      fullName: shippingAddress.fullName || "Guest User",
      address: shippingAddress.address || "N/A",
      city: shippingAddress.city || "N/A",
      state: shippingAddress.state || "N/A",
      postalCode: shippingAddress.postalCode,
      country: shippingAddress.country || "N/A",
      phoneNumber: shippingAddress.phoneNumber || "0000000000",
    };
    paymentMethod = normalizePaymentMethod(paymentMethod);

    const requiredFields = ["fullName", "address", "city", "state", "postalCode", "country", "phoneNumber"];
    for (const field of requiredFields) {
      if (!shippingAddress[field] || shippingAddress[field].trim() === "")
        return res.status(400).json({ message: `Shipping ${field} is required` });
    }

    const orderProducts = [];
    for (const item of cart.products) {
      const product = item.productId;
      if (!product) continue;
      const quantity = item.quantity || 1;
      if (product.stockCount != null && product.stockCount < quantity)
        return res.status(400).json({ message: `Not enough stock for ${product.name}. Available: ${product.stockCount}` });

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

    if (!orderProducts.length) return res.status(400).json({ message: "No valid products to order." });

    const totalPrice = orderProducts.reduce((sum, p) => sum + p.price * p.quantity, 0);

    const newOrder = await Order.create({
      userId,
      products: orderProducts,
      shippingAddress,
      paymentMethod,
      total: totalPrice,
      status: "Pending",
    });

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
  } catch (error) {
    console.error("Admin stats error:", error);
    res.status(500).json({ message: "Failed to fetch admin stats" });
  }
};

export { placeOrder, getUserOrders, getAllOrders, getAdminStats };
