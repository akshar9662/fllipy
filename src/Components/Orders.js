import React from 'react';
import { Link,useNavigate } from 'react-router-dom';
import './style.css';

export default function Orders({SignupData,CheckLogin, orderItems }) {
   const navigate = useNavigate();
  
  const user = SignupData.find((u) => String(u._id) === String(CheckLogin));
  if (!SignupData || SignupData.length === 0) {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="text-muted">⏳ Loading Your Orders...</div>
    </div>
  );
}
  
    const handleLogin = () => {
      navigate("/login");
    };
  
    if (!user) {
      return (
         <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="border p-4 rounded shadow text-center" style={{ maxWidth: '400px' }}>
          <h5 className="mb-3">User not found or not logged in.</h5>
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
    <div className="container my-4">
      <Link to="/products" className="btn btn-outline-primary mb-3">← Back To Products</Link>
      <h2 className="mb-4">📦 All Ordered Items</h2>

      {orderItems.filter(item => item.loginId === CheckLogin).length === 0 ? (
  <p className="text-muted">No Orders Placed Yet. 😓</p>
) : (
  orderItems.filter(item => item.loginId === CheckLogin).sort((a, b) => {
    const dateA = new Date(a.product[0].orderedDate + ' ' + a.product[0].orderedTime);
    const dateB = new Date(b.product[0].orderedDate + ' ' + b.product[0].orderedTime);
    return dateB - dateA;}).map((order, orderIndex) => (
    order.product.map((item, itemIndex) => (
        <div key={`${orderIndex}-${itemIndex}`} className="card mb-4 shadow-sm">
          <div className="row g-0 align-items-center">
            <div className="col-md-3 text-center">
              <img
                src={item.image}
                alt={item.name}
                className="img-fluid p-2"
                style={{ height: '150px', objectFit: 'cover' }}
              />
            </div>
            <div className="col-md-6">
              <div className="card-body">
                <h5 className="card-title">{item.pname}</h5>
                <p className="card-text mb-1">Old Price: ₹{item.oldPrice}</p>
                <p className="card-text mb-1 fw-bold">Price: ₹{item.price}</p>
                <p className="card-text mb-1">Quantity: {item.quantity}</p>
                <p className="card-text fw-semibold">Total: ₹{item.price * item.quantity}</p>
              </div>
            </div>
            <div className="order-address col-md-3 small p-3">
              <p className="mb-1">📍 {order.shippingAddress.address},</p>
              <p className="mb-1">
                {order.shippingAddress.city}, {order.shippingAddress.state} -{' '}
                {order.shippingAddress.pincode}
              </p>
              <p className="mb-0">🕒 {item.orderedDate} {item.orderedTime}</p>
            </div>
          </div>
        </div>
      ))
    ))
)}
</div>
  );
}
