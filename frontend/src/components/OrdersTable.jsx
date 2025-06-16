// components/OrdersTable.jsx

import React from "react";

const OrdersTable = ({ orders, onStatusChange, hideStatusControl }) => {
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
    <div className="table-responsive">
      <table className="table table-bordered table-hover align-middle">
        <thead className="table-dark">
          <tr>
            <th>Users</th>
            <th>Order Date</th>
            <th>Services</th>
            <th>Amount</th>
            <th>Status</th>
            {!hideStatusControl && <th>Change Status</th>}
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
              {!hideStatusControl && (
                <td>
                  <select
                    className="form-select"
                    value={order.orderStatus}
                    onChange={(e) =>
                      onStatusChange(order._id, e.target.value)
                    }
                  >
                    <option value="Clothes not received 👕❌🙁">
                      Not Received
                    </option>
                    <option value="Clothes received 👕✅😊">Received</option>
                    <option value="In Servicing 👨‍🔧">Servicing</option>
                    <option value="delivered 🚚📦🛵">Delivered</option>
                  </select>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersTable;
