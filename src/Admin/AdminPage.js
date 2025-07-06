import React,{useState,useEffect} from "react";
import { Routes, Route,useNavigate } from "react-router-dom";
import AdminLogin from "./AdminLogin";
import AdminSignup from "./AdminSignup";
import AdminProfile from "./AdminProfile";
import AdminSidebar from "./AdminSidebar";
import ProductList from "./ProductList";
import ProductForm from "./ProductForm";
import OrderList from "./OrderList";
import UserList from "./UserList";
import axios from "axios";
export default function AdminDashboard() {
      const navigate = useNavigate();
      const [SignupData, setSignupData] = useState([]);
const [CheckLogin, setLogin] = useState("");

 const AddUser = async (NewSignup) => {
    try{
    const existing = SignupData.find((User) => User.email === NewSignup.email);
    if (existing) {
      alert("User Already Added.😓");
    } else {
      setSignupData([...SignupData, NewSignup]);
      await axios.post("https://fllipy.onrender.com/api/adminlogin", {
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
      navigate("/admin/products");
    }else{
    alert("Email or Password incorrect!");
    }
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

      useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("https://fllipy.onrender.com/api/adminlogin");
        const usersdata= response.data;
        const data = usersdata.flatMap((doc) => doc.users);
        setSignupData(data);
      } catch (err) {
        console.error("Error fetching Users:", err);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="d-flex">
      <AdminSidebar />
      <div className="flex-grow-1 p-3">
        <Routes>
        <Route path="/adminlogin" element={<AdminLogin onAdminlogin={CheckUser} />} />
        <Route path="/adminsignup" element={<AdminSignup onAdminSignup={AddUser} />} />
        <Route path="/profile" element={<AdminProfile handleLogout={Logout} SignupData={SignupData} CheckLogin={CheckLogin}/>} />
          <Route path="products" element={<ProductList SignupData={SignupData} CheckLogin={CheckLogin}/>} />
          <Route path="products/add" element={<ProductForm />} />
          <Route path="products/edit/:id" element={<ProductForm />} />
          <Route path="orders" element={<OrderList SignupData={SignupData} CheckLogin={CheckLogin}/>} />
          <Route path="users" element={<UserList SignupData={SignupData} CheckLogin={CheckLogin}/>} />
        </Routes>
      </div>
    </div>
  );
}
