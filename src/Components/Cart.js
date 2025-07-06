import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Cart({SignupData,CheckLogin, cartItems, onDelete, onUpdateQuantity, AddressData }) {
  const navigate = useNavigate();
const user = SignupData.find((u) => String(u._id) === String(CheckLogin));
  
  if (!SignupData || SignupData.length === 0) {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="text-muted">⏳ Loading Your Products...</div>
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
 
  const PlatformFee = 4;
  const TotalItems = cartItems.reduce((sum, item) => sum + item.quantity * item.price, 0);
  const DeliveryCharges = TotalItems >= 999 ? 0 : 40;
  let Discount = TotalItems >= 40000 ? 500 : 0;
  const Total = TotalItems + PlatformFee + DeliveryCharges - Discount;

  const onPlaceOrder = () => {
    if (AddressData.length === 0) {
      navigate('/address');
    } else {
      navigate('/payment');
    }
  };

  return (
    <div className="container my-4">
      <Link to="/products" className="btn btn-outline-primary mb-3">←Back To Products</Link>
      <h2 className="cart-heading mb-4">Shopping Cart</h2>

      {cartItems.filter(item => item.loginId === CheckLogin).length === 0 ? (
        <p className="text-muted">Your Cart Is Empty.😓</p>
      ) : (
        <div className="row">
          <div className="col-12 col-lg-8">
            {cartItems.filter(item => item.loginId === CheckLogin).map((item) => (
              <div key={item._id} className="card mb-3">
                <div className="card-body d-flex flex-column flex-md-row align-items-center">
                  <img src={item.image} alt={item.name} className="img-fluid cart-product-image" style={{ width: '120px', height: 'auto' }} />

                  <div className="ms-md-4 mt-3 mt-md-0 flex-grow-1 w-100">
                    <h5 className="cart-product-name">{item.pname}</h5>
                    <div className="d-flex flex-column flex-sm-row justify-content-center justify-content-md-start align-items-center gap-2">
<span className="old-price">₹{item.oldPrice}</span>

  <span className="fw-bold text-success">₹{item.price}</span>
</div>

                    <div className="mt-2 d-flex align-items-center justify-content-center justify-content-md-start gap-2">
                      <button className="btn btn-outline-primary btn-sm" onClick={() => onUpdateQuantity(item._id, -1)} disabled={item.quantity <= 1}>−</button>
                      <span className="mx-2">{item.quantity}</span>
                      <button className="btn btn-outline-primary btn-sm" onClick={() => onUpdateQuantity(item._id, 1)}>+</button>
                    </div>
                  </div>
                  <div className="cart-total-remove">
  <p className="cart-total">Total: ₹{item.price * item.quantity}</p>
  <button className="btn btn-danger btn-sm" onClick={() => onDelete(item._id)}>Remove</button>
</div>

                </div>
              </div>
            ))}
          </div>

          <div className="col-12 col-lg-4">
            <div className="card">
              <div className="card-body">
                <h4 className="mb-3">Price Details</h4>
                <div className="d-flex justify-content-between mb-2">
                  <span>Items ({cartItems.filter(item => item.loginId === CheckLogin).reduce((sum, item) => sum + item.quantity, 0)})</span>
                   <span>₹{TotalItems}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Platform Fee</span>
                  <span>₹{PlatformFee}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Delivery Charges</span>
                  {DeliveryCharges === 0 ? (<span>₹{DeliveryCharges}</span>):
                  (<span>₹{DeliveryCharges}</span>)}
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Discount</span>
                  {Discount === 0 ? (<span>₹{Discount}</span>):
                  (<span className="text-success">-₹{Discount}</span>)}
                </div>
                <hr />
                <div className="d-flex justify-content-between fw-bold mb-3">
                  <span>Total Amount</span>
                  <span>₹{Total}</span>
                </div>
                <button className="btn btn-primary w-100" onClick={onPlaceOrder}>Place Order</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
