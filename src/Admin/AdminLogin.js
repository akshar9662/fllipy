import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

const Login = ({onAdminlogin}) => {
    const [email, setemail] = useState("");
    const [password,setpassword] = useState("");
      
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      onAdminlogin({email,password});
    } else {
      alert("Please fill all fields!");
    }
  };



  return (
    <div className="flip-container d-flex flex-column flex-md-row vh-100">
      <div
        className="d-none d-md-flex flex-column justify-content-center align-items-center text-white p-4"
        style={{
          flex: 1,
          background: "linear-gradient(135deg, #6BBF59, #4CAF50)",
          color: "#fff",
        }}
      >
        <h1 className="display-5 fw-bold">Welcome to Fllipy</h1>
        <p className="lead text-center">
          “Shop Smart, Live Better.” <br />
          Discover top products with ease!
        </p>
        <img
          src="https://cdn-icons-png.flaticon.com/512/3081/3081559.png"
          alt="Shopping"
          style={{ width: "200px", marginTop: "20px" }}
        />
      </div>

      <div
        className="d-flex justify-content-center align-items-center bg-light"
        style={{ flex: 1, padding: "30px" }}
      >
        <div
          className="p-4 rounded shadow bg-white"
          style={{ minWidth: "320px", width: "100%", maxWidth: "400px" }}
        >
          <div
            className="text-center p-3 mb-3 rounded"
            style={{ backgroundColor: "#6BBF59", color: "white" }}
          >
            <h2 className="mb-1">Sign in</h2>
            <p className="mb-0">Fill out this form to start shopping</p>
          </div>

          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setemail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-outline-success btn-sm w-100"
            >
              Sign In
            </button>
          </form>

          <div className="mt-3 text-center" style={{ fontSize: "0.9rem" }}>
            Not signed up yet?{" "}
            <span
              style={{ color: "#6BBF59", cursor: "pointer", fontWeight: 500 }}
              onClick={() => navigate("../adminsignup")}
            >
              Signup here
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
