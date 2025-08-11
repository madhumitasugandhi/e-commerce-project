import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import session from "express-session";
dotenv.config();
import { 
    jwtVerifyMiddleware,
     checkRoleMiddleware 
    } from './middlewares/auth.js'

//User Controllers
import { postSignup, postLogin } from './controllers/user.js';

//Product Controllers
import { postProducts, getProducts } from './controllers/product.js';

//Order Controllers
import { postOrders, putOrders, getOrderById, getOrdersByUserId} from './controllers/order.js'

//Payment Controllers
import { postPayments} from './controllers/payment.js'

// Utils -- responder function work as black box to send response
import { responder } from './utils/utils.js';
import { Cookie } from 'express-session';

const app = express();
app.use(express.json());
app.use(cors(
    {
     origin: ["http://localhost:5174", "https://e-commerce-project-xi-plum.vercel.app"],
    credentials: true,
    }
));
app.use(session({secret: "test session", cookie:{maxAge:1000 * 60 * 60, httpOnly: false, secure: false}, resave : true,  saveUninitialized : true} ));

const connectDB = async () => {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    if (conn) {
        console.log(`MongoDB connected Successfully`);
    }
};

// Basic API
app.get("/health",(req, res) => {
    return responder(res, true, "Server is running");
});


//API for E-commerce application

//Auth
app.post("/signup", postSignup);
app.post("/login", postLogin);

//Product
app.post("/products", jwtVerifyMiddleware, checkRoleMiddleware, postProducts);
app.get("/products", getProducts)

//Orders
app.post("/api/orders", jwtVerifyMiddleware, postOrders);
app.put("/api/orders/:id", jwtVerifyMiddleware, putOrders);
app.get("/api/orders/:id", jwtVerifyMiddleware, getOrderById);
app.get("/api/orders/user/:id", jwtVerifyMiddleware, getOrdersByUserId);

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