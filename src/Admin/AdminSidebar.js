import React from "react";
import { NavLink } from "react-router-dom";

export default function AdminSidebar() {
  return (
    <div className="bg-dark text-white p-3" style={{ Height: "100%", width: "250px" }}>
      <h4 className="mb-4">Admin Panel</h4>
      <NavLink to="/admin/products" className="d-block mb-2 text-white">Products</NavLink>
      <NavLink to="/admin/orders" className="d-block mb-2 text-white">Orders</NavLink>
      <NavLink to="/admin/users" className="d-block mb-2 text-white">Users</NavLink>
      <NavLink to="/admin/profile" className="d-block text-white">Profile</NavLink>
    </div>
  );
}
