import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.ObjectId, ref: "users", required: true },
  services: [
    {
      service: { type: mongoose.ObjectId, ref: "Services" },
      quantity: { type: Number, default: 1 },
      purchaseDate: { type: Date, default: Date.now }
    }
  ],
  amount: { type: Number, required: true },
  paymentStatus: { type: String, default: "pending" }, // pending, paid, failed
  orderStatus: { type: String, default: "not received" }, // received, processing, delivered
  address: { type: String, required: true },
  tran_id: { type: String },
  paymentDetails: { type: Object },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Order", orderSchema);