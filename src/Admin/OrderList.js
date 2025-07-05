import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function OrderList({SignupData,CheckLogin}) {
      const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [visibleOrderId, setVisibleOrderId] = useState(null);


  useEffect(() => {
    axios.get("http://localhost:5000/api/order").then((res) => setOrders(res.data));

    axios.get("http://localhost:5000/api/login").then((res) => {
      const allUsers = res.data.flatMap((doc) => doc.users);
      setUsers(allUsers);
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
  

  const toggleItems = (orderId) => {
    setVisibleOrderId(visibleOrderId === orderId ? null : orderId);
  };

  return (
    <div className="container my-4">
      <h3 className="mb-4">All Orders</h3>
      <table className="table table-bordered table-hover">
        <thead className="table-dark">
          <tr>
            <th>Order ID</th>
            <th>Total Items</th>
            <th>Total Amount</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.sort((a, b) => {
    const dateA = new Date(a.product[0].orderedDate + ' ' + a.product[0].orderedTime);
    const dateB = new Date(b.product[0].orderedDate + ' ' + b.product[0].orderedTime);
    return dateB - dateA;}).map((order) => {
            const totalAmount = order.product.reduce(
              (sum, item) => sum + item.price * item.quantity,
              0
            );

            const user = users.find((u) => u._id === order.loginId);
            const address = order.shippingAddress;

            return (
              <React.Fragment key={order._id}>
                <tr>
                  <td>{order._id}</td>
                  <td>{order.product.reduce((sum, item) => sum + item.quantity, 0)}</td>
                  <td>₹{totalAmount}</td>
                  <td>
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => toggleItems(order._id)}
                    >
                      {visibleOrderId === order._id ? "Hide" : "View"}
                    </button>
                  </td>
                </tr>

                {visibleOrderId === order._id && (
                  <tr>
                    <td colSpan="4">
                      <div className="mb-3">
                          <h5 className="text-muted">Order Details</h5>
  <p>
    <strong>Ordered Date:</strong> {order.product[0].orderedDate || "N/A"}<br />
    <strong>Ordered Time:</strong> {order.product[0].orderedTime || "N/A"}
  </p>
                        <h5 className="text-muted">User Information</h5>
                        <p>
                          <strong>Name:</strong> {address.name || "N/A"} <br />
                          <strong>Phone No.:</strong>{address.phone || "N/A"}<br />
                          <strong>Email:</strong> {user.email || "N/A"}
                        </p>

                        <h5 className="text-muted">Delivery Address</h5>
                        <p className="mb-1"><strong>Type:</strong> {address.addressType}</p>
                        <p><strong>Full Address:</strong> {address.address}</p>
                        <p className="mb-1"><strong>Pincode:</strong> {address.pincode}</p>
                        <p className="mb-1"><strong>City:</strong> {address.city}</p>
                        <p className="mb-1"><strong>State:</strong> {address.state}</p>
                      </div>
                        <h5 className="text-muted">Products Information</h5>
                      <table className="table table-sm table-striped mb-0">
                        <thead className="table-light">
                          <tr>
                            <th>#</th>
                            <th>Product Name</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          {order.product.map((item, index) => (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{item.pname}</td>
                              <td>{item.quantity}</td>
                              <td>₹{item.price}</td>
                              <td>₹{item.price * item.quantity}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
