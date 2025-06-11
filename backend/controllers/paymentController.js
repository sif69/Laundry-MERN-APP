import Order from "../models/orderModel.js";
import SSLCommerzPayment from "sslcommerz-lts";
import userModel from "../models/userModel.js";

// const store_id = process.env.SSLCOMMERZ_STORE_ID;
// const store_passwd = process.env.SSLCOMMERZ_STORE_PASS;
// const is_live = false; // true for live
console.log("initiatePayment called");
export const initiatePayment = async (req, res) => {
  try {
    const store_id = process.env.SSLCOMMERZ_STORE_ID;
    const store_passwd = process.env.SSLCOMMERZ_STORE_PASS;
    const is_live = false; // true for live
    const { cart, address, amount } = req.body;
    const user = await userModel.findById(req.user._id);
    const tran_id = "ORDER_" + Date.now();

    // Save order as pending
    const order = await new Order({
      user: req.user._id,
      services: cart.map((item) => ({
        service: item._id,
        quantity: item.quantity,
        purchaseDate: item.purchaseDate,
      })),
      amount,
      address,
      tran_id,
      paymentStatus: "pending",
      orderStatus: "received",
    }).save();

   const data = {
  total_amount: amount,
  currency: "BDT",
  tran_id,
  success_url: `${process.env.BASE_URL}/api/v1/payment/success`,
  fail_url: `${process.env.BASE_URL}/api/v1/payment/fail`,
  cancel_url: `${process.env.BASE_URL}/api/v1/payment/cancel`,
  ipn_url: `${process.env.BASE_URL}/api/v1/payment/ipn`, // Add this if you want IPN notifications
  shipping_method: "Courier",
  product_name: "Laundry Service",
  product_category: "Laundry",
  product_profile: "general",
  cus_name: user.name,
  cus_email: user.email,
  cus_add1: user.address,
  cus_add2: user.address || "N/A",
  cus_city: "Dhaka",
  cus_state: "Dhaka",
  cus_postcode: "1000",
  cus_country: "Bangladesh",
  cus_phone: user.phone || "01711111111",
  cus_fax: user.phone || "01711111111",
  ship_name: user.name,
  ship_add1: user.address,
  ship_add2: user.address || "N/A",
  ship_city: "Dhaka",
  ship_state: "Dhaka",
  ship_postcode: "1000",
  ship_country: "Bangladesh",
};
    // console.log("store_id:", store_id, "store_passwd:", store_passwd);
    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
    const apiResponse = await sslcz.init(data);
    console.log(apiResponse); // Debug: log the full response

    if (apiResponse.status === "SUCCESS" && apiResponse.GatewayPageURL) {
      res.json({ paymentUrl: apiResponse.GatewayPageURL, orderId: order._id });
    } else {
      console.log("SSLCommerz Error:", apiResponse);
      res
        .status(500)
        .json({
          success: false,
          error: apiResponse.failedreason || "SSLCommerz init failed",
        });
    }
  } catch (err) {
    console.log("SSLCommerz Exception:", err);
    res.status(500).json({ success: false, error: "SSLCommerz init failed" });
  }
};

export const paymentSuccess = async (req, res) => {
  try {
    const { tran_id } = req.body;
    const order = await Order.findOneAndUpdate(
      { tran_id },
      {
        paymentStatus: "paid",
        orderStatus: "Clothes Not Received",
        paymentDetails: req.body,
      },
      { new: true }
    );
    // Redirect with orderId as query param
    res.redirect(`${process.env.FRONTEND_URL}/payment-success?orderId=${order._id}`);
  } catch (error) {
    res.redirect(`${process.env.FRONTEND_URL}/payment-fail`);
  }
};

export const paymentFail = async (req, res) => {
  try {
    const { tran_id } = req.body;
    await Order.findOneAndUpdate(
      { tran_id },
      {
        paymentStatus: "failed",
        orderStatus: "not delivered",
        paymentDetails: req.body,
      }
    );
    res.redirect(`${process.env.FRONTEND_URL}/payment-fail`);
  } catch (error) {
    res.redirect(`${process.env.FRONTEND_URL}/payment-fail`);
  }
};

export const paymentCancel = async (req, res) => {
  try {
    const { tran_id } = req.body;
    await Order.findOneAndDelete({ tran_id }); // This removes the order from MongoDB
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false });
  }
};
