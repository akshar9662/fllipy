import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

const Signup = ({ onSignup }) => {
  const navigate = useNavigate();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

const handleSignup = (e) => {
    e.preventDefault();
  const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
  if (!email || !password) {
    alert("Please fill all fields!");
  } else if (!emailRegex.test(email)) {
    alert("❌ Email must be in lowercase and valid format!");
  } else {
    onSignup({email,password});
    navigate("/login");
  }
};

  return (
    <div className="flip-container d-flex flex-column flex-md-row vh-100">
      <div
        className="d-flex flex-column justify-content-center align-items-center text-white p-4 order-1 order-md-2"
        style={{
          flex: 1,
          background: "linear-gradient(135deg, #6BBF59, #4CAF50)",
        }}
      >
        <h1 className="display-5 fw-bold">Join Fllipy</h1>
        <p className="lead text-center">“Get started with better shopping experience.”</p>
        <img
          src="https://cdn-icons-png.flaticon.com/512/3081/3081559.png"
          alt="Shopping"
          style={{ width: "200px", marginTop: "20px" }}
        />
      </div>

      <div
        className="d-flex justify-content-center align-items-center bg-light order-2 order-md-1"
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
            <h2 className="mb-1">Sign up</h2>
            <p className="mb-0">Create your account to begin shopping</p>
          </div>

          <form onSubmit={handleSignup}>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                name="email"
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
                name="password"
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
              Sign Up
            </button>
          </form>

          <div className="mt-3 text-center" style={{ fontSize: "0.9rem" }}>
            Already have an account?{" "}
            <span
              style={{ color: "#6BBF59", cursor: "pointer" }}
              onClick={() => navigate("/login")}
            >
              Login here
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
