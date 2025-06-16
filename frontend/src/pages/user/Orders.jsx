import React, { useEffect, useState } from "react";
import UserMenu from "../../components/Layout/UserMenu";
import AdminMenu from "../../components/Layout/AdminMenu";
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
        if (auth?.user?.role === 2)
          url = "/api/v1/order/all";
        if (auth?.user?.role === 1)
          url = "/admin/all";
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

  const handleStatusChange = async (orderId, status) => {
    try {
      await axios.put(
        `/api/v1/order/status/${orderId}`,
        { orderStatus: status },
        { headers: { Authorization: auth.token } }
      );
      let url = "/api/v1/order";
      if (auth?.user?.role === 1 || auth?.user?.role === 2)
        url = "/api/v1/order/all";
      const { data } = await axios.get(url, {
        headers: { Authorization: auth.token },
      });
      setOrders(data.orders || []);
    } catch (error) {
      console.log(error);
    }
  };

  const getStatusBadge = (status) => {
    if (status.includes("not received")) {
      return <span className="badge bg-danger">{status}</span>;
    } else if (status.includes("received")) {
      return <span className="badge bg-warning text-dark">{status}</span>;
    } else if (status.includes("Servicing")) {
      return <span className="badge bg-info text-dark">{status}</span>;
    } else if (status.includes("delivered")) {
      return <span className="badge bg-success">{status}</span>;
    }
    return <span className="badge bg-secondary">{status}</span>;
  };

  return (
    <Layout title={"Your Orders"}>
      <div className="container-fluid p-3 m-3">
        <div className="row">
          <div className="col-md-3">
            {auth?.user?.role === 1 ? <AdminMenu /> : <UserMenu />}
          </div>
          <div className="col-md-9">
            <h1 style={{ fontWeight: 700, color: "#2c3e50" }}>All Orders</h1>
            {orders.length === 0 && <p>No orders found.</p>}

            {auth?.user?.role === 1 || auth?.user?.role === 2 ? (
              <div className="table-responsive">
                <table className="table table-bordered table-hover align-middle">
                  <thead className="table-dark">
                    <tr>
                      <th>Users</th>
                      <th>Order Date</th>
                      <th>Services</th>
                      <th>Amount</th>
                      <th>Status</th>
                      {auth?.user?.role === 2 && <th>Change Status</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order._id}>
                        <td>
                          <strong>{order.user?.name}</strong> <br />
                          <small>{order.user?.email}</small> <br />
                          <small>{order.user?.address}</small>
                        </td>
                        <td>{new Date(order.createdAt).toLocaleString()}</td>
                        <td>
                          {order.services.map((s, i) => (
                            <div key={i}>
                              {s.service?.name} × {s.quantity}
                            </div>
                          ))}
                        </td>
                        <td>{order.amount} BDT</td>
                        <td>{getStatusBadge(order.orderStatus)}</td>
                        {auth?.user?.role === 2 && (
                          <td>
                            <select
                              className="form-select"
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
                              <option value="In Servicing 👨‍🔧">
                                Servicing
                              </option>
                              <option value="delivered 🚚📦🛵">Delivered</option>
                            </select>
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              orders.map((order) => (
                <div
                  className="card mb-4 shadow-sm"
                  key={order._id}
                  style={{
                    maxWidth: "650px",
                    margin: "0 auto",
                    borderRadius: "16px",
                    background: "#f8f9fa",
                  }}
                >
                  <div className="card-body">
                    <h5
                      style={{
                        color: "#2d3436",
                        fontWeight: "bold",
                        fontSize: "1.1rem",
                      }}
                    >
                      🧾 Order ID: {order._id}
                    </h5>
                    <p>
                      <strong>Status:</strong>{" "}
                      {getStatusBadge(order.orderStatus)}
                    </p>
                    <p>
                      <strong>Payment:</strong>{" "}
                      <span className="text-success">
                        {order.paymentStatus}
                      </span>
                    </p>
                    <p>
                      <strong>Transaction ID:</strong> {order.tran_id}
                    </p>
                    <p>
                      <strong>Order Date:</strong>{" "}
                      {new Date(order.createdAt).toLocaleString()}
                    </p>
                    <ul className="mb-2">
                      {order.services.map((item, idx) => (
                        <li key={idx} className="mb-1">
                          <strong>{item.service?.name}</strong> ×{" "}
                          <span className="text-primary">{item.quantity}</span>{" "}
                          —{" "}
                          <span className="text-success">
                            {item.service?.price} BDT
                          </span>
                        </li>
                      ))}
                    </ul>
                    <p style={{ fontWeight: 600, color: "#d35400" }}>
                      💰 Total: {order.amount} BDT
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
