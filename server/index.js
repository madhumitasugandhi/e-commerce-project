import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import bcrypt from 'bcrypt';

import User from './models/User.js';

const app = express();
app.use(express.json());
app.use(cors());



const connectDB =async ()=> {
const conn = await mongoose.connect(process.env.MONGO_URI);

if(conn){
    console.log(`MongoDB connected Successfully`);
}
};

// Basic API
app.get("/health", (req, res)=>{
    res.status(200).json({
        success : true,
        message: "Server is running",
    })
})

//API for E-commerce application
app.post("/signup", async(req, res)=>{
    const{name, email, phone, address, password, rePassword} = req.body;

    if(!password){
        return res.status(400).json({
            success: false,
            message: "Password is required"
        });
    }
    if(password !== rePassword){
        return res.status(400).json({
            success: false,
            message: "Password dose not match"
        });
    }
    if(!name){
        return res.status(400).json({
            success: false,
            message: "Name is required"
        });
    }
    if(!email){
        return res.status(400).json({
            success: false,
            message: "Email is required"
        });
    }
    if(!phone){
        return res.status(400).json({
            success: false,
            message: "Contact number is required"
        });
    }
    if(!address){
        return res.status(400).json({
            success: false,
            message: "Address is required"
        });
    }

    const salt = bcrypt.genSaltSync(10);

    try{
    const newUser = new User({
        name,
        email,
        phone,
        address,
        password: bcrypt.hashSync(password, salt),
    });

    const savedUser = await newUser.save();

    return res.status(200).json({
        success: true,
        message: "Signup Successful",
        data:savedUser,
    });
}
catch(error){
    return res.status(400).json({
        success: false,
        message: error.message
    });
}
}) 

//page not found API
app.use((req, res) => {
    res.status(404).json({ message: 'API endpoint not found' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});