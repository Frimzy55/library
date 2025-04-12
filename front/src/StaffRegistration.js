import React, { useState } from "react";
import axios from "axios";
import { FaCamera } from "react-icons/fa"; // Import camera icon

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user", // Default role is 'user'
    image: null, // Add image field to form data
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [imagePreview, setImagePreview] = useState(null); // State for image preview

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });

      // Create a preview URL for the image
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const validate = () => {
    let tempErrors = {};
    if (!formData.name) tempErrors.name = "Name is required";
    if (!formData.email) tempErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      tempErrors.email = "Invalid email format";
    if (!formData.password) tempErrors.password = "Password is required";
    if (formData.password !== formData.confirmPassword)
      tempErrors.confirmPassword = "Passwords do not match";
    if (!formData.image) tempErrors.image = "Image is required"; // Validate image upload

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const data = new FormData();
        data.append("name", formData.name);
        data.append("email", formData.email);
        data.append("password", formData.password);
        data.append("role", formData.role);
        data.append("image", formData.image); // Append the image file

        const response = await axios.post("http://localhost:5002/signup", data, {
          headers: {
            "Content-Type": "multipart/form-data", // Set content type for file upload
          },
        });

        setSuccessMessage(response.data.message);
        setFormData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          role: "user",
          image: null,
        }); // Reset form
        setImagePreview(null); // Clear image preview
      } catch (error) {
        console.error("Signup error:", error.response?.data?.message || "An error occurred");
        setErrors({ submit: error.response?.data?.message || "An error occurred" });
      }
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Register New Staff</h2>
              {successMessage && (
                <div className="alert alert-success text-center">{successMessage}</div>
              )}
              {errors.submit && (
                <div className="alert alert-danger text-center">{errors.submit}</div>
              )}
              <form onSubmit={handleSubmit}>
                {/* Image Upload Section */}
                <div className="mb-3 text-center position-relative">
                  <label htmlFor="image" style={{ cursor: "pointer" }}>
                    <div
                      style={{
                        width: "150px",
                        height: "150px",
                        borderRadius: "50%",
                        overflow: "hidden",
                        margin: "0 auto",
                        position: "relative",
                        border: "2px solid #ddd",
                      }}
                    >
                      {imagePreview ? (
                        <img
                          src={imagePreview}
                          alt="Profile Preview"
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                      ) : (
                        <div
                          style={{
                            width: "100%",
                            height: "100%",
                            backgroundColor: "#f0f0f0",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <FaCamera size={40} color="#888" />
                        </div>
                      )}
                      <div
                        style={{
                          position: "absolute",
                          bottom: "0",
                          right: "0",
                          backgroundColor: "rgba(0, 0, 0, 0.5)",
                          borderRadius: "50%",
                          padding: "8px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <FaCamera size={20} color="#fff" />
                      </div>
                    </div>
                  </label>
                  <input
                    type="file"
                    id="image"
                    name="image"
                    onChange={handleFileChange}
                    accept="image/*"
                    style={{ display: "none" }} // Hide the default file input
                  />
                  {errors.image && (
                    <div className="text-danger text-center mt-2">{errors.image}</div>
                  )}
                </div>
                {/* Rest of the Form */}
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input
                    type="text"
                    className={`form-control ${errors.name ? "is-invalid" : ""}`}
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                  {errors.name && (
                    <div className="invalid-feedback">{errors.name}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    className={`form-control ${errors.email ? "is-invalid" : ""}`}
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password"
                    className={`form-control ${errors.password ? "is-invalid" : ""}`}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  {errors.password && (
                    <div className="invalid-feedback">{errors.password}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                  <input
                    type="password"
                    className={`form-control ${errors.confirmPassword ? "is-invalid" : ""}`}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                  {errors.confirmPassword && (
                    <div className="invalid-feedback">{errors.confirmPassword}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="role" className="form-label">Role</label>
                  <select
                    className="form-select"
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                  >
                    <option value="admin">Admin</option>
                    <option value="user3">User(IT)</option>
                    <option value="user">User(Adults)</option>
                    <option value="user2">User2(Children)</option>
                    <option value="hr">Hr</option>
                  </select>
                </div>
                <div className="d-grid">
                  <button type="submit" className="btn btn-success">
                    Sign Up
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;