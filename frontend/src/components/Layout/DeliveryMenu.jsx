import React from "react";
import { NavLink } from "react-router-dom";

const DeliveryMenu = () => (
  <div className="text-center">
    <div className="list-group">
      <h4>Delivery Panel</h4>
      <NavLink to="/dashboard/delivery/orders" className="list-group-item list-group-item-action">
        All Orders
      </NavLink>
    </div>
  </div>
);

export default DeliveryMenu;