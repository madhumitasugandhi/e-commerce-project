import jwt from "jsonwebtoken";
import pkg from "jsonwebtoken";
const { verify } = pkg;

const jwtVerifyMiddlewar = async(req, res, next)=> {
    const jwtToken = req.headers.authorization.split(" ")[1];

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

export {
    jwtVerifyMiddlewar
}