import React, { useState,useEffect} from "react";

import { useNavigate } from "react-router-dom";
import axios from "axios";

const ContactUs = ({SignupData,CheckLogin}) => {
    const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
const [contacts, setContacts] = useState([]); 
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("https://fllipy.onrender.com/api/contactus");
        const dbOrders = response.data;
        setContacts(dbOrders);
      } catch (err) {
        console.error("❌ Error fetching Orders:", err);
      }
    };
    fetchOrders();
  }, []);


    const handleLogin = () => {
      navigate("../adminlogin");
    };
  const user = SignupData.find((u) => String(u._id) === String(CheckLogin));
  if (!SignupData || SignupData.length === 0) {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="text-muted">⏳ Loading...</div>
    </div>
  );
}

    if (!user) {
      return (
         <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="border p-4 rounded shadow text-center" style={{ maxWidth: '400px' }}>
          <h5 className="mb-3">User not found or not logged in.</h5>
          <button
            className="btn btn-outline-success btn-sm"
            onClick={handleLogin} 
          >
            Login
          </button>
        </div>
      </div>
      );
    }
 


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
       if (!form) {
      alert("Please fill all the required fields!");
      return;
    } else if (!/^[a-zA-Z\s]+$/.test(form.name)) {
      alert("Name should only contain alphabetical characters.");
      return;
    }
      await axios.post("https://fllipy.onrender.com/api/contactus",form);
      setSubmitted(true);
      setForm({ name: "", email: "", message: "" });
       setTimeout(() => {
    window.location.reload();
  }, 300);
    } catch (err) {
      console.error("Error submitting form:", err);
    }
  };

  return (
    <div className="container my-5 px-3 px-md-5">
      <div className="text-center mb-5">
        <h1 className="fw-bold">Contact Us</h1>
        <p className="text-muted">We're here to help you anytime.</p>
      </div>

      <div className="row">
        <div className="col-md-6 mb-4">
          <h4 className="mb-3">Send us a message</h4>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Message</label>
              <textarea
                className="form-control"
                name="message"
                rows="4"
                value={form.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <button type="submit" className="btn btn-primary">Submit</button>

            {submitted && (
              <div className="alert alert-success mt-3">
                Thank you! We'll get back to you soon.
              </div>
            )}
          </form>
        </div>

        <div className="col-md-6 mb-4">
          <h4 className="mb-3">Contact Information</h4>
          <p><strong>📍 Address:</strong> Gujarat, India</p>
          <p><strong>📧 Email:</strong> support@fllipy.in</p>
          <p><strong>📞 Phone:</strong> +91-9662428169</p>
        </div>
      </div>
      <div className="mt-5">
  <h4 className="mb-4 fw-semibold">📨 Recent Messages</h4>

  {contacts.filter(item => item.loginId === CheckLogin).length === 0 ? (
    <div className="alert alert-info">No messages received yet.</div>
  ) : (
    <div className="row row-cols-1 row-cols-md-2 g-4">
      {contacts.filter(item => item.loginId === CheckLogin).map((item) => (
        <div key={item._id} className="col mb-3">
          <div className="card h-80 shadow-sm border-0">
            <div className="card-body">
              <h5 className="card-title text-primary">
                <i className="bi bi-person-circle me-2"></i>{item.name}
              </h5>
              <h6 className="card-subtitle mb-2 text-muted">
                <i className="bi bi-envelope-at-fill me-2"></i>{item.email}
              </h6>
              <p className="card-text mt-3">
                <i className="bi bi-chat-left-text-fill me-2 text-secondary"></i>{item.message}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )}
</div>


    </div>
  );
};

export default ContactUs;
