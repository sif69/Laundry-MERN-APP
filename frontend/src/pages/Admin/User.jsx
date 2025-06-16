import React, { useEffect, useState } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/all");
      setUsers(data.users);
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch all orders (admin route)
  const fetchOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/order/admin/all");
      setOrders(data.orders);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchOrders();
  }, []);

  // Helper to get orders for a user
 const getUserOrders = (userId) =>
  orders.filter(
    (order) =>
      String(order.user?._id || order.user) === String(userId)
  );

  return (
    <Layout title={"Dashboard - All Users"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>All Customers</h1>
            <div className="table-responsive">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Contact</th>
                    <th>Address</th>
                    {/* <th>Orders</th> */}
                  </tr>
                </thead>
                <tbody>
                  {users
                    .filter((user) => user.role === 0) // Exclude admin (assuming role: 1 is admin)
                    .map((user) => {
                      const userOrders = getUserOrders(user._id);
                      return (
                        <tr key={user._id}>
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                          <td>{user.phone}</td>
                          <td>{user.address}</td>
                          {/* <td>
                            {userOrders.length === 0 ? (
                              <span className="text-muted">No orders</span>
                            ) : (
                              <ul className="list-unstyled mb-0">
                                {userOrders.map((order) => (
                                  <li key={order._id} className="mb-2">
                                    <strong>Status:</strong> {order.orderStatus} <br />
                                    <strong>Services:</strong>{" "}
                                    {order.services
                                      .map(
                                        (s) =>
                                          `${s.service?.name || "Service"} x${s.quantity}`
                                      )
                                      .join(", ")}
                                  </li>
                                ))}
                              </ul>
                            )}
                          </td> */}
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Users;