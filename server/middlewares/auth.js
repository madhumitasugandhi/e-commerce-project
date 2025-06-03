import jwt from "jsonwebtoken";
import pkg from "jsonwebtoken";
const { verify } = pkg;

//authentication
const jwtVerifyMiddlewar = async(req, res, next)=> {
    const jwtToken = req.headers?.authorization?.split(" ")[1];

    if (!jwtToken){
        return res.status(401).json({
            success: false,
            messange: "Token is missing",
        });
    }

    try{
       const decoded = await jwt.verify(jwtToken,process.env.JWT_SECRET);
       req.user = decoded;
       next();
       
    }
    catch(error){
        return res.status(401).json({
            success: false,
            message: "Invalid JWT token",
        });
    }
}

//authorization
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
}