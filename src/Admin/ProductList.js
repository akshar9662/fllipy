import React, { useEffect, useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";

export default function ProductList({SignupData,CheckLogin}) {
      const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("https://fllipy.onrender.com/api/products").then((res) => setProducts(res.data));
  }, []);

  const deleteProduct = async (id) => {
    await axios.delete(`https://fllipy.onrender.com/api/products/${id}`);
    setProducts(products.filter((p) => p._id !== id));
  };
 const handleLogin = () => {
      navigate("../adminlogin");
    };
  
    const user = SignupData.find((u) => String(u._id) === String(CheckLogin));
  if (!SignupData || SignupData.length === 0) {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="text-muted">⏳ Loading Products...</div>
    </div>
  );
}

    if (!user) {
      return (
         <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="border p-4 rounded shadow text-center" style={{ maxWidth: '400px' }}>
          <h5 className="mb-3">Admin not found or not logged in.</h5>
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
 
  return (
    <div>
      <h3>Products</h3>
      <Link to="/admin/products/add" className="btn btn-success mb-3">
        Add Product
      </Link>
      <table className="table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Old Price</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.pname}
                    style={{ width: "100px", height: "100px" }}
                  />
                ) : (
                  <span className="text-muted">No Image</span>
                )}
              </td>
              <td>{product.pname}</td>
              <td>{product.oldPrice}</td>
              <td>{product.price}</td>
              <td>
                <div className="d-flex" style={{ gap: "10px" }}>
                  <Link
                    to={`/admin/products/edit/${product._id}`}
                    className="btn btn-warning btn-sm"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteProduct(product._id)}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
