import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../../axiosConfig";
import { useAuth } from "../../context/auth";
import { useCart } from "../../context/cart";

const PaymentSuccess = () => {
  const [order, setOrder] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [auth] = useAuth();
  const [cart, setCart] = useCart();

  const orderId = new URLSearchParams(location.search).get("orderId");

  useEffect(() => {
    if (orderId && auth?.token) {
      axios
        .get(`/api/v1/order/${orderId}`, {
          headers: { Authorization: auth.token }
        })
        .then((res) => setOrder(res.data.order))
        .catch(() => setOrder(null));
    }
  }, [orderId, auth]);

  // Clear cart only after order is loaded (payment success)
  useEffect(() => {
    if (order) {
      setCart([]);
      localStorage.removeItem("cart");
    }
  }, [order, setCart]);

  // Handle payment cancel
const handleCancelPayment = async () => {
  if (!order?.tran_id) return;
  await axios.post("/api/v1/payment/cancel", { tran_id: order.tran_id });
  setCart([]);
  localStorage.removeItem("cart");
  navigate("/payment-cancel");
};

  return (
    <Layout>
      <div className="container">
        <h2>Payment Successful!</h2>
        <p>Your order has been placed and is being processed.</p>
        <div className="mb-3">
          <button
            className="btn btn-warning me-2"
            onClick={handleCancelPayment}
          >
            Cancel Payment
          </button>
          <span style={{ color: "#e67e22", fontSize: "0.98em" }}>
            (Cancel payment if you want to cancel the order. Your Laundry Basket will also be cleared.)
          </span>
        </div>
        {order ? (
          <div className="mt-4">
            <h4>Order Details</h4>
            <p><b>Order Status:</b> {order.orderStatus}</p>
            <p><b>Payment Status:</b> {order.paymentStatus}</p>
            <p><b>Transaction ID:</b> {order.tran_id}</p>
            <ul>
              {order.services.map((item, idx) => (
                <li key={idx}>
                  {item.service?.name} &times; {item.quantity} — Price: {item.service?.price}
                </li>
              ))}
            </ul>
            <p><b>Total Amount:</b> {order.amount}</p>
          </div>
        ) : (
          <p>Loading order details...</p>
        )}
      </div>
    </Layout>
  );
};

export default PaymentSuccess;