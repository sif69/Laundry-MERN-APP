import express from "express";

import { requireSignIn, isDelivery, isAdmin} from "../middlewares/authMiddleware.js";



import {
  getOrderByIdController,
  getUserOrdersController,
  getAllOrdersController,
  updateOrderStatusController,
} from "../controllers/orderController.js";
const router = express.Router();

// for delivery men 
// / Get all orders (delivery men)
router.get("/all", requireSignIn, isDelivery, getAllOrdersController);

// for admin
// router.get("/all", requireSignIn, isAdmin, getAllOrdersController);
router.get("/:orderId", requireSignIn, getOrderByIdController);
router.get("/", requireSignIn, getUserOrdersController);

// For admin: Get all orders
router.get("/admin/all", requireSignIn, isAdmin, getAllOrdersController);

// Update order status [Delivery]
router.put("/status/:orderId", requireSignIn, isDelivery, updateOrderStatusController);

// update order status [Admin]

router.put("/status/admin/:orderId", requireSignIn, isAdmin, updateOrderStatusController);


export default router;