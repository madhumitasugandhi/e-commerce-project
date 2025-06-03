import Order from "../models/Order.js";

const postOrders = async (req, res) => {
    const {
        products,
        deliveryAddress,
        phone,
        paymentMode
    } = req.body;

    // Basic validation
    if (!products || !deliveryAddress || !phone || !paymentMode) {
        return res.status(400).json({
            success: false,
            message: `products, deliveryAddress, phone, and paymentMode are required`,
        });
    }

    // Calculate total bill
    let totalBills = 0;
    products.forEach(product => {
        totalBills += product.price * product.quantity;
    });

    try {
        // Ensure req.user is available from auth middleware
        if (!req.user || !req.user._id) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized: user not found in request",
            });
        }

        const newOrder = new Order({
            userId: req.user._id,
            products,
            deliveryAddress,
            phone,
            paymentMode,
            totalBills,  // Use plural if your schema expects it
        });

        const savedOrder = await newOrder.save();

        return res.status(200).json({
            success: true,
            message: "Order placed successfully.",
            data: savedOrder
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

const putOrders = async (req, res) => {
    console.log(req.user);
    console.log(user);
    const { id } = req.params;

    let order;

    try {
        order = await Order.findById(id);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found",
            });
        }
    }
    catch (error) {
        return req.status(400).json({ success: false, message: error.message });
    }

    if (user.role == "user" && order.userId != user._id) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }

    if (user.role == "user") {
        return res.status(401).json({
            success: false,
            message: "You are not auhthorized to update status",
        });
    }

    if (user.role == "user") {

        if (order.status == "delivered") {
            return res.status(400).json({
                success: false,
                message: "Order has already been delivered",
            });
        }
        if (req.body.status == "cancelled") {
            order.status = "cancelled";
        }
    }
    if (req.body.phone == "returned") {
        order.phone = req.body.phone;
    }

    if (user.role == "admin") {
        order.status = req.body.status;
        order.timeline = req.body.timeline;

    }

    await order.save();

    const updatedorder = await Order.findById(id);

    return res.json({
        success: true,
        message: "Order updated successfully",
    });
};

export { postOrders, putOrders };
