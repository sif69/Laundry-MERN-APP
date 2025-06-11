import express from "express";
import { requireSignIn,isDelivery } from "../middlewares/authMiddleware.js";

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

router.get("/:orderId", requireSignIn, getOrderByIdController);
router.get("/", requireSignIn, getUserOrdersController);




// Update order status
router.put("/status/:orderId", requireSignIn, isDelivery, updateOrderStatusController);
export default router;
