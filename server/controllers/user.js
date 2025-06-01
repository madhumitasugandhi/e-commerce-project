import bcrypt from 'bcrypt';
import User from './../models/User.js';

const postSignup = async(req, res)=>{
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
        data:{
            name: savedUser.name,
            email: savedUser.email,
            phone: savedUser.phone,
            address: savedUser.address,
        },
    });
}
catch(error){
    return res.status(400).json({
        success: false,
        message: error.message
    });
}
}

export { postSignup };