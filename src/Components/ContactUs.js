import React, { useState } from "react";

const ContactUs = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setForm({ name: "", email: "", message: "" });
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

            <button type="submit" className="btn btn-primary">
              Submit
            </button>

            {submitted && (
              <div className="alert alert-success mt-3">
                Thank you! We'll get back to you soon.
              </div>
            )}
          </form>
        </div>

        <div className="col-md-6 mb-4">
          <h4 className="mb-3">Contact Information</h4>
          <p>
            <strong>📍 Address:</strong> Gujarat, India
          </p>
          <p>
            <strong>📧 Email:</strong> support@fllipy.in
          </p>
          <p>
            <strong>📞 Phone:</strong> +91-9662428169
          </p>

        </div>
      </div>
    </div>
  );
};

export default ContactUs;
