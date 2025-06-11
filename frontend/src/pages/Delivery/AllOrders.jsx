import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import DeliveryMenu from "../../components/Layout/DeliveryMenu";
import axios from "axios";
// import { useAuth } from "../../context/auth";

const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  //   const [auth] = useAuth();

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/order/all");
      setOrders(data.orders);
    } catch (error) {
      console.log(error);
    }
  };

  const handleStatusChange = async (orderId, status) => {
    try {
      await axios.put(`/api/v1/order/status/${orderId}`, {
        orderStatus: status,
      });
      fetchOrders();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrders();
    // eslint-disable-next-line
  }, []);

  return (
    <Layout title="All Orders - Delivery">
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <DeliveryMenu />
          </div>
          <div className="col-md-9">
            <h2>All Orders</h2>
            <table className="table">
              <thead>
                <tr>
                  <th>User</th>
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
                        <option value="Clothes not received">
                          Not Received
                        </option>
                        <option value="Clothes received">Received</option>
                        <option value="In Servicing">Servicing</option>
                        <option value="delivered">Delivered</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AllOrders;
