import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import "./style.css";

export default function Payment({ SignupData, CheckLogin, AddressData, cartItems, addToOrders, DeleteAll }) {
  const navigate = useNavigate();
  const [selectedAddressId, setSelectedAddressId] = useState(null);  
  const [addressConfirmed, setAddressConfirmed] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showConfirm1, setShowConfirm1] = useState(false);
  const [Message, setMessage] = useState('');

  const user = SignupData.find((u) => String(u._id) === String(CheckLogin));
  
  if (!SignupData || SignupData.length === 0) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="text-muted">⏳ Loading...</div>
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
          <button className="btn btn-outline-success btn-sm" onClick={handleLogin}>Login</button>
        </div>
      </div>
    );
  }

  const handleAddressSelect = (_id) => {
    setSelectedAddressId(_id);  
    setAddressConfirmed(true);
  };

  const onEdit = (_id) => {
    navigate('/address', { state: { editIndex: _id, from: 'payment' } });
  };

  const onPlace = () => {
    addToOrders(cartItems, AddressData.find(addr => addr._id === selectedAddressId)); 
    DeleteAll();
    navigate('/orders');
  };

  const selectedAddressObj = AddressData.find(addr => addr._id === selectedAddressId);  

  return (
    <div className="container py-4">
      <Link to="/cart" className="btn btn-outline-primary mb-3">← Back To Cart</Link>
      <h2 className="mb-4">Payment Page</h2>

      <div className="row">
        <div className="col-lg-7 col-md-12 mb-4">
          <div className="step-header">
            <span className="step-number">1</span> DELIVERY ADDRESS
          </div>

          {AddressData.filter(addr => addr.loginId === CheckLogin).length > 0 ? (
            addressConfirmed && selectedAddressObj ? (
              <div className="card p-3">
                <div className="d-flex justify-content-between align-items-center flex-wrap">
                  <div>
                    <span>{selectedAddressObj.addressType}</span> &nbsp;
                    <b>{selectedAddressObj.name}</b> &nbsp;
                    {selectedAddressObj.phone}
                  </div>
                  <button
                    className="btn btn-sm btn-outline-primary mt-2 mt-lg-0"
                    onClick={() => setAddressConfirmed(false)}
                  >
                    CHANGE
                  </button>
                </div>
                <div className="mt-2">
                  {selectedAddressObj.address}, {selectedAddressObj.city}, {selectedAddressObj.state} - <b>{selectedAddressObj.pincode}</b>
                </div>
              </div>
            ) : (
              AddressData.filter(addr => addr.loginId === CheckLogin).map((address) => (
                <div key={address._id} className="card p-3 mb-3">
                  <div className="d-flex justify-content-between align-items-center flex-wrap">
                    <div>
                      <span>{address.addressType}</span> &nbsp;
                      <b>{address.name}</b> &nbsp;
                      {address.phone}
                    </div>
                    <button
                      className="btn btn-sm btn-outline-primary mt-2 mt-lg-0"
                      onClick={() => onEdit(address._id)}
                    >
                      EDIT
                    </button>
                  </div>
                  <div className="mt-2">
                    {address.address}, {address.city}, {address.state} - <b>{address.pincode}</b>
                  </div>
                  <button
                    className={`btn btn-sm mt-3 ${selectedAddressId === address._id ? 'btn-success' : 'btn-outline-primary'}`} 
                    style={{ transition: 'all 0.3s', borderWidth: '1.5px' }}
                    onClick={() => handleAddressSelect(address._id)} 
                  >
                    {selectedAddressId === address._id ? '✓ Selected' : 'DELIVER HERE'}
                  </button>
                </div>
              ))
            )
          ) : (
            <div>No address found.</div>
          )}

          <div
            className="text-primary mt-2"
            style={{ cursor: 'pointer' }}
            onClick={() => navigate('/address')}
          >
            + Add a new address
          </div>
        </div>

        {addressConfirmed && selectedAddressObj && (
          <div className="col-lg-5 col-md-12">
            <div className="card p-3">
              <div className="step-header"><span className="step-number">2</span> ORDER SUMMARY</div>

              {cartItems.filter(item => item.loginId === CheckLogin).length === 0 ? (
                <p className="text-muted">Your Cart Is Empty.😓</p>
              ) : (
                cartItems.filter(item => item.loginId === CheckLogin).map((item) => (
                  <div key={item._id} className="d-flex flex-nowrap align-items-center border-bottom py-2">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="img-fluid"
                      style={{
                        width: '60px',
                        height: '60px',
                        objectFit: 'cover',
                        marginRight: '15px'
                      }}
                    />
                    <div className="flex-grow-1">
                      <div><b>{item.pname}</b></div>
                      <div>
                        <span style={{ textDecoration: 'line-through', color: 'gray' }}>
                          ₹{item.oldPrice}
                        </span> &nbsp;
                        <span className="fw-bold" style={{ color: 'green' }}>₹{item.price}</span>
                      </div>
                      <div>Qty: {item.quantity}</div>
                    </div>
                    <div className="ms-auto">Total: ₹{item.price * item.quantity}</div>
                  </div>
                ))
              )}

              <button
                className="btn btn-warning w-100 mt-3"
                style={{ backgroundColor: '#ffc107', border: 'none' }}
                onClick={() => setShowConfirm(true)}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#ffc107'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = '#ffc107'}
              >
                Continue
              </button>
            </div>
          </div>
        )}
      </div>

      {showConfirm && (
        <div className="modal d-block text-center" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content p-4">
              <p>Are you sure you want to place this order?</p>
              <div>
                <button className="btn btn-success me-3" onClick={() => {
                  setShowConfirm(false);
                  setShowConfirm1(true);
                  setMessage("Order Placed Successfully! 🎉");
                }}>Yes</button>
                <button className="btn btn-danger ml-3" onClick={() => setShowConfirm(false)}>No</button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showConfirm1 && (
        <div className="modal d-block text-center" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content p-4">
              <p>{Message}</p>
              <div>
                <button className="btn btn-primary" onClick={onPlace}>OK</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
