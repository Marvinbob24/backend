import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: {
        type: String, required: true, trim: true,
    },
    userName: {
        type: String, required: false, trim: true,
    },
    email: {
        type: String, required: true, unique: true, trim: true,
    },
    address: {
        type: String, required: false, trim: true,
    },
    phoneNumber: {
        type: String, required: false, trim: true,
    },
    password: {
        type: String, required: true, trim: true,
    },
    isAdmin: {
        type: Boolean, default: false,
    }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;