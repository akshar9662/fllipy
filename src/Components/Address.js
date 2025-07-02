import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function AddressForm({
  SignupData,
  CheckLogin,
  onAddress,
  AddressData,
  onDelete,
  onSaveAddress,
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [addressType, setAddressType] = useState("Home");
  const [editIndex, setEditIndex] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const handlephoneChange = (e) => {
    const digitsOnly = e.target.value;
    if (digitsOnly.length <= 10) {
      setPhone(digitsOnly);
    }
  };

  const handlepincodeChange = (e) => {
    const digitsOnly = e.target.value;
    if (digitsOnly.length <= 6) {
      setPincode(digitsOnly);
    }
  };

  const AddAddress = () => {
    if (!name || !phone || !address || !city || !state || !pincode) {
      alert("Please fill all the required fields!");
      return;
    } else if (!/^[a-zA-Z\s]+$/.test(name)) {
      alert("Name should only contain alphabetical characters.");
      return;
    }
    onAddress({ name, phone, address, city, state, pincode, addressType });
    clearForm();
  };

  const SaveAddress = () => {
    if (!name || !phone || !address || !city || !state || !pincode) {
      alert("Please fill all the required fields!");
      return;
    } else if (!/^[a-zA-Z\s]+$/.test(name)) {
      alert("Name should only contain alphabetical characters.");
      return;
    }

    const newAddress = {
      _id: AddressData[editIndex]._id,
      name,
      phone,
      address,
      city,
      state,
      pincode,
      addressType,
    };

    if (editIndex != null) {
      const updatedAddress = [...AddressData];
      updatedAddress[editIndex] = newAddress;
      onSaveAddress(updatedAddress, editIndex);
      clearForm();

      if (location.state?.from === "payment") {
        navigate("/payment", { replace: true });
      }
      if (location.state?.from === "profile") {
        navigate("/payment", { replace: true });
      }
    }
  };

  const onEdit = (index) => {
    const SelectedIndex = AddressData[index];
    setName(SelectedIndex.name);
    setPhone(SelectedIndex.phone);
    setAddress(SelectedIndex.address);
    setCity(SelectedIndex.city);
    setState(SelectedIndex.state);
    setPincode(SelectedIndex.pincode);
    setAddressType(SelectedIndex.addressType);
    setEditIndex(index);
  };

  const clearForm = () => {
    setName("");
    setPhone("");
    setAddress("");
    setCity("");
    setState("");
    setPincode("");
    setAddressType("Home");
    setEditIndex(null);
  };

  useEffect(() => {
    if (location.state && location.state.editIndex != null) {
      const index = location.state.editIndex;
      const SelectedIndex = AddressData[index];
      if (SelectedIndex) {
        setName(SelectedIndex.name);
        setPhone(SelectedIndex.phone);
        setAddress(SelectedIndex.address);
        setCity(SelectedIndex.city);
        setState(SelectedIndex.state);
        setPincode(SelectedIndex.pincode);
        setAddressType(SelectedIndex.addressType);
        setEditIndex(index);
      }
    }
  }, [AddressData, location.state]);
 const user = SignupData.find((u) => String(u._id) === String(CheckLogin));
  
  
    const handleLogin = () => {
      navigate("/login");
    };
  
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
 if (!SignupData || SignupData.length === 0) {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="text-muted">⏳ Loading Your Addresses...</div>
    </div>
  );
}
  return (
    <div className="container my-4">
      <Link to="/products" className="btn btn-outline-primary mb-3">
        ← Back To Products
      </Link>
      <h4 className="mb-4">Shipping Address</h4>

      <form className="border p-4 rounded shadow-sm">
        <div className="row mb-3">
          <div className="col-md-6">
            <label>Full Name</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              required
            />
          </div>
          <div className="col-md-6">
            <label>Phone Number</label>
            <input
              type="number"
              className="form-control"
              value={phone}
              onChange={handlephoneChange}
              placeholder="Enter phone number"
              required
            />
          </div>
        </div>

        <div className="mb-3">
          <label>Address</label>
          <textarea
            className="form-control"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter full address"
            rows="2"
            required
          />
        </div>

        <div className="row mb-3">
          <div className="col-md-4">
            <label>City</label>
            <input
              type="text"
              className="form-control"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter city"
              required
            />
          </div>
          <div className="col-md-4">
            <label>State</label>
            <input
              type="text"
              className="form-control"
              value={state}
              onChange={(e) => setState(e.target.value)}
              placeholder="Enter state"
              required
            />
          </div>
          <div className="col-md-4">
            <label>Pincode</label>
            <input
              type="number"
              className="form-control"
              value={pincode}
              onChange={handlepincodeChange}
              placeholder="Enter pincode"
              required
            />
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Address Type</label>
          <div className="d-flex flex-wrap gap-3 mt-2">
            {["Home", "Work", "Other"].map((type) => (
              <div key={type} className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="addressType"
                  value={type}
                  checked={addressType === type}
                  onChange={(e) => setAddressType(e.target.value)}
                />
                <label className="form-check-label">{type}</label>
              </div>
            ))}
          </div>
        </div>
        {editIndex === null ? (
          <button
            type="button"
            className="btn btn-primary"
            onClick={AddAddress}
          >
            ➕ Add Address
          </button>
        ) : (
          <button
            type="button"
            className="btn btn-primary"
            onClick={SaveAddress}
          >
            💾 Save Address
          </button>
        )}
      </form>

      {AddressData.length > 0 && (
        <div className="table-responsive mt-4">
          <table className="table table-bordered text-center">
            <thead className="table-light">
              <tr>
                <th>Name</th>
                <th>Mobile No.</th>
                <th>Address</th>
                <th>City</th>
                <th>State</th>
                <th>Pincode</th>
                <th>Type</th>
                <th>Update</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {AddressData.map((data, index) => (
                <tr key={index}>
                  <td>{data.name}</td>
                  <td>{data.phone}</td>
                  <td>{data.address}</td>
                  <td>{data.city}</td>
                  <td>{data.state}</td>
                  <td>{data.pincode}</td>
                  <td>{data.addressType}</td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() => onEdit(index)}
                    >
                      ✏️
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => onDelete(index)}
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
