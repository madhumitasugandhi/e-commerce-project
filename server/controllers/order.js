import Order from "../models/Order.js";

import { responder } from "./../utils/utils.js";

const postOrders = async (req, res) => {
  try {
    console.log("JWT user:", req.user); // debug
    console.log("Body received:", req.body); // debug

    if (!req.user || !req.user._id) {
      return responder(res, false, "Unauthorized. User not found.", null, 401);
    }

    const { products, deliveryAddress, phone, paymentMode } = req.body;

    // Check required fields
    if (
      !Array.isArray(products) ||
      products.length === 0 ||
      !deliveryAddress ||
      !phone ||
      !paymentMode
    ) {
      return responder(
        res,
        false,
        "products[], deliveryAddress, phone, and paymentMode are required",
        null,
        400
      );
    }

    // Calculate total bill
    let totalBills = 0;
    products.forEach((product) => {
      if (!product.productId || !product.price || !product.quantity) {
        throw new Error("Each product must have productId, price, and quantity");
      }
      totalBill += product.price * product.quantity;
    });

    // Create and save new order
    const newOrder = new Order({
      userId: req.user._id,
      products,
      totalBills,
      deliveryAddress,
      phone,
      paymentMode,
    });

    const savedOrder = await newOrder.save();

    return responder(res, true, "Order placed successfully", savedOrder, 201);
  } catch (error) {
    console.error("Order placement error:", error.message);
    return responder(res, false, error.message, null, 500);
  }
};

const putOrders = async (req, res) => {
  const user = req.user;
  const { id } = req.params;

  let order;

  try {
    order = await Order.findById(id);

    if (!order) {
      return responder(res, false, "Order not found", null, 404);
    }
  } catch (error) {
    return responder(res, false, error.message, null, 400);
  }

  // user can only update his own order
  if (user.role == "user" && order.userId != user._id) {
    return responder(
      res,
      false,
      "You are not authorized to update this order",
      null,
      401
    );
  }
    // admin can update any order
  if (user.role == "user") {
    if (order.status == "delivered") {
      return responder(
        res,
        false,
        "Order has already been delivered",
        null,
        400
      );
    }

    if (req.body.status == "cancelled") {
      order.status = "cancelled";
    }
  }

  if (req.body.phone) {
    order.phone = req.body.phone;
  }

  if (req.body.deliveryAddress) {
    order.deliveryAddress = req.body.deliveryAddress;
  }

  if (user.role == "admin") {
    order.status = req.body.status;
    order.timeline = req.body.timeline;
  }

  await order.save();

  const updatedOrder = await Order.findById(id);

  return responder(res, true, "Order updated successfully", updatedOrder, 200);
};

const getOrderById = async (req, res) => {
  const user = req.user;
  const { id } = req.params;

  let order;

  try {
    order = await Order.findById(id)
      .populate("userId", "name email")
      .populate(
        "products.productId",
        "-shortDescription -longDescription -image -category -tags -__v -createdAt -updatedAt"
      )
      .populate("paymentId", "-__v -createdAt -updatedAt");

    if (!order) {
      return responder(res, false, "Order not found", null, 404);
    }
  } catch (error) {
    return responder(res, false, error.message, null, 400);
  }

  if (user._id != order.userId && user.role != "admin") {
    return responder(
      res,
      false,
      "You are not authorized to view this order",
      null,
      401
    );
  }

  return responder(res, true, "Order fetched successfully", order, 200);
};

const getOrdersByUserId = async (req, res) => {
  const { id } = req.params;
  const user = req.user;

  if (user.role != "admin" && user._id != id) {
    return responder(
      res,
      false,
      "You are not authorized to view this user's orders",
      null,
      401
    );
  }

  const orders = await Order.find({ userId: id })
    .populate("userId", "name email")
    .populate(
      "products.productId",
      "-shortDescription -longDescription -image -category -tags -__v -createdAt -updatedAt"
    )
    .populate("paymentId", "-__v -createdAt -updatedAt");

  return responder(res, true, "Orders fetched successfully", orders, 200);
};

export { getOrderById, getOrdersByUserId, postOrders, putOrders };