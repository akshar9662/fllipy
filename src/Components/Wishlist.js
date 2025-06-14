import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


export default function Products({ wishlistItems, onDelete }) {
  return (
    <div className="container py-4">
      <Link to="/products" className="btn btn-outline-primary mb-3">← Back To Products</Link>
      <h2 className="wishlist-heading">Your Wishlist</h2>

      {wishlistItems.length === 0 ? (
        <p className="text-muted">No Products Yet. 😓</p>
      ) : (
        <div className="row">
          {wishlistItems.map((item, index) => (
            <div key={index} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
              <div className="card h-100 position-relative shadow-sm">
                <div className="badge discount-badge position-absolute top-0 start-0 m-2">
                  {((item.price * 100) / item.oldPrice).toFixed(0)}% OFF
                </div>
                <img
                  src={item.image}
                  alt={item.name}
                  className="card-img-top"
                  style={{ height: '180px', objectFit: 'contain' }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{item.name}</h5>
                  <p className="card-text text-warning">⭐ {item.rating}</p>
                  <p className="card-text mb-2">
                    <span className="old-price">₹{item.oldPrice}</span>
                    <span className="ms-2 text-success fw-bold">₹{item.price}</span>
                  </p>
                  <button
                    onClick={() => onDelete(index)}
                    className="btn btn-outline-danger mt-auto"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
