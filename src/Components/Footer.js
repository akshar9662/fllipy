import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-dark text-light pt-5 pb-3 mt-5 w-100">
      <div className="container-fluid px-5">
        <div className="row text-center text-md-start">
          {/* Column 1 */}
          <div className="col-md-3 mb-4">
            <h5 className="fw-bold mb-3">🛍️ Fllipy</h5>
            <p>
              Your one-stop destination for fashion, electronics, and more. Shop smart. Live better.
            </p>
          </div>

          {/* Column 2 */}
          <div className="col-md-3 mb-4">
            <h6 className="fw-bold mb-3">Quick Links</h6>
            <ul className="list-unstyled">
              <li><Link className="text-light text-decoration-none" to="/products">Products</Link></li>
              <li><Link className="text-light text-decoration-none" to="/cart">Cart</Link></li>
              <li><Link className="text-light text-decoration-none" to="/wishlist">Wishlist</Link></li>
              <li><Link className="text-light text-decoration-none" to="/profile">My Account</Link></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div className="col-md-3 mb-4">
            <h6 className="fw-bold mb-3">Help & Info</h6>
            <ul className="list-unstyled">
              <li><Link className="text-light text-decoration-none" to="/aboutus">About Us</Link></li>
              <li><Link className="text-light text-decoration-none" to="/contactus">Contact Us</Link></li>
              <li><Link className="text-light text-decoration-none" to="/faqs">FAQs</Link></li>
              <li><Link className="text-light text-decoration-none" to="/terms">Terms & Conditions</Link></li>
            </ul>
          </div>

          {/* Column 4 */}
          <div className="col-md-3 mb-4">
            <h6 className="fw-bold mb-3">Contact</h6>
            <p className="mb-1">📧 support@fllipy.in</p>
            <p className="mb-1">📞 +91-9876543210</p>
          </div>
        </div>

        <hr className="border-light" />
        <p className="text-center m-0">&copy; {new Date().getFullYear()} Fllipy. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
