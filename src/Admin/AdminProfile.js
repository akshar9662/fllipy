import React from "react";
import { useNavigate, Link } from "react-router-dom";

const Profile = ({ SignupData, CheckLogin,handleLogout }) => {
  const navigate = useNavigate();
if (!SignupData || SignupData.length === 0) {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="text-muted">⏳ Loading User Data...</div>
    </div>
  );
}
  const user = SignupData.find((u) => String(u._id) === String(CheckLogin));

  const handleLogin = () => {
    navigate("../adminlogin");
  };

  if (!user) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="border p-4 rounded shadow text-center" style={{ maxWidth: "400px" }}>
          <h5 className="mb-3">User not found or not logged in.</h5>
          <button className="btn btn-outline-success btn-sm" onClick={handleLogin}>
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container my-3">
      <div className="row justify-content-center mb-4">
        <div className="col-md-8">
          <div className="card shadow-lg rounded-4">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <Link to="../products" className="btn btn-outline-primary">
                  ← Back To Products
                </Link>
                <button className="btn btn-danger" onClick={handleLogout}>
                  Logout
                </button>
              </div>

              <h4 className="text-center mb-4">👤 User Profile</h4>

      
  {SignupData.filter(addr => addr._id === CheckLogin).map((addr, index) => (
    <div
      key={index}
      className="text-start mb-3 p-3 border rounded bg-light"
    >
      <p className="mb-1"><strong>📧 Email:</strong> {addr.email}</p>
    </div>
  ))
}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
