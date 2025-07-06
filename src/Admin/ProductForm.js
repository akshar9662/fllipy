import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function ProductForm() {
  const [form, setForm] = useState({ pname: "", price: "", oldPrice: "", image: "", imageFile: null });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      axios.get(`https://fllipy.onrender.com/api/products/${id}`).then((res) =>
        setForm({
          pname: res.data.pname || "",
          price: res.data.price || "",
          oldPrice: res.data.oldPrice || "",
          image: res.data.image || "",
          imageFile: null
        })
      );
    }
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm((prev) => ({
          ...prev,
          image: reader.result,    
          imageFile: file
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let imagePath = form.image;

    if (form.imageFile) {
      const imgData = new FormData();
      imgData.append("image", form.imageFile);
      const imgRes = await axios.post("https://fllipy.onrender.com/api/upload", imgData);
    imagePath = `https://fllipy.vercel.app/${imgRes.data.path}`;
    }

    const productData = {
      pname: form.pname,
      price: form.price,
      oldPrice: form.oldPrice,
      image: imagePath
    };

    if (id) {
      await axios.put(`https://fllipy.onrender.com/api/products/${id}`, productData);
    } else {
      await axios.post("https://fllipy.onrender.com/api/products", productData);
    }

    navigate("/admin/products");
  };

  return (
    <div>
      <button className="btn btn-outline-secondary" onClick={() => navigate("/admin/products")}>
  <i className="bi bi-arrow-left"></i> ← Back
</button>
      <h3>{id ? "Edit" : "Add"} Product</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Product Name</label>
          <input type="text" name="pname" value={form.pname} onChange={handleChange} className="form-control" required />
        </div>

        <div className="mb-3">
          <label className="form-label">Old Price</label>
          <input type="number" name="oldPrice" value={form.oldPrice} onChange={handleChange} className="form-control" required />
        </div>

        <div className="mb-3">
          <label className="form-label">Price</label>
          <input type="number" name="price" value={form.price} onChange={handleChange} className="form-control" required />
        </div>

        <div className="mb-3">
          <label className="form-label">Product Image</label>
          <input type="file" accept="image/*" onChange={handleImageChange} className="form-control" />
          {form.image && (
            <img
              src={form.image.startsWith("data") ? form.image : form.image}
              alt="Preview"
              style={{ width: "120px", height: "100px", marginTop: "10px" }}
            />
          )}
        </div>

        <button type="submit" className="btn btn-primary">
          {id ? "Update" : "Save"}
        </button>
      </form>
    </div>
  );
}
