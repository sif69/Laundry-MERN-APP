// import React, { useEffect, useState } from "react";
// import AdminMenu from "../../components/Layout/AdminMenu";
// import Layout from "./../../components/Layout/Layout";
// import axios from "axios";

// const Users = () => {
//   const [users, setUsers] = useState([]);
//   const [orders, setOrders] = useState([]);

//   // Fetch all users
//   const fetchUsers = async () => {
//     try {
//       const { data } = await axios.get("/api/v1/auth/all");
//       setUsers(data.users);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // Fetch all orders (admin route)
//   const fetchOrders = async () => {
//     try {
//       const { data } = await axios.get("/api/v1/order/admin/all");
//       setOrders(data.orders);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//     fetchOrders();
//   }, []);

//   // Helper to get orders for a user
//  const getUserOrders = (userId) =>
//   orders.filter(
//     (order) =>
//       String(order.user?._id || order.user) === String(userId)
//   );

//   return (
//     <Layout title={"Dashboard - All Users"}>
//       <div className="container-fluid m-3 p-3">
//         <div className="row">
//           <div className="col-md-3">
//             <AdminMenu />
//           </div>
//           <div className="col-md-9">
//             <h1>All Customers</h1>
//             <div className="table-responsive">
//               <table className="table table-bordered">
//                 <thead>
//                   <tr>
//                     <th>Name</th>
//                     <th>Email</th>
//                     <th>Address</th>
//                     {/* <th>Orders</th> */}
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {users
//                     .filter((user) => user.role !== 1) // Exclude admin (assuming role: 1 is admin)
//                     .map((user) => {
//                       const userOrders = getUserOrders(user._id);
//                       return (
//                         <tr key={user._id}>
//                           <td>{user.name}</td>
//                           <td>{user.email}</td>
//                           <td>{user.address}</td>
//                           {/* <td>
//                             {userOrders.length === 0 ? (
//                               <span className="text-muted">No orders</span>
//                             ) : (
//                               <ul className="list-unstyled mb-0">
//                                 {userOrders.map((order) => (
//                                   <li key={order._id} className="mb-2">
//                                     <strong>Status:</strong> {order.orderStatus} <br />
//                                     <strong>Services:</strong>{" "}
//                                     {order.services
//                                       .map(
//                                         (s) =>
//                                           `${s.service?.name || "Service"} x${s.quantity}`
//                                       )
//                                       .join(", ")}
//                                   </li>
//                                 ))}
//                               </ul>
//                             )}
//                           </td> */}
//                         </tr>
//                       );
//                     })}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default Users;


import React, { useEffect, useState } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
import axios from "axios";

const Users = () => {
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        let url = "/api/v1/order";
        if (auth?.user?.role === 1) url = "/api/v1/order/admin/all";
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
        `/api/v1/order/status/admin/${orderId}`,
        { orderStatus: status },
        { headers: { Authorization: auth.token } }
      );
      let url = "/api/v1/order";
      if (auth?.user?.role === 1) url = "/api/v1/order/admin/all";
      const { data } = await axios.get(url, {
        headers: { Authorization: auth.token },
      });
      setOrders(data.orders || []);
    } catch (error) {
      console.log(error);
    }
  };

  const getStatusBadge = (status) => {
   if (status.includes("servicing")) {
      return <span className="badge bg-warning text-dark">{status}</span>;
    } else if (status.includes("received")) {
      return <span className="badge bg-warning text-dark">{status}</span>;
    }

    return <span className="badge bg-secondary">{status}</span>;
  };

  return (
    <Layout title={"Your Orders"}>
      <div className="container-fluid p-3 m-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1 style={{ fontWeight: 700, color: "#2c3e50" }}>All Orders</h1>
            {orders.length === 0 && <p>No orders found.</p>}

            {auth?.user?.role === 1 ? (
              <div className="table-responsive">
                <table className="table table-bordered table-hover align-middle">
                  <thead className="table-dark">
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
                        <td>
                          <select
                            className="form-select"
                            value={order.orderStatus}
                            onChange={(e) =>
                              handleStatusChange(order._id, e.target.value)
                            }
                          >
                            
                             <option value="Clothes received 👕✅😊">
                               Received
                             </option> 
                             
                            <option value="In Servicing 👨‍🔧">
                              Servicing
                            </option>
                            {/* <option value="delivered 🚚📦🛵">Delivered</option> */}
                          </select>
                        </td>
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
                      <strong>Status:</strong> {getStatusBadge(order.orderStatus)}
                    </p>
                    <p>
                      <strong>Payment:</strong>{" "}
                      <span className="text-success">{order.paymentStatus}</span>
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
                          <span className="text-primary">{item.quantity}</span> —{" "}
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

export default Users;
