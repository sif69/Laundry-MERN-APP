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
  const [, setCart] = useCart(); // Remove unused 'cart'

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
    navigate("/dashboard/user/orders");
  };

  return (
    <Layout>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-8 text-center">
            <h2 className="text-success mb-4">Payment Successful!</h2>
            {order ? (
              <>
                <p>Order ID: {order._id}</p>
                <p>Transaction ID: {order.tran_id}</p>
                <p>Amount: ৳{order.amount}</p>
                <button className="btn btn-primary mt-3" onClick={() => navigate("/dashboard/user/orders")}>View Orders</button>
                <button className="btn btn-danger mt-3 ms-2" onClick={handleCancelPayment}>Cancel Payment</button>
              </>
            ) : (
              <p>Loading order details...</p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PaymentSuccess;