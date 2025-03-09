import React, { useState } from "react";
import axios from "axios";

function MembershipRegistration() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    address: "",
    membership_type: "",
    max_books: "",
    date_joined: "",
    status: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/register", formData);
      alert(response.data.message);
      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        address: "",
        membership_type: "",
        max_books: '',
        date_joined: "",
        status: "",
      });
    } catch (error) {
      alert("Error registering member");
    }
  };

  return (
    <div className="card p-3" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h5 className="mb-3 text-secondary">Member Registration</h5>
      <form onSubmit={handleSubmit}>
        <div className="row g-2">
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label className="form-label small mb-1">First Name</label>
              <input 
                type="text" 
                className="form-control form-control-sm" 
                name="first_name" 
                value={formData.first_name} 
                onChange={handleChange} 
                required 
              />
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="form-group">
              <label className="form-label small mb-1">Last Name</label>
              <input 
                type="text" 
                className="form-control form-control-sm" 
                name="last_name" 
                value={formData.last_name} 
                onChange={handleChange} 
                required 
              />
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="form-group">
              <label className="form-label small mb-1">Email</label>
              <input 
                type="email" 
                className="form-control form-control-sm" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                required 
              />
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="form-group">
              <label className="form-label small mb-1">Phone</label>
              <input 
                type="text" 
                className="form-control form-control-sm" 
                name="phone" 
                value={formData.phone} 
                onChange={handleChange} 
              />
            </div>
          </div>

          <div className="col-12">
            <div className="form-group">
              <label className="form-label small mb-1">Address</label>
              <textarea 
                className="form-control form-control-sm" 
                name="address" 
                value={formData.address} 
                onChange={handleChange}
                rows="2"
              ></textarea>
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="form-group">
              <label className="form-label small mb-1">Membership Type</label>
              <select 
                className="form-select form-select-sm" 
                name="membership_type" 
                value={formData.membership_type} 
                onChange={handleChange}
              >
                <option value="Regular">Regular</option>
                <option value="Premium">Premium</option>
                <option value="Staff">Staff</option>
                <option value="Student">Student</option>
              </select>
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="form-group">
              <label className="form-label small mb-1">Max Books Allowed</label>
              <input 
                type="number" 
                className="form-control form-control-sm" 
                name="max_books" 
                value={formData.max_books} 
                onChange={handleChange} 
              />
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="form-group">
              <label className="form-label small mb-1">Date Joined</label>
              <input 
                type="date" 
                className="form-control form-control-sm" 
                name="date_joined" 
                value={formData.date_joined} 
                onChange={handleChange} 
                required 
              />
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="form-group">
              <label className="form-label small mb-1">Status</label>
              <select 
                className="form-select form-select-sm" 
                name="status" 
                value={formData.status} 
                onChange={handleChange}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Banned">Banned</option>
              </select>
            </div>
          </div>
        </div>

        <div className="mt-3 d-flex justify-content-end">
          <button 
            type="submit" 
            className="btn btn-sm btn-success"
            style={{ width: '160px' }}
          >
            Register Member
          </button>
        </div>
      </form>
    </div>
  );
}

export default MembershipRegistration;