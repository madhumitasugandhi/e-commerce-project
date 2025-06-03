import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import {jwtVerifyMiddlewar, checkRoleMiddlewar} from './middlewares/auth.js'

import { postSignup, postLogin } from './controllers/user.js';
import { postProducts } from './controllers/product.js';

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

//Auth
app.post("/signup", postSignup);
app.post("/login", postLogin);
 
//Product
app.post("/products", jwtVerifyMiddlewar, checkRoleMiddlewar("admin"), postProducts);


//page not found API
app.use((req, res) => {
    res.status(404).json({ message: 'API endpoint not found' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});