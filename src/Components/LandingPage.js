import React from "react";
import { useNavigate } from "react-router-dom";


export default function RoleSelector() {
  const navigate = useNavigate();

  const handleSelect = (role) => {
    if (role === "admin") {
      navigate("/admin/products");
    } else {
      navigate("/products");
    }
  };

  return (
    <div className="vh-100 d-flex justify-content-center align-items-center" >
      <div className="text-center p-5 rounded shadow-lg bg-white" style={{ maxWidth: "400px", width: "100%" }}>
        <h2 className="mb-4 fw-bold text-primary">Welcome to Fllipy</h2>
        <p className="mb-4 text-muted">Please select your role to continue</p>
        <div className="d-grid gap-3">
          <button
            className="btn btn-primary btn-lg"
            onClick={() => handleSelect("admin")}
          >
            I am Admin
          </button>
          <button
            className="btn btn-success btn-lg"
            onClick={() => handleSelect("customer")}
          >
            I am Customer
          </button>
        </div>
      </div>
    </div>
  );
}
