import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

export default function Orders({ orderItems }) {
  return (
    <div className="container my-4">
      <Link to="/products" className="btn btn-outline-primary mb-3">← Back To Products</Link>
      <h2 className="mb-4">📦 All Ordered Items</h2>

      {orderItems.length === 0 ? (
        <p className="text-muted">No Orders Placed Yet. 😓</p>
      ) : (
        orderItems.map((order, orderIndex) =>
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
                    <h5 className="card-title">{item.name}</h5>
                    <p className="card-text mb-1">Old Price: ₹{item.oldPrice}</p>
                    <p className="card-text mb-1 fw-bold">Price: ₹{item.price}</p>
                    <p className="card-text mb-1">Quantity: {item.quantity}</p>
                    <p className="card-text fw-semibold">Total: ₹{item.price * item.quantity}</p>
                  </div>
                </div>
                <div className="col-md-3 small p-3">
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
        )
      )}
    </div>
  );
}
