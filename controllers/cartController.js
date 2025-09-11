// import Cart from "../models/cartSchema.js";
// import Product from "../models/productSchema.js";

// // Add product to cart
// const addToCart = async (req, res) => {
//   try {
//     const { productId, quantity } = req.body;

//     if (!productId || quantity <= 0) {
//       return res.status(400).json({ message: "Invalid product or quantity" });
//     }

//     const product = await Product.findById(productId);
//     if (!product) {
//       return res.status(404).json({ message: "Product not found" });
//     }

//     // Find user's cart or create a new one
//     let cart = await Cart.findOne({ userId: req.user.id });
//     if (!cart) {
//       cart = new Cart({ userId: req.user.id, products: [] });
//     }

//     // Check if product is already in cart
//     const existingItem = cart.products.find(
//       (item) => item.productId.toString() === productId
//     );

//     if (existingItem) {
//       existingItem.quantity += quantity;
//     } else {
//       cart.products.push({ productId, quantity });
//     }

//     // Recalculate total
//     let total = 0;
//     for (const item of cart.products) {
//       const prod = await Product.findById(item.productId);
//       if (prod) {
//         total += prod.price * item.quantity;
//       }
//     }
//     cart.total = total;

//     await cart.save();

//     // Populate products for response
//     const populatedCart = await Cart.findById(cart._id).populate("products.productId");

//     res.status(200).json({
//       message: "Product added to cart successfully",
//       cart: populatedCart,
//     });
//   } catch (error) {
//     console.error("Failed to add to cart:", error);
//     res.status(500).json({ message: "Failed to add product to cart" });
//   }
// };

// // Get user's cart
// const getCart = async (req, res) => {
//   try {
//     const cart = await Cart.findOne({ userId: req.user.id }).populate("products.productId");
//     res.status(200).json(cart || { products: [], total: 0 });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Failed to fetch cart" });
//   }
// };

// // Remove product from cart
// const removeFromCart = async (req, res) => {
//   try {
//     const { productId } = req.params;

//     // Find user's cart
//     let cart = await Cart.findOne({ userId: req.user.id });
//     if (!cart) {
//       return res.status(404).json({ message: "Cart not found" });
//     }

//     // Remove the product from cart
//     cart.products = cart.products.filter(
//       (item) => item.productId.toString() !== productId
//     );

//     // Recalculate total
//     let total = 0;
//     for (const item of cart.products) {
//       const prod = await Product.findById(item.productId);
//       if (prod) {
//         total += prod.price * item.quantity;
//       }
//     }
//     cart.total = total;

//     await cart.save();

//     // Populate products for response
//     const populatedCart = await Cart.findById(cart._id).populate("products.productId");

//     res.status(200).json({
//       message: "Product removed from cart successfully",
//       cart: populatedCart,
//     });
//   } catch (error) {
//     console.error("Failed to remove from cart:", error);
//     res.status(500).json({ message: "Failed to remove product from cart" });
//   }
// };

// export { addToCart, getCart, removeFromCart };

import Cart from "../models/cartSchema.js";
import Product from "../models/productSchema.js";

<<<<<<< HEAD
=======
// Add product to cart
>>>>>>> 1d3ff7e24b59e7e4f9ffbd19ca6f0b7b76c411b0
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

    const existingItem = cart.products.find(
      item => String(item.productId) === String(productId)
    );

<<<<<<< HEAD
    const qtyToSet = Math.min(quantity, product.stockCount); // 🔹 ensure not more than stock

    if (existingItem) {
      existingItem.quantity = qtyToSet; // 🔹 replace quantity
    } else {
      cart.products.push({ productId, quantity: qtyToSet });
=======
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.products.push({ productId, quantity });
>>>>>>> 1d3ff7e24b59e7e4f9ffbd19ca6f0b7b76c411b0
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

<<<<<<< HEAD
    res.status(200).json({ message: "Product added/updated successfully", cart: populatedCart });
=======
    res.status(200).json({ message: "Product added to cart successfully", cart: populatedCart });
>>>>>>> 1d3ff7e24b59e7e4f9ffbd19ca6f0b7b76c411b0
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
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.products = cart.products.filter(
      (item) => String(item.productId) !== String(productId)
    );

    // Recalculate total
    let total = 0;
    for (const item of cart.products) {
      const prod = await Product.findById(item.productId);
      if (prod) total += prod.price * item.quantity;
    }
    cart.total = total;

    await cart.save();

    const populatedCart = await Cart.findById(cart._id).populate("products.productId");

    res.status(200).json({
      message: "Product removed from cart successfully",
      cart: populatedCart,
    });
  } catch (error) {
    console.error("Failed to remove from cart:", error);
    res.status(500).json({ message: "Failed to remove product from cart" });
  }
};

export { addToCart, getCart, removeFromCart };

