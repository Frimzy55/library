import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ChangePassword() {
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset messages
    setMessage("");
    setError("");

    // Validate passwords
    if (newPassword !== confirmPassword) {
      setError("New password and confirm password do not match.");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("You are not authenticated. Please log in.");
        return;
      }

      const response = await axios.post(
        "http://localhost:5002/change-password",
        { currentPassword, newPassword },
        { headers: { Authorization: token } }
      );

      // Display success message
      setMessage(response.data.message);

      // Redirect to login page after 2 seconds
      setTimeout(() => {
        localStorage.removeItem("token"); // Clear the token
        navigate("/login"); // Redirect to login page
      }, 2000);
    } catch (error) {
      console.error("Error changing password:", error);

      // Handle specific error cases
      if (error.response) {
        if (error.response.status === 401) {
          setError("Invalid or expired token. Please log in again.");
        } else if (error.response.status === 400) {
          setError(error.response.data.message || "Current password is incorrect.");
        } else {
          setError("An error occurred. Please try again.");
        }
      } else {
        setError("Network error. Please check your connection.");
      }
    }
  };

  return (
    <div className="change-password-container">
      <h2>Change Password</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Current Password</label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Confirm New Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Change Password</button>
      </form>

      {/* Display success message */}
      {message && <p className="message success">{message}</p>}

      {/* Display error message */}
      {error && <p className="message error">{error}</p>}
    </div>
  );
}

export default ChangePassword;