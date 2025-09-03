// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import Product from "./models/productSchema.js";

// dotenv.config();

// const products = [
//   { name: "Exclusive Football Jersey", description: "High quality football jersey", price: 20, imageUrl: "/images/Bs1.jpeg", stockCount: 50, category: "Football" },
//   { name: "Limited Edition Football Scarf", description: "Premium scarf", price: 35, imageUrl: "/images/scarf.jpeg", stockCount: 40, category: "Football" },
//   { name: "Goalkeeper Gloves", description: "Durable gloves for goalkeepers", price: 45, imageUrl: "/images/glove.jpeg", stockCount: 30, category: "Football" },
//   { name: "Fan Hat - Football", description: "Support your team with a fan hat", price: 20, imageUrl: "/images/hat.jpeg", stockCount: 60, category: "Football" },
//   { name: "Signed Match Ball", description: "Official match ball with signatures", price: 120, imageUrl: "/images/ball.jpeg", stockCount: 10, category: "Football" },
//   { name: "Basketball Hoodie", description: "Warm hoodie for basketball fans", price: 65, imageUrl: "/images/hoodie.jpeg", stockCount: 25, category: "Basketball" },
//   { name: "Court-side Cap", description: "Stylish basketball cap", price: 25, imageUrl: "/images/cap.jpeg", stockCount: 50, category: "Basketball" },
//   { name: "Pro Basketball Jersey", description: "Professional quality jersey", price: 85, imageUrl: "/images/basket.jpeg", stockCount: 20, category: "Basketball" },
//   { name: "Team Towel", description: "Support your team with this towel", price: 15, imageUrl: "/images/towel.jpeg", stockCount: 70, category: "Basketball" },
//   { name: "Sneaker Keychain", description: "Miniature sneaker keychain", price: 10, imageUrl: "/images/key.jpeg", stockCount: 100, category: "Basketball" },
//   { name: "Tennis Cap", description: "Cap for tennis enthusiasts", price: 25, imageUrl: "/images/tennis.jpg", stockCount: 30, category: "Tennis" },
//   { name: "Premium Tennis Racket", description: "High-quality tennis racket", price: 150, imageUrl: "/images/racket.jpeg", stockCount: 15, category: "Tennis" },
//   { name: "Tennis Sweatband", description: "Sweatband for tennis players", price: 12, imageUrl: "/images/band.jpeg", stockCount: 50, category: "Tennis" },
//   { name: "Tournament Polo Shirt", description: "Official tournament shirt", price: 60, imageUrl: "/images/polo.jpeg", stockCount: 25, category: "Tennis" },
//   { name: "Tennis Water Bottle", description: "Stay hydrated on court", price: 18, imageUrl: "/images/bottle.jpeg", stockCount: 40, category: "Tennis" },
//   { name: "Fan Keychain", description: "Mini keychain for fans", price: 8, imageUrl: "/images/keychain.jpeg", stockCount: 80, category: "Accessories" },
//   { name: "Drawstring Bag", description: "Convenient fan bag", price: 20, imageUrl: "/images/bag.jpeg", stockCount: 50, category: "Accessories" },
//   { name: "Limited Edition Poster", description: "Collector poster", price: 30, imageUrl: "/images/poster.jpeg", stockCount: 35, category: "Accessories" },
//   { name: "Team Socks", description: "Show your team spirit", price: 15, imageUrl: "/images/socks.jpeg", stockCount: 60, category: "Accessories" },
//   { name: "Football Jersey", description: "Extra football jersey", price: 10, imageUrl: "/images/jersey.jpeg", stockCount: 50, category: "Football" },

//   // Fan Art
//   { name: "Custom Fan Art T-Shirt", description: "Unique fan art T-shirt", price: 40, imageUrl: "/images/fanshirt.jpeg", stockCount: 30, category: "Fan Art" },
//   { name: "Limited Edition Fan Art Poster", description: "Fan art poster", price: 25, imageUrl: "/images/fanposter.jpeg", stockCount: 40, category: "Fan Art" },
// ];

// // Duplicate some products for ids 21–50
// for (let i = 21; i <= 50; i++) {
//   const base = products[(i - 1) % 20];
//   products.push({
//     ...base,
//     name: `${base.name} (Edition ${i})`,
//     stockCount: base.stockCount,
//   });
// }

// // Connect DB and insert products
// const start = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI);
//     console.log("Connected to MongoDB");

//     await Product.deleteMany(); // Clear existing
//     await Product.insertMany(products);

//     console.log(`${products.length} products inserted`);
//     process.exit();
//   } catch (err) {
//     console.error("Error seeding products:", err);
//     process.exit(1);
//   }
// };

// start();
