import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import { jwtVerifyMiddleware, checkRoleMiddleware } from './middlewares/auth.js'

import { postSignup, postLogin } from './controllers/user.js';
import { postProducts, getProducts } from './controllers/product.js';
import { postOrders, putOrders, getOrderById, getOrdersByUserId} from './controllers/order.js'
import { postPayments} from './controllers/payment.js'

import { responder } from './utils/utils.js';

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
    return responder(res, true, "Server is running");
});

//API for E-commerce application

//Auth
app.post("/signup", postSignup);
app.post("/login", postLogin);

//Product
app.post("/products", jwtVerifyMiddleware, checkRoleMiddleware("admin"), postProducts);
app.get("/products", getProducts)

//Orders
app.post("/orders", jwtVerifyMiddleware, postOrders);
app.put("/orders/:id", jwtVerifyMiddleware, putOrders);
app.get("/order/:id", jwtVerifyMiddleware, getOrderById);
app.get("/orders/user/:id", jwtVerifyMiddleware, getOrdersByUserId)

//Payment
app.post("/payments", postPayments)

//page not found API
app.use((req, res) => {
    return responder(res, false,'API endpoint not found', null, 404);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});