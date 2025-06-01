import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

import jwt from "jsonwebtoken";

import { postSignup, postLogin } from './controllers/user.js';

const app = express();
app.use(express.json());
app.use(cors());



const connectDB = async () => {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    if (conn) {
        console.log(`MongoDB connected Successfully`);
    }
};

// Basic API
app.get("/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Server is running",
    })
})

//API for E-commerce application
app.post("/signup", postSignup);
app.post("/login", postLogin);

app.get("/test", (req, res) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized",
        });
    }

    const tokenValue = token.split(" ")[1];

    try {
        const decoded = jwt.verify(tokenValue, process.env.JWT_SECRET);

        if (decoded) {
            return res.json({
                success: true,
                message: "Authorized",
                data: decoded,
            });
        }

    } catch (error) {
        res.status(401).json({
            success: false,
            message: "Unauthorized"
        })
    }
});


//page not found API
app.use((req, res) => {
    res.status(404).json({ message: 'API endpoint not found' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});