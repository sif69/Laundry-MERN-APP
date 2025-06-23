import express from "express";
import dotenv from "dotenv";
import OpenAI from "openai";
import { requireSignIn, isAdmin } from "../middlewares/authMiddleware.js";
import Order from "../models/orderModel.js";
import User from "../models/userModel.js";

const router = express.Router();

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.post("/chatbot", requireSignIn, isAdmin, async (req, res) => {
  const { question } = req.body;

  try {
    const orders = await Order.find().populate("user", "name email");
    const users = await User.find({}, "name email phone");

    const context = `
      Orders: ${JSON.stringify(orders.slice(0, 50))}
      Users: ${JSON.stringify(users.slice(0, 50))}
    `;

    const prompt = `
      You're an AI assistant for a laundry admin. Based on the data below, answer the question.

      ${context}

      Question: ${question}
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You're a helpful assistant for admin dashboard queries.",
        },
        { role: "user", content: prompt },
      ],
    });

    const answer = completion.choices[0].message.content;
    res.json({ answer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ answer: "AI failed to answer." });
  }
});

export default router;
