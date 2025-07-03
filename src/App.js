import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate
} from "react-router-dom";
import Login from "./Login/Login";
import Signup from "./Login/Signup";
import Navbar from "./Components/Navbar";
import SideBarMenu from "./Components/SiderBarMenu";
import Profile from "./Components/Profile";
import Products from "./Components/Products";
import Cart from "./Components/Cart";
import Orders from "./Components/Orders";
import Wishlist from "./Components/Wishlist";
import Address from "./Components/Address";
import Payment from "./Components/Payment";
import Footer from "./Components/Footer";
import AboutUs from "./Components/AboutUs";
import ContactUs from "./Components/ContactUs";
import Faqs from "./Components/FAQs";
import Terms from "./Components/Terms";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();
  const [SignupData, setSignupData] = useState([]);
  const [CheckLogin, setLogin] = useState("");
  const [Product, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [OrderItems, setOrderItems] = useState([]);
  const [AddressData, setAddressData] = useState([]);
  const [Message, setMessage] = useState("");
  const [showMessageBox, setShowMessageBox] = useState(false);

  const showSidebar =
    location.pathname !== "/cart" &&
    location.pathname !== "/orders" &&
    location.pathname !== "/wishlist" &&
    location.pathname !== "/address" &&
    location.pathname !== "/payment" &&
    location.pathname !== "/login" &&
    location.pathname !== "/signup";

  const Handlesearch = (name) => {
    const query = String(name || "").toLowerCase();
    setProducts(
      query === ""
        ? Product
        : Product.filter((item) => item.name.toLowerCase().includes(query))
    );
  };
  

useEffect(() => {
    const id = localStorage.getItem("userId");
    setLogin(id);
 }, []);

 const Logout = () => {
   const logout=localStorage.removeItem("userId"); 
   setLogin(logout);
   navigate("/login"); 
 };

   /* Fetch Users */
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/login");
        const usersdata= response.data;
        const data = usersdata.flatMap((doc) => doc.users);
        setSignupData(data);
      } catch (err) {
        console.error("Error fetching Users:", err);
      }
    };
    fetchUsers();
  }, []);

  /* Fetch Products */
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products");
        setProducts(response.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    fetchProducts();
  }, []);

  /* Fetch Wishlist Items */
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/wishlist");
        const dbwishlist = response.data;
        const allwishlist = dbwishlist.flatMap((doc) => doc.items);
        setWishlistItems(allwishlist);
      } catch (err) {
        console.error("❌ Error fetching wislist:", err);
      }
    };
    fetchWishlist();
  }, []);

  /* Fetch Cart Items */
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/cart");
        const dbCart = response.data;
        const allCart = dbCart.flatMap((doc) => doc.items);
        setCartItems(allCart);
      } catch (err) {
        console.error("❌ Error fetching cart:", err);
      }
    };
    fetchCart();
  }, []);

  /* Fetch Address*/
  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/address");
        const dbAddress = response.data;
        const allAddresses = dbAddress.flatMap((doc) => doc.addresses);
        setAddressData(allAddresses);
      } catch (err) {
        console.error("❌ Error fetching Address:", err);
      }
    };
    fetchAddress();
  }, []);

  /* Fetch Orders*/
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/order");
        const dbOrders = response.data || [];
        setOrderItems(dbOrders);
      } catch (err) {
        console.error("❌ Error fetching Orders:", err);
      }
    };
    fetchOrders();
  }, []);
  


  const AddUser = async (NewSignup) => {
    try{
    const existing = SignupData.find((User) => User.email === NewSignup.email);
    if (existing) {
      alert("User Already Added.😓");
    } else {
      setSignupData([...SignupData, NewSignup]);
      await axios.post("http://localhost:5000/api/login", {
        users: NewSignup,
      });
      alert("Account Sign Up Successfully!🎉");
    }
  }
  catch(err){
    console.error("Error Adding user:", err);
  }
  };

 const CheckUser = (login) => {
  const existing = SignupData.find((User) => User.email === login.email && User.password === login.password);
    if (existing) {
      localStorage.setItem('userId',existing._id);
      const id = localStorage.getItem("userId");
    setLogin(id); 
      alert("Successfully Login!🎉");
      navigate("/products");
    }else{
    alert("Email or Password incorrect!");
    }
  };



  const addToCart = async (product) => {
    try {
      const existing = cartItems.find((item) => item.pname === product.pname);
      let updatedCart;
      if (existing) {
        updatedCart = cartItems.map((item) =>
          item.pname === product.pname
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        updatedCart = [...cartItems, { ...product, quantity: 1 }];
      }
      setCartItems(updatedCart);
      await axios.post("http://localhost:5000/api/cart", {
        items: product,
      });
      setMessage("Product Added To Cart! 🎉");
      setShowMessageBox(true);
    } catch (err) {
      console.error("Error Adding Item To Cart:", err);
    }
  };

  const updateQuantity = async (index, delta) => {
    try {
      const updated = [...cartItems];
      updated[index].quantity += delta;
      if (updated[index].quantity < 1) {
        updated[index].quantity = 1;
      }
      setCartItems(updated);
      await axios.patch("http://localhost:5000/api/cart/update", {
        name: updated[index].pname,
        quantity: updated[index].quantity,
      });
    } catch (err) {
      console.error("Error adding to cart:", err);
    }
  };

  const deleteItem = async (indexToDelete) => {
    try {
      const itemToDelete = cartItems[indexToDelete];
      const newCart = cartItems.filter((_, index) => index !== indexToDelete);
      setCartItems(newCart);
      await axios.patch("http://localhost:5000/api/cart/delete", {
        productId: itemToDelete._id,
      });
      setMessage("Product Deleted To Cart! 🎉");
      setShowMessageBox(true);
    } catch (err) {
      console.log("Error deleting from cart:", err);
    }
  };
  const deleteAllItems = async () => {
    try {
      await axios.delete("http://localhost:5000/api/cart/clear");
      setCartItems([]);
    } catch (err) {
      console.log("Error Clear Cart:", err);
    }
  };
  const addToWishlist = async (product) => {
    try {
      const existing = wishlistItems.find(
        (item) => item.pname === product.pname
      );
      if (existing) {
        setMessage("Already Added To Wishlist!😓");
      } else {
        setWishlistItems([...wishlistItems, product]);
        setMessage("Product Added To Wishlist!🎉");
        await axios.post("http://localhost:5000/api/wishlist", {
          addToWishlist: product,
        });
      }
      setShowMessageBox(true);
    } catch (err) {
      console.error("Error adding to wishlist:", err);
    }
  };

  const deleteWishlistItem = async (indexDelete) => {
    try {
      const itemToDelete = wishlistItems[indexDelete];
      const newWishlist = wishlistItems.filter(
        (_, index) => index !== indexDelete
      );
      setWishlistItems(newWishlist);
      await axios.patch("http://localhost:5000/api/wishlist/delete", {
        wishlistId: itemToDelete._id,
      });
      setMessage("Product Deleted To Wishlist🎉");
      setShowMessageBox(true);
    } catch (err) {
      console.log("Error deleting from cart:", err);
    }
  };

  const AddressD = async (NewAddress) => {
    try {
      const existing = AddressData.find(
        (Data) => Data.addressType === NewAddress.addressType
      );
      if (existing) {
        setMessage("Change Address Type OR Edit Address.😓");
      } else {
        setAddressData([...AddressData, NewAddress]);
        setMessage("Address Addeded Successfully!🎉");
        await axios.post("http://localhost:5000/api/address", {
          newAddress: NewAddress,
        });
      }
      setShowMessageBox(true);
    } catch (err) {
      console.error("Error Adding Address:", err);
    }
  };

  const SaveAddress = async (updatedAddress, index) => {
    try {
      setAddressData(updatedAddress);
      setMessage("Address Edited Successfully!🎉");
      setShowMessageBox(true);
      const EditAddress = updatedAddress[index];
      await axios.patch("http://localhost:5000/api/address/update", {
        EditAddress: EditAddress,
      });
    } catch (err) {
      console.error(
        "❌ Error Edit Address:",
        err.response ? err.response.data : err.message
      );
    }
  };

  const deleteAddress = async (indexDelete) => {
    try {
      const itemToDelete = AddressData[indexDelete];

      const newAddress = AddressData.filter(
        (_, index) => index !== indexDelete
      );
      setAddressData(newAddress);
      setMessage("Address Deleted Successfully!🎉");
      await axios.patch("http://localhost:5000/api/address/delete", {
        AddressId: itemToDelete._id,
      });
      setShowMessageBox(true);
    } catch (err) {
      console.log("Error deleting Address:", err);
    }
  };

  const addToOrders = async (product, orderaddress) => {
    try {
      const now = new Date();
      const currentDate = now.toLocaleDateString();
      const currentTime = now.toLocaleTimeString();
      const order = {
        product: product.map((product) => ({
          ...product,
          orderedDate: currentDate,
          orderedTime: currentTime,
        })),
        shippingAddress: { ...orderaddress },
      };
      setOrderItems([...OrderItems, order]);
      await axios.post("http://localhost:5000/api/order", { addOrders: order });
    } catch (err) {
      console.log("Error Adding Orders:", err);
    }
  };

  const closeMessageBox = () => {
    setShowMessageBox(false);
    setMessage("");
  };


  return (
    <div className="container-fluid">
      <Navbar search={Handlesearch}/>
      <div className="row g-0 flex-column flex-md-row">
        {showSidebar && (
          <div className="col-12 col-md-3 col-lg-2 bg-white border-end p-3">
            <SideBarMenu />
          </div>
        )}

        <div
          className={`col-12 ${
            showSidebar ? "col-md-9 col-lg-10" : "col-12"
          } p-3`}
        >
          <Routes>
            <Route path="/" element={<Navigate to="/products" />} />
            <Route path="/login" element={<Login onlogin={CheckUser}/>}/>
            <Route path="/signup" element={<Signup onSignup={AddUser}/>} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/contactus" element={<ContactUs />} />
            <Route path="/faqs" element={<Faqs />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/profile" element={<Profile  SignupData={SignupData} AddressData={AddressData} CheckLogin={CheckLogin} handleLogout={Logout}/>} />
            <Route
              path="/products"
              element={
                <Products
                  SignupData={SignupData}
                  CheckLogin={CheckLogin}
                  Product={Product}
                  addToCart={addToCart}
                  addToWishlist={addToWishlist}
                />
              }
            />
            <Route
              path="/cart"
              element={
                <Cart
                SignupData={SignupData}
                  CheckLogin={CheckLogin}
                  cartItems={cartItems}
                  onDelete={deleteItem}
                  onUpdateQuantity={updateQuantity}
                  AddressData={AddressData}
                />
              }
            />
            <Route
              path="/wishlist"
              element={
                <Wishlist
                SignupData={SignupData}
                  CheckLogin={CheckLogin}
                  wishlistItems={wishlistItems}
                  onDelete={deleteWishlistItem}
                />
              }
            />
            <Route
              path="/address"
              element={
                <Address
                SignupData={SignupData}
                  CheckLogin={CheckLogin}
                  AddressData={AddressData}
                  onAddress={AddressD}
                  onSaveAddress={SaveAddress}
                  onDelete={deleteAddress}
                />
              }
            />
            <Route
              path="/payment"
              element={
                <Payment
                SignupData={SignupData}
                  CheckLogin={CheckLogin}
                  AddressData={AddressData}
                  cartItems={cartItems}
                  DeleteAll={deleteAllItems}
                  addToOrders={addToOrders}
                />
              }
            />
            <Route
              path="/orders"
              element={<Orders orderItems={OrderItems} SignupData={SignupData}
                  CheckLogin={CheckLogin} />}
            />
          </Routes>
        </div>
        <Footer/>
      </div>
      {showMessageBox && (
        <div className="custom-backdrop">
          <div
            className="alert alert-success custom-toast text-center"
            role="alert"
          >
            <p className="mb-2">{Message}</p>
            <button
              className="btn btn-sm btn-primary"
              onClick={closeMessageBox}
            >
              OK
            </button>
          </div>
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
