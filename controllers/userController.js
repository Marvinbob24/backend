<<<<<<< HEAD
=======
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import User from "../models/userSchema.js";

// const register = async (req, res) => {
//     try {
//         const { fullName, email, password } = req.body;
//         if (!fullName || !email || !password) return res.status(400).json({ message: "All fields are required" });

//         // Check if user already exists
//         const userExists = await User.findOne({ email });
//         if (userExists) return res.status(400).json({ message: "User already exists" });

//         // Create new user
//         const hashedPassword = await bcrypt.hash(password, 10);
//         const newUser = await User.create({
//             fullName,
//             email,
//             password: hashedPassword,
//         });

//         return res.status(201).json({
//             message: "User registered successfully",
//             user: {
//                 id: newUser._id,
//                 fullName: newUser.fullName,
//                 email: newUser.email,
//             },
//         });
//     } catch (error) {
//         console.error("Error during registration:", error);
//         return res.status(500).json({ message: "Internal server error" });
//     }
// }

// const login = async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         const user = await User.findOne({ email });
//         !user && res.status(400).json({ message: "Invalid email or password" });
        
//         const passwordMatch = await bcrypt.compare(password, user.password);
//         !passwordMatch && res.status(400).json({ message: "Invalid email or password" });

//         const token = jwt.sign({
//             id: user._id,
//             isAdmin: user.isAdmin,
//         }, process.env.JWT_SECRET, {
//             expiresIn: "7d",
//         });

//         return res.status(200).json({
//             message: "Login successful",
//             token,
//             user: {
//                 id: user._id,
//                 fullName: user.fullName,
//                 email: user.email,
//                 isAdmin: user.isAdmin,
//             },
//         });

//     } catch (error) {
//         console.error("Error during login:", error);
//         return res.status(500).json({ message: "Internal server error" });
//     }
// }

// export { register, login };


// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import User from "../models/userSchema.js";

// // -------------------- REGISTER --------------------
// const register = async (req, res) => {
//     try {
//         const { fullName, email, password } = req.body;

//         if (!fullName || !email || !password) {
//             return res.status(400).json({ message: "All fields are required" });
//         }

//         // Check if user already exists
//         const userExists = await User.findOne({ email });
//         if (userExists) {
//             return res.status(400).json({ message: "User already exists" });
//         }

//         // Hash password
//         const hashedPassword = await bcrypt.hash(password, 10);

//         // Create new user
//         const newUser = await User.create({
//             fullName,
//             email,
//             password: hashedPassword,
//         });

//         return res.status(201).json({
//             message: "User registered successfully",
//             user: {
//                 id: newUser._id,
//                 fullName: newUser.fullName,
//                 email: newUser.email,
//             },
//         });
//     } catch (error) {
//         console.error("Error during registration:", error);
//         return res.status(500).json({ message: "Internal server error" });
//     }
// };

// // -------------------- LOGIN --------------------
// const login = async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(400).json({ message: "Invalid email or password" });
//         }

//         const passwordMatch = await bcrypt.compare(password, user.password);
//         if (!passwordMatch) {
//             return res.status(400).json({ message: "Invalid email or password" });
//         }

//         // Generate JWT token
//         const token = jwt.sign(
//             { id: user._id, isAdmin: user.isAdmin },
//             process.env.JWT_SECRET,
//             { expiresIn: "7d" }
//         );

//         return res.status(200).json({
//             message: "Login successful",
//             token,
//             user: {
//                 id: user._id,
//                 fullName: user.fullName,
//                 email: user.email,
//                 isAdmin: user.isAdmin,
//             },
//         });
//     } catch (error) {
//         console.error("Error during login:", error);
//         return res.status(500).json({ message: "Internal server error" });
//     }
// };

// export { register, login };


>>>>>>> 1d3ff7e24b59e7e4f9ffbd19ca6f0b7b76c411b0
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userSchema.js";

// -------------------- REGISTER --------------------
const register = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;
        if (!fullName || !email || !password)
            return res.status(400).json({ message: "All fields are required" });

        const userExists = await User.findOne({ email });
        if (userExists)
            return res.status(400).json({ message: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            fullName,
            email,
            password: hashedPassword,
        });

        return res.status(201).json({
            message: "User registered successfully",
            user: {
                id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                isAdmin: newUser.isAdmin,
            },
        });
    } catch (error) {
        console.error("Error during registration:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// -------------------- LOGIN --------------------
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user)
            return res.status(400).json({ message: "Invalid email or password" });

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch)
            return res.status(400).json({ message: "Invalid email or password" });

        const token = jwt.sign(
            { id: user._id, isAdmin: user.isAdmin },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        return res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                isAdmin: user.isAdmin,
            },
        });
    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// -------------------- UPDATE PROFILE --------------------
const updateProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user) return res.status(404).json({ message: "User not found" });

        const { fullName, email } = req.body;
        user.fullName = fullName || user.fullName;
        user.email = email || user.email;

        const updatedUser = await user.save();

        return res.status(200).json({
            message: "Profile updated successfully",
            user: {
                id: updatedUser._id,
                fullName: updatedUser.fullName,
                email: updatedUser.email,
                isAdmin: updatedUser.isAdmin,
            },
        });
    } catch (error) {
        console.error("Error updating profile:", error);
        return res.status(500).json({ message: "Failed to update profile" });
    }
};

// -------------------- CHANGE PASSWORD --------------------
const changePassword = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user) return res.status(404).json({ message: "User not found" });

        const { currentPassword, newPassword } = req.body;
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch)
            return res.status(400).json({ message: "Current password is incorrect" });

        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();

        return res.status(200).json({ message: "Password changed successfully" });
    } catch (error) {
        console.error("Error changing password:", error);
        return res.status(500).json({ message: "Failed to change password" });
    }
};

export { register, login, updateProfile, changePassword };
