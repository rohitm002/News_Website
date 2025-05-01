const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(express.json());
const port = 9002;
app.use(cors());


// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/news_website')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));


// User Schema
const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
});

const User = mongoose.model("User", UserSchema);

// Register User
app.post("/register", async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        const newUser = new User({ name, email, password });
        await newUser.save();
        res.status(201).json({ message: "User Registered" });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Login User
app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user || user.password !== password) {
            return res.status(401).json({ message: "Invalid Credentials" });
        }
        res.status(200).json({ message: "Login Successful" });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.delete("/delete-user/:email", async (req, res) => {
    try {
        const { email } = req.params;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Delete user
        await User.deleteOne({ email });
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

app.put("/update-user/:email", async (req, res) => {
    const { email, name, password } = req.body;

    if (!email || !name || !password) {
        return res.status(400).json({ success: false, message: "All fields are required" });
    }

    try {
        const user = await User.findOneAndUpdate(
            { email },
            { name, password },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.json({ success: true, message: "User updated successfully" });
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});


const PORT = process.env.PORT || 5500;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
