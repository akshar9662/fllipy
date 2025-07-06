import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate
} from "react-router-dom";
import LandingPage from "./Components/LandingPage";
import Login from "./Login/Login";
import Signup from "./Login/Signup";
import AdminPage from "./Admin/AdminPage";
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
 const isAdminPage = location.pathname.startsWith("/admin");
  const isLandingPage = location.pathname.startsWith("/landingpage");
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
    setProducts(query === "" ? Product : Product.filter((item) => item.pname.toLowerCase().includes(query))
    );
  };

useEffect(() => {
    const id = localStorage.getItem("userId");
    setLogin(id);
 }, []);

 const Logout = () => {
   const logout=localStorage.removeItem("userId"); 
   setLogin(logout);
   navigate("/landingpage"); 
 };

   /* Fetch Users */
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API}/api/login`);
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
        const response = await axios.get(`${process.env.REACT_APP_API}/api/products`);
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
        const response = await axios.get(`${process.env.REACT_APP_API}/api/wishlist`);
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
        const response = await axios.get(`${process.env.REACT_APP_API}/api/cart`);
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
        const response = await axios.get(`${process.env.REACT_APP_API}/api/address`);
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
        const response = await axios.get(`${process.env.REACT_APP_API}/api/order`);
        const dbOrders = response.data || [];
        setOrderItems(dbOrders);
      } catch (err) {
        console.error("❌ Error fetching Orders:", err);
      }
    };
    fetchOrders();
  }, []);
  useEffect(() => {
  const autoClean = async () => {
    try {
      const res = await axios.delete(`${process.env.REACT_APP_API}/api/cart/autoclean`);
    } catch (err) {
      console.error("Cleanup error:", err);
    }
  };

  autoClean();
}, []);
useEffect(() => {
  const autoClean = async () => {
    try {
      const res = await axios.delete(`${process.env.REACT_APP_API}/api/wishlist/autoclean`);
    } catch (err) {
      console.error("Cleanup error:", err);
    }
  };

  autoClean();
}, []);


  const AddUser = async (NewSignup) => {
    try{
    const existing = SignupData.find((User) => User.email === NewSignup.email);
    if (existing) {
      alert("User Already Added.😓");
    } else {
      setSignupData([...SignupData, NewSignup]);
      await axios.post(`${process.env.REACT_APP_API}/api/login`, {
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
      const existing = cartItems.find((item) => item.pname === product.pname && item.loginId === CheckLogin);
      let updatedCart;
      if (existing) {
        updatedCart = cartItems.map((item) =>
          item.pname === product.pname && item.loginId === CheckLogin
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        updatedCart = [...cartItems, { ...product, quantity: 1 ,loginId: CheckLogin}];
      }
      setCartItems(updatedCart);
      await axios.post(`${process.env.REACT_APP_API}/api/cart`, {
        items:  {...product,
    loginId: CheckLogin,  
      }});
    } catch (err) {
      console.error("Error Adding Item To Cart:", err);
    }
  };

const updateQuantity = async (_id, delta) => {
  try {
    const updated = cartItems.map((item) => {
      if (item._id === _id && item.loginId === CheckLogin) {
        const newQuantity = item.quantity + delta;
        return { ...item, quantity: newQuantity < 1 ? 1 : newQuantity };
      }
      return item;
    });

    setCartItems(updated);

    const changedItem = updated.find(item => item._id === _id && item.loginId === CheckLogin);

    await axios.patch(`${process.env.REACT_APP_API}/api/cart/update`, {
      productId: _id,
      quantity: changedItem.quantity,
      loginId: CheckLogin,
    });
  } catch (err) {
    console.error("Error updating quantity:", err);
  }
};


  const deleteItem = async (_id) => {
    try {
      const newCart = cartItems.filter(item => item._id !== _id && item.loginId === CheckLogin);
      setCartItems(newCart);
      await axios.patch(`${process.env.REACT_APP_API}/api/cart/delete`, {
        productId: _id,
    loginId: CheckLogin, 
      });
    } catch (err) {
      console.log("Error deleting from cart:", err);
    }
  };
  const deleteAllItems = async () => {
    try {
      setCartItems([]);
      await axios.delete(`${process.env.REACT_APP_API}/api/cart/clear`,{ data: { loginId: CheckLogin }});
    } catch (err) {
      console.log("Error Clear Cart:", err);
    }
  };
  const addToWishlist = async (product) => {
    try {
      const existing = wishlistItems.find(
        (item) => item.pname === product.pname && item.loginId === CheckLogin
      );
      if (existing) {
        alert("Already Added To Wishlist!😓");
      } else {setWishlistItems([
  ...wishlistItems,
  { ...product, loginId: CheckLogin }
]);
        await axios.post(`${process.env.REACT_APP_API}/api/wishlist`, {
          addToWishlist: {...product,loginId:CheckLogin,}
        });
      }
    } catch (err) {
      console.error("Error adding to wishlist:", err);
    }
  };

  const deleteWishlistItem = async (_id) => {
    try {
      const newWishlist = wishlistItems.filter(item => item._id !== _id && item.loginId === CheckLogin);
      setWishlistItems(newWishlist);
      await axios.patch(`${process.env.REACT_APP_API}/api/wishlist/delete`, {
        wishlistId: _id,
        loginId: CheckLogin, 
      });
    } catch (err) {
      console.log("Error deleting from cart:", err);
    }
  };

 const AddressD = async (NewAddress) => {
  try {
    const userAddresses = AddressData.filter(
      (addr) => addr.loginId === CheckLogin
    );
    const existing = userAddresses.find(
      (addr) => addr.addressType === NewAddress.addressType
    );
    if (existing) {
      alert("Change Address Type OR Edit Address.😓");
    } else {
      setAddressData([...AddressData, NewAddress]);
      await axios.post(`${process.env.REACT_APP_API}/api/address`, {
        newAddress: {...NewAddress,loginId:CheckLogin}
      });
      alert("Address added successfully! 🎉");
    }
  } catch (err) {
    console.error("Error Adding Address:", err);
  }
};


  const SaveAddress = async (updatedAddress, index) => {
    try { 
      const newList = AddressData.map((addr) =>
      addr._id === index ? updatedAddress : addr
    );
    setAddressData(newList);
      await axios.patch(`${process.env.REACT_APP_API}/api/address/update`, {
        EditAddress:updatedAddress,
        loginId:CheckLogin
      });
    } catch (err) {
      console.error(
        "❌ Error Edit Address:",
        err.response ? err.response.data : err.message
      );
    }
  };

  const deleteAddress = async (_id) => {
    try {
      const AddressToDelete = AddressData.filter((addr)=>addr._id !== _id && addr.loginId === CheckLogin);
      setAddressData(AddressToDelete);
      await axios.patch(`${process.env.REACT_APP_API}/api/address/delete`, {
        AddressId: _id,
        loginId: CheckLogin,
      });
    } catch (err) {
      console.log("Error deleting Address:", err);
    }
  };

  const addToOrders = async (product, orderaddress) => {
    try {
      const now = new Date();
      const currentDate = now.toLocaleDateString();
      const currentTime = now.toLocaleTimeString();
      const userCartItems = cartItems.filter(item => item.loginId === CheckLogin);

      const order = {
        loginId: CheckLogin,
        product: userCartItems.map((product) => ({
          ...product,
          orderedDate: currentDate,
          orderedTime: currentTime,
        })),
        shippingAddress: { ...orderaddress},
      };
      setOrderItems([...OrderItems, order]);
      await axios.post(`${process.env.REACT_APP_API}/api/order`, { addOrders: order});
    } catch (err) {
      console.log("Error Adding Orders:", err);
    }
  };

useEffect(() => {
  if (location.pathname === "/") {
    navigate("/landingpage");
  }
}, [location, navigate]);



  return (
  <>
    {isLandingPage ? (
      <Routes>
        <Route path="/landingpage" element={<LandingPage />} />
        <Route path="/" element={<Navigate to="/landingpage" />} />
      </Routes>
    ) : (
      <div className="container-fluid">
        {!isAdminPage && <Navbar search={Handlesearch} />}
        <div className="row g-0 flex-column flex-md-row">
          {!isAdminPage && showSidebar && (
            <div className="col-12 col-md-3 col-lg-2 bg-white border-end p-3">
              <SideBarMenu />
            </div>
          )}
          <div className={`col-12 ${showSidebar ? "col-md-9 col-lg-10" : "col-12"} p-3`}>
            <Routes>
              <Route path="/admin/*" element={<AdminPage />} />
              <Route path="/login" element={<Login onlogin={CheckUser} />} />
              <Route path="/signup" element={<Signup onSignup={AddUser} />} />
              <Route path="/aboutus" element={<AboutUs />} />
              <Route path="/contactus" element={<ContactUs SignupData={SignupData} CheckLogin={CheckLogin}/>} />
              <Route path="/faqs" element={<Faqs />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/profile" element={<Profile SignupData={SignupData} AddressData={AddressData} CheckLogin={CheckLogin} handleLogout={Logout} />} />
              <Route path="/products" element={<Products SignupData={SignupData} CheckLogin={CheckLogin} Product={Product} addToCart={addToCart} addToWishlist={addToWishlist} />} />
              <Route path="/cart" element={<Cart SignupData={SignupData} CheckLogin={CheckLogin} cartItems={cartItems} onDelete={deleteItem} onUpdateQuantity={updateQuantity} AddressData={AddressData} />} />
              <Route path="/wishlist" element={<Wishlist SignupData={SignupData} CheckLogin={CheckLogin} wishlistItems={wishlistItems} onDelete={deleteWishlistItem} />} />
              <Route path="/address" element={<Address SignupData={SignupData} CheckLogin={CheckLogin} AddressData={AddressData} onAddress={AddressD} onSaveAddress={SaveAddress} onDelete={deleteAddress} />} />
              <Route path="/payment" element={<Payment SignupData={SignupData} CheckLogin={CheckLogin} AddressData={AddressData} cartItems={cartItems} DeleteAll={deleteAllItems} addToOrders={addToOrders} />} />
              <Route path="/orders" element={<Orders orderItems={OrderItems} SignupData={SignupData} CheckLogin={CheckLogin} />} />
            </Routes>
          </div>
          {!isAdminPage && <Footer />}
        </div>
      </div>
    )}
  </>
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
