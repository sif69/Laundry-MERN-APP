import React from 'react';
import { NavLink } from 'react-router-dom';
import Services from './../../pages/Admin/Services';

const AdminMenu = () => {
  return (
    <>
     <div className="text-center">
         <div className="list-group">
        <h4>
        Admin Panel
        </h4>
        <NavLink to="/dashboard/admin/create-category" className="list-group-item list-group-item-action">
          Create Category
        </NavLink>
        <NavLink to="/dashboard/admin/add-service" className="list-group-item list-group-item-action">
          Add New Service
        </NavLink>
         <NavLink
            to="/dashboard/admin/services"
            className="list-group-item list-group-item-action"
          >
            Services
          </NavLink>
        <NavLink to="/dashboard/admin/users" className="list-group-item list-group-item-action">
          Customers
        </NavLink>
        {/* <NavLink to="/dashboard/admin/orders" className="list-group-item list-group-item-action">
          Orders
        </NavLink> */}
       
      </div>
     </div>
    </>
  );
};
export default AdminMenu;