import User from '../models/User.js';
import jwt from "jsonwebtoken";

// Authentication Middleware
const jwtVerifyMiddlewar = async (req, res, next) => {
    const jwtToken = req.headers?.authorization?.split(" ")[1];

    if (!jwtToken) {
        return res.status(401).json({
            success: false,
            message: "Token is missing", 
        });
    }

    try {
        const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);

       
        const user = await User.findById(decoded.id).select("-password");
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized: user not found",
            });
        }

        req.user = user; //  Attach full user object
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid JWT token",
        });
    }
};

// Authorization Middleware
const checkRoleMiddlewar = (requiredRole) => {
    return (req, res, next) => {
        const userRole = req?.user?.role;
        const method = req.method;
        const path = req.path;

        console.log("User Role:", userRole);
        console.log("Method:", method);
        console.log("Path:", path);

        if (userRole !== requiredRole) {
            return res.status(403).json({
                success: false,
                message: "Access denied. Insufficient permissions.",
            });
        }

        next();
    };
};

export {
    jwtVerifyMiddlewar,
    checkRoleMiddlewar
};
