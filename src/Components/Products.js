import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import tv from "./images/tv.jpg";
import laptop from "./images/laptop.jpg";
import fridge from "./images/fridge.jpeg";
import washingmachine from "./images/washing machine.jpg";
import AdComponent from './AdComponent';
import 'bootstrap/dist/css/bootstrap.min.css';


const products = [
  { name: "TV", image: tv, oldPrice: 25000, price: 23000, rating: 5 },
  { name: "Laptop", image: laptop, oldPrice: 45000, price: 40000, rating: 4.5 },
  { name: "Fridge", image: fridge, oldPrice: 15000, price: 12500, rating: 4 },
  { name: "Washing Machine", image: washingmachine, oldPrice: 20000, price: 15000, rating: 4.2 },
];

export default function Products({ addToCart, addToWishlist, searchQuery }) {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const navigate = useNavigate();

  useEffect(() => {
    const query = String(searchQuery || '').toLowerCase();
    setFilteredProducts(
      query === '' ? products :
      products.filter(item => item.name.toLowerCase().includes(query))
    );
  }, [searchQuery]);

  const handleAddToCart = (product) => {
    addToCart(product);
    navigate('/cart');
  };

  const handleAddToWishlist = (product) => {
    addToWishlist(product);
    navigate('/wishlist');
  };

  return (

<div className="container best-selling-wrapper pb-4">
<AdComponent slot="1812068633" />

  <h2 className="best-selling-title">Best Selling Products</h2>
  <div className="row">
    {filteredProducts.map((item, index) => (
     <div key={index} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
              <div className="card h-100 position-relative shadow-sm" style={{ borderRadius: '6px' }} >
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
          <div className="mt-auto d-flex flex-column gap-2">
            <button
              className="btn btn-outline-success btn-sm"
              onClick={() => handleAddToCart(item)}
            >
              Add to Cart
            </button>
            <button
              className="btn btn-outline-success btn-sm"
              onClick={() => handleAddToWishlist(item)}
            >
              Add to Wishlist
            </button>
          </div>
        </div>
      </div>
                </div>
    ))}
  </div>
</div>

  );
}
