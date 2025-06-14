// Navbar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from './images/Preview.png';
import boy from './images/boy.png';
import heart from './images/heart.png';
import shopping from './images/shopping-bag.png';
import 'bootstrap/dist/css/bootstrap.min.css';
const navLinks = [
  { label: 'ALL PRODUCTS ▾', path: '/' },
  { label: 'OFFERS', path: '/offers' },
  { label: 'SALE', path: '/sale' },
  { label: 'GIFT CARD', path: '/gift-card' },
  { label: 'ADDRESS', path: '/address' },
  { label: 'ORDERS', path: '/orders' },
  { label: 'CART', path: '/cart' },
  { label: 'WISHLIST', path: '/wishlist' },
  { label: 'LOGOUT', path: '/logout' },
];

export default function Navbar({ search }) {
  const [name, setName] = useState('');

  const onSearch = () => {
    if (search) search(name);
  };

  return (
    <>
      {/* Top Navbar */}
      <div className="container-fluid border-bottom py-2">
        <div className="row align-items-center">
          {/* Left: Logo + Wallet */}
          <div className="col-md-3 d-flex align-items-center">
            <img src={logo} alt="Logo" height="40" className="me-2" />
            <button className="btn btn-success">Wallet: ₹0</button>
          </div>

          {/* Center: Search */}
          <div className="col-md-6 d-flex">
            <input
              type="text"
              className="form-control me-2"
              placeholder="Search for more than 20,000 products"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button className="btn btn-primary" onClick={onSearch}>🔍</button>
          </div>

          {/* Right: Icons */}
          <div className="col-md-3 d-flex justify-content-end align-items-center gap-3">
            <Link to="/profile"><img src={boy} alt="User" height="25" /></Link>
            <Link to="/wishlist"><img src={heart} alt="Wishlist" height="25" /></Link>
            <Link to="/cart"><img src={shopping} alt="Cart" height="25" /></Link>
          </div>
        </div>
      </div>

            {/* Bottom Navbar Links */}
      <div className="container-fluid border-bottom py-2">
        <div className="navbar-links">
          <div className="welcome-text">WELCOME 😊🙏</div>
          {navLinks.map((link, i) => (
            <Link key={i} to={link.path}>
              {link.label}
            </Link>
          ))}
        </div>
      </div>

    </>
  );
}
