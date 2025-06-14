import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import "./style.css";

export default function Payment({ AddressData, cartItems, addToOrders, DeleteAll }) {
  const navigate = useNavigate();
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [addressConfirmed, setAddressConfirmed] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showConfirm1, setShowConfirm1] = useState(false);
  const [Message, setMessage] = useState('');

  const handleAddressSelect = (index) => {
    setSelectedAddress(index);
    setAddressConfirmed(true);
  };

  const onEdit = (index) => {
    navigate('/address', { state: { editIndex: index, from: 'payment' } });
  };

  const onPlace = () => {
    addToOrders(cartItems, AddressData[selectedAddress]);
    DeleteAll();
    navigate('/orders');
  };

  return (
    <div className="container py-4">
      <Link to="/cart" className="btn back-button mb-3">← Back To Cart</Link>
      <h2 className="mb-4">Payment Page</h2>

      <div className="row">
        <div className="col-lg-7 col-md-12 mb-4">
          <div className="step-header">
            <span className="step-number">1</span> DELIVERY ADDRESS
          </div>

          {AddressData.length > 0 ? (
            addressConfirmed ? (
              <div className="card p-3">
                <div className="d-flex justify-content-between align-items-center flex-wrap">
                  <div>
                    <span>{AddressData[selectedAddress].addressType}</span> &nbsp;
                    <b>{AddressData[selectedAddress].name}</b> &nbsp;
                    {AddressData[selectedAddress].phone}
                  </div>
                  <button className="btn btn-sm btn-outline-primary mt-2 mt-lg-0" onClick={() => setAddressConfirmed(false)}>CHANGE</button>
                </div>
                <div className="mt-2">
                  {AddressData[selectedAddress].address}, {AddressData[selectedAddress].city}, {AddressData[selectedAddress].state} - <b>{AddressData[selectedAddress].pincode}</b>
                </div>
              </div>
            ) : (
              AddressData.map((address, index) => (
                <div key={index} className="card p-3 mb-3">
                  <div className="d-flex justify-content-between align-items-center flex-wrap">
                    <div>
                      <span>{address.addressType}</span> &nbsp;
                      <b>{address.name}</b> &nbsp;
                      {address.phone}
                    </div>
                    <button className="btn btn-sm btn-outline-primary mt-2 mt-lg-0" onClick={() => onEdit(index)}>EDIT</button>
                  </div>
                  <div className="mt-2">
                    {address.address}, {address.city}, {address.state} - <b>{address.pincode}</b>
                  </div>
                 <button
  className={`btn btn-sm mt-3 ${selectedAddress === index ? 'btn-success' : 'btn-outline-primary'}`}
  style={{ transition: 'all 0.3s', borderWidth: '1.5px' }}
  onClick={() => handleAddressSelect(index)}
>
  {selectedAddress === index ? '✓ Selected' : 'DELIVER HERE'}
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

        {addressConfirmed && selectedAddress != null && AddressData[selectedAddress] && (
          <div className="col-lg-5 col-md-12">
            <div className="card p-3">
              <div className="step-header"><span className="step-number">2</span> ORDER SUMMARY</div>

              {cartItems.length === 0 ? (
                <p className="text-muted">Your Cart Is Empty.😓</p>
              ) : (
                cartItems.map((item, index) => (
            <div key={index} className="d-flex flex-nowrap align-items-center border-bottom py-2">
  <img
    src={item.image}
    alt={item.name}
    className="img-fluid"
    style={{
      width: '60px',
      height: '60px',
      objectFit: 'cover',
      marginRight: '15px' // ✅ Ensures space to the right of image
    }}
  />
  <div className="flex-grow-1">
    <div><b>{item.name}</b></div>
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

      {/* Confirm Modal */}
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

      {/* Order Placed Modal */}
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
