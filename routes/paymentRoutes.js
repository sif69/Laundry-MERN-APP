import express from "express";
import { requireSignIn } from "../middlewares/authMiddleware.js";
import {
  initiatePayment,
  paymentSuccess,
  paymentFail,
  paymentCancel
} from "../controllers/paymentController.js";

const router = express.Router();

router.post("/initiate", requireSignIn, initiatePayment);
router.post("/success", paymentSuccess);
router.post("/fail", paymentFail);
router.post("/cancel", paymentCancel);

export default router;