import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function UserList({SignupData,CheckLogin}) {
  const [customer, setUsers] = useState([]);
   const [Address, setAddress] = useState([]);
  const navigate = useNavigate();
    useEffect(() => {
    axios.get("http://localhost:5000/api/login").then((res) => setUsers(res.data));
    axios.get("http://localhost:5000/api/address").then((res) => {
      const allUsers = res.data.flatMap((doc) => doc.addresses);
      setAddress(allUsers);
    });
  }, []);
  
    const handleLogin = () => {
      navigate("../adminlogin");
    };
  const user = SignupData.find((u) => String(u._id) === String(CheckLogin));
  if (!SignupData || SignupData.length === 0) {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="text-muted">⏳ Loading Products...</div>
    </div>
  );
}

    if (!user) {
      return (
         <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="border p-4 rounded shadow text-center" style={{ maxWidth: '400px' }}>
          <h5 className="mb-3">Admin not found or not logged in.</h5>
          <button
            className="btn btn-outline-success btn-sm"
            onClick={handleLogin} 
          >
            Login
          </button>
        </div>
      </div>
      );
    }
 

  
  return (
    <div>
      <h3>Users</h3>
      <table className="table">
        <thead>
          <tr>
            <th>User ID</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
       <tbody>
  {customer.flatMap((userGroup) =>
    userGroup.users.map((user) => {
      const userAddress = Address.find((addr) => addr.loginId === user._id);

      return (
        <tr key={user._id}>
          <td>{user._id}</td>
          <td>{userAddress ? userAddress.name : <span className="text-muted">No Name</span>}</td>
          <td>{user.email}</td>
        </tr>
      );
    })
  )}
</tbody>

      </table>
    </div>
  );
}
