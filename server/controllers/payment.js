import Order from "../models/Order.js";
import Payment from "../models/Payment.js";

const postPayments = async (req, res) => {
    const {
        orderId,
        amount,
        paymentMode,
        status,
        transcationId,
    } = req.body;

    let order;
    try {
        order = await Order.findById(orderId)
    }
    catch (error) {
        return res.status(400).json({
            success: false, message: error.message
        });
    }
    if (!order) {
        return res.status(400).json({
            success: false,
            message: "Order dosen't exist",
        })
    }

    if (
        ["delivered", "cancelled"].includes(order.status.toLowerCase())) {
        return res.status(400).json({
            success: false,
            message: `This order has already been ${order.status}`,
        });
    }
    const payment = new Payment({
        paymentMode,
        amount,
        transcationId,
        status,
    });

    try {
        const savedPayment = await payment.save();

        order.paymentId = savedPayment._id;
        order.paymentMode = paymentMode;

        order.timeline.push({ status: "Payment Completed", date: Date.now() });

        await order.save();

        return res.json({
            success: true,
            message: "Payment Successful",
            data: savedPayment,
        })
    }
    catch (error) {
        return req.status(400).json({
            success: false, message: error.message
        })
    }

}

export { postPayments }