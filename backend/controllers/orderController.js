import Order from "../models/orderModel.js";
import userModel from "../models/userModel.js";
export const getOrderByIdController = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId).populate("services.service");
    res.json({ order });
  } catch (error) {
    res.status(500).json({ error: "Order not found" });
  }
};

export const getUserOrdersController = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate("services.service")
      .sort({ createdAt: -1 });
    res.json({ orders });
  } catch (error) {
    res.status(500).json({ error: "Could not fetch orders" });
  }
};

// Get all orders (for delivery men)
export const getAllOrdersController = async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate("user", "name email address")
      .populate("services.service");
    res.json({ orders });
  } catch (error) {
    res.status(500).json({ error: "Could not fetch all orders" });
  }
};

// Update order status
export const updateOrderStatusController = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { orderStatus } = req.body;
    const order = await Order.findByIdAndUpdate(
      orderId,
      { orderStatus },
      { new: true }
    );
    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ error: "Could not update order status" });
  }
};