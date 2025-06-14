import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './Components/Navbar';
import SideBarMenu from './Components/SiderBarMenu';
import Products from './Components/Products';
import Cart from './Components/Cart';
import Orders from './Components/Orders';
import Wishlist from './Components/Wishlist';
import Address from './Components/Address';
import Payment from './Components/Payment';
import 'bootstrap/dist/css/bootstrap.min.css';

function AppContent() {
  const location = useLocation();
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [OrderItems, setOrderItems] = useState([]);
  const [AddressData, setAddressData] = useState([]);
  const [Message, setMessage] = useState('');
  const [showMessageBox, setShowMessageBox] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const showSidebar = location.pathname !== '/cart' && location.pathname !== '/orders' && location.pathname !== '/wishlist' && location.pathname !== '/address' && location.pathname !== '/payment';

  const Handlesearch = (name) => {
    setSearchQuery(name);
  };

  const addToCart = (product) => {
    const existing = cartItems.find(item => item.name === product.name);
    if (existing) {
      setCartItems(cartItems.map(item => item.name === product.name ? { ...item, quantity: item.quantity + 1 } : item));
      setMessage('Product Added To Cart!🎉');
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
      setMessage('Product Added To Cart!🎉');
    }
    setShowMessageBox(true);
  };

  const updateQuantity = (index, delta) => {
    const updated = [...cartItems];
    updated[index].quantity += delta;
    if (updated[index].quantity < 1)
      updated[index].quantity = 1;
    setCartItems(updated);
  };

  const deleteItem = (indexToDelete) => {
    setCartItems(cartItems.filter((_, index) => index !== indexToDelete));
  };

  const addToOrders = (product, orderaddress) => {
    const now = new Date();
    const currentDate = now.toLocaleDateString();
    const currentTime = now.toLocaleTimeString();
    const order = {
      product: product.map(product => ({
        ...product,
        orderedDate: currentDate,
        orderedTime: currentTime
      })),
      shippingAddress: { ...orderaddress }
    };
    setOrderItems([...OrderItems, order]);
  };

  const deleteAllItems = () => {
    setCartItems([]);
  };

  const addToWishlist = (product) => {
    const existing = wishlistItems.find(item => item.name === product.name);
    if (existing) {
      setMessage('Already Added To Wishlist!😓');
    } else {
      setWishlistItems([...wishlistItems, product]);
      setMessage('Product Added To Wishlist!🎉');
    }
    setShowMessageBox(true);
  };

  const deleteWishlistItem = (indexDelete) => {
    setWishlistItems(wishlistItems.filter((_, index) => index !== indexDelete));
  };

  const AddressD = (NewAddress) => {
    const existing = AddressData.find(Data => Data.addressType === NewAddress.addressType);
    if (existing) {
      setMessage('Change Address Type OR Edit Address.😓');
    } else {
      setAddressData([...AddressData, NewAddress]);
      setMessage('Address Addeded Successfully!🎉');
    }
    setShowMessageBox(true);
  };

  const SaveAddress = (updatedAddress) => {
    setAddressData(updatedAddress);
    setMessage('Address Edited Successfully!🎉');
    setShowMessageBox(true);
  };

  const deleteAddress = (indexDelete) => {
    setAddressData(AddressData.filter((_, index) => index !== indexDelete));
  };

  const closeMessageBox = () => {
    setShowMessageBox(false);
    setMessage('');
  };

  return (
    <div className="container-fluid">
      <Navbar search={Handlesearch} />
      <div className="row g-0 flex-column flex-md-row">


       {showSidebar && (
  <div className="col-12 col-md-3 col-lg-2 bg-white border-end p-3">
    <SideBarMenu />
  </div>
)}

<div className={`col-12 ${showSidebar ? 'col-md-9 col-lg-10' : 'col-12'} p-3`}>
<Routes>
            <Route path="/" element={<Navigate to="/products" />} />
            <Route path="/products" element={<Products searchQuery={searchQuery} addToCart={addToCart} addToWishlist={addToWishlist} />} />
            <Route path="/cart" element={<Cart cartItems={cartItems} onDelete={deleteItem} onUpdateQuantity={updateQuantity} AddressData={AddressData} />} />
            <Route path="/wishlist" element={<Wishlist wishlistItems={wishlistItems} onDelete={deleteWishlistItem} />} />
            <Route path="/address" element={<Address AddressData={AddressData} onAddress={AddressD} onSaveAddress={SaveAddress} onDelete={deleteAddress} />} />
            <Route path="/payment" element={<Payment AddressData={AddressData} cartItems={cartItems} DeleteAll={deleteAllItems} addToOrders={addToOrders} />} />
            <Route path="/orders" element={<Orders orderItems={OrderItems} />} />
          </Routes>
        </div>
      </div>
      {showMessageBox && (
        <div className="alert alert-success custom-toast text-center" role="alert">
          <p className="mb-2">{Message}</p>
          <button className="btn btn-sm btn-primary" onClick={closeMessageBox}>OK</button>
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;