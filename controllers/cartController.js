import Cart from "../models/cartSchema.js";
import Product from "../models/productSchema.js";

// Add or update product in cart
const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    if (!productId || quantity <= 0) {
      return res.status(400).json({ message: "Invalid product or quantity" });
    }

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    let cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) cart = new Cart({ userId: req.user.id, products: [], total: 0 });

    const existingItem = cart.products.find(item => String(item.productId) === String(productId));
    const qtyToSet = Math.min(quantity, product.stockCount); // don't exceed stock

    if (existingItem) {
      existingItem.quantity = qtyToSet;
    } else {
      cart.products.push({ productId, quantity: qtyToSet });
    }

    // Recalculate total
    let total = 0;
    for (const item of cart.products) {
      const prod = await Product.findById(item.productId);
      if (prod) total += prod.price * item.quantity;
    }
    cart.total = total;

    await cart.save();

    const populatedCart = await Cart.findById(cart._id).populate("products.productId");
    res.status(200).json({ message: "Product added/updated successfully", cart: populatedCart });
  } catch (error) {
    console.error("Failed to add to cart:", error);
    res.status(500).json({ message: "Failed to add product to cart" });
  }
};

// Get user's cart
const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id }).populate("products.productId");
    res.status(200).json(cart || { products: [], total: 0 });
  } catch (err) {
    console.error("Get cart error:", err);
    res.status(500).json({ message: "Failed to fetch cart" });
  }
};

// Remove product from cart
const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;
    let cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.products = cart.products.filter(item => String(item.productId) !== String(productId));

    // Recalculate total
    let total = 0;
    for (const item of cart.products) {
      const prod = await Product.findById(item.productId);
      if (prod) total += prod.price * item.quantity;
    }
    cart.total = total;

    await cart.save();
    const populatedCart = await Cart.findById(cart._id).populate("products.productId");

    res.status(200).json({ message: "Product removed from cart successfully", cart: populatedCart });
  } catch (error) {
    console.error("Failed to remove from cart:", error);
    res.status(500).json({ message: "Failed to remove product from cart" });
  }
};

export { addToCart, getCart, removeFromCart };
