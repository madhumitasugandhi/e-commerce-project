import jwt from "jsonwebtoken";

// ================= Authentication Middleware =================
const jwtVerifyMiddleware = (req, res, next) => {
  let jwtToken = null;

  // 1️⃣ Try from Session
  if (req.session?.jwtToken) {
    jwtToken = req.session.jwtToken;
  }

  // 2️⃣ Try from Authorization header
  if (!jwtToken && req.headers.authorization) {
    const parts = req.headers.authorization.split(" ");
    if (parts.length === 2 && parts[0] === "Bearer") {
      jwtToken = parts[1];
    }
  }

  // 3️⃣ Try from Cookies
  if (!jwtToken && req.cookies?.token) {
    jwtToken = req.cookies.token;
  }

  // ❌ Token missing
  if (!jwtToken) {
    return res.status(401).json({
      success: false,
      message: "Token is missing",
    });
  }

  // ✅ Verify token
  try {
    const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

// ================= Authorization Middleware =================
const checkRoleMiddleware = (req, res, next) => {
  const userRole = req?.user?.role;
  const method = req.method;
  const path = req.path;

  //Only admin can POST to /products
  if (method === "POST" && path === "/products" && userRole !== "admin") {
    return res.status(403).json({
      success: false,
      message: "You are not authorized to perform this action",
    });
  }

  next();
};

export { jwtVerifyMiddleware, checkRoleMiddleware };
