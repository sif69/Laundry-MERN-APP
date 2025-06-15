import React, { useEffect, useState } from "react";
import UserMenu from "../../components/Layout/UserMenu";
import Layout from "./../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        let url = "/api/v1/order";
        // If delivery man, fetch all orders
        if (auth?.user?.role === 2) url = "/api/v1/order/all";
        const { data } = await axios.get(url, {
          headers: { Authorization: auth.token },
        });
        setOrders(data.orders || []);
      } catch (error) {
        console.log(error);
      }
    };
    if (auth?.token) fetchOrders();
  }, [auth]);

  // Handler for delivery men to change order status
  const handleStatusChange = async (orderId, status) => {
    try {
      await axios.put(
        `/api/v1/order/status/${orderId}`,
        { orderStatus: status },
        { headers: { Authorization: auth.token } }
      );
      // Refresh orders after status change
      let url = "/api/v1/order";
      if (auth?.user?.role === 2) url = "/api/v1/order/all";
      const { data } = await axios.get(url, {
        headers: { Authorization: auth.token },
      });
      setOrders(data.orders || []);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={"Your Orders"}>
      <div className="container-fluid p-3 m-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h1 style={{ fontWeight: 700, color: "#2c3e50" }}>All Orders</h1>
            {orders.length === 0 && <p>No orders found.</p>}
            {auth?.user?.role === 2 ? (
              // Delivery men: show table with status change
              <table className="table">
                <thead>
                  <tr>
                    <th>Users</th>
                    <th>Order Date</th>
                    <th>Services</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Change Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id}>
                      <td>
                        {order.user?.name} <br />
                        {order.user?.email} <br />
                        {order.user?.address}
                      </td>
                      <td>{new Date(order.createdAt).toLocaleString()}</td>
                      <td>
                        {order.services.map((s, i) => (
                          <div key={i}>
                            {s.service?.name} x {s.quantity}
                          </div>
                        ))}
                      </td>
                      <td>{order.amount}</td>
                      <td>{order.orderStatus}</td>
                      <td>
                        <select
                          value={order.orderStatus}
                          onChange={(e) =>
                            handleStatusChange(order._id, e.target.value)
                          }
                        >
                          <option value="Clothes not received 👕❌🙁">
                            Not Received
                          </option>
                          <option value="Clothes received 👕✅😊">
                            Received
                          </option>
                          <option value="In Servicing 👨‍🔧">Servicing</option>
                          <option value="delivered 🚚📦🛵">Delivered</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              // Normal user: show card view
              orders.map((order) => (
                <div
                  className="card mb-4 shadow-sm"
                  key={order._id}
                  style={{
                    maxWidth: "600px",
                    margin: "0 auto",
                    borderRadius: "16px",
                    border: "1px solid #e1e1e1",
                    background: "#f8fafc",
                  }}
                >
                  <div className="card-body">
                    <h5 style={{ color: "#2980b9", fontWeight: 600 }}>
                      Order ID: {order._id}
                    </h5>
                    <p>
                      <span style={{ color: "#16a085", fontWeight: 500 }}>
                        Status:
                      </span>{" "}
                      <span style={{ color: "#2d3436" }}>
                        {order.orderStatus}
                      </span>
                    </p>
                    <p>
                      <span style={{ color: "#e67e22", fontWeight: 500 }}>
                        Payment:
                      </span>{" "}
                      <span style={{ color: "#2d3436" }}>
                        {order.paymentStatus}
                      </span>
                    </p>
                    <p>
                      <span style={{ color: "#8e44ad", fontWeight: 500 }}>
                        Transaction ID:
                      </span>{" "}
                      <span style={{ color: "#2d3436" }}>{order.tran_id}</span>
                    </p>
                    <p>
                      <span style={{ color: "#636e72", fontWeight: 500 }}>
                        Order Date:
                      </span>{" "}
                      <span style={{ color: "#2d3436" }}>
                        {new Date(order.createdAt).toLocaleString()}
                      </span>
                    </p>
                    <ul style={{ paddingLeft: 18 }}>
                      {order.services.map((item, idx) => (
                        <li
                          key={idx}
                          style={{
                            fontSize: "1.05em",
                            color: "#34495e",
                            marginBottom: 4,
                          }}
                        >
                          <span style={{ fontWeight: 500 }}>
                            {item.service?.name}
                          </span>{" "}
                          &times;{" "}
                          <span style={{ color: "#0984e3" }}>
                            {item.quantity}
                          </span>{" "}
                          — Price:{" "}
                          <span style={{ color: "#00b894" }}>
                            {item.service?.price}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <p style={{ fontWeight: 600, color: "#d35400" }}>
                      Total Amount: {order.amount} BDT
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
