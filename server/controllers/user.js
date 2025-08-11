import bcrypt from "bcrypt";
import User from "./../models/User.js";
import jwt from "jsonwebtoken";

// ====================== SIGNUP ======================
const postSignup = async (req, res) => {
  const { name, email, phone, address, password, rePassword } = req.body;

  // Validation
  if (!password) {
    return res.status(400).json({ success: false, message: "Password is required" });
  }
  if (password !== rePassword) {
    return res.status(400).json({ success: false, message: "Password does not match" });
  }
  if (!name || !email || !phone || !address) {
    return res.status(400).json({
      success: false,
      message: "Name, Email, Phone and Address are required"
    });
  }

  const salt = bcrypt.genSaltSync(10);

  try {
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
      message: "Signup Successful, please login",
      data: {
        name: savedUser.name,
        email: savedUser.email,
        phone: savedUser.phone,
        address: savedUser.address,
      },
    });
  } catch (error) {
    if (error.message.includes("duplicate key error collection")) {
      return res.status(400).json({
        success: false,
        message: `${Object.keys(error.keyValue)} '${Object.values(error.keyValue)}' already exists`
      });
    }
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// ====================== LOGIN ======================
const postLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and Password are required"
    });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "Please signup first"
    });
  }

  const isPasswordMatch = bcrypt.compareSync(password, user.password);

  const userDetails = {
    name: user.name,
    email: user.email,
    role: user.role,
    _id: user._id,
    phone: user.phone,
    address: user.address,
  };

  if (isPasswordMatch) {
    // ✅ Token with expiry
    const jwtToken = jwt.sign(userDetails, process.env.JWT_SECRET, { expiresIn: "7d" });

    // Set token in header (optional, mostly frontend stores in localStorage)
    res.setHeader("Authorization", `Bearer ${jwtToken}`);

    // Store token in session (optional)
    req.session.jwtToken = jwtToken;

    return res.status(200).json({
      success: true,
      token: jwtToken,
      data: userDetails,
      message: "Login successful"
    });
  } else {
    return res.status(400).json({
      success: false,
      message: "Invalid credentials"
    });
  }
};

export { postSignup, postLogin };
