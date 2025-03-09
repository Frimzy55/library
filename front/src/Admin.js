import React, { useState } from 'react';
import axios from 'axios'; // If you plan to use axios for API calls

const Admin = () => {
  const [selectedMenu, setSelectedMenu] = useState('dashboard'); // Default menu

  const renderMenuContent = () => {
    switch (selectedMenu) {
      case 'dashboard':
        return <p>Welcome to the Admin Dashboard! Here you can manage the system.</p>;
      case 'staffRegistration':
        return (
          <form onSubmit={handleSubmit}>
            <h5 className="text-center mb-4">Register New Staff</h5>
            <div className="mb-3">
              <label htmlFor="staffName" className="form-label">Staff Name</label>
              <input
                type="text"
                id="staffName"
                className="form-control"
                value={staffName}
                onChange={(e) => setStaffName(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Username</label>
              <input
                type="text"
                id="username"
                className="form-control"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                id="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                id="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="role" className="form-label">Role</label>
              <select
                id="role"
                className="form-select"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              >
                <option value="staff">Staff</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary w-100 py-2 mt-3">Register Staff</button>
          </form>
        );
      case 'manageUsers':
        return <p>Here, you can view, update, or delete user accounts.</p>;
      case 'settings':
        return <p>Manage system settings here.</p>;
      default:
        return <p>Select an option from the menu.</p>;
    }
  };

  const [staffName, setStaffName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!staffName || !username || !password || !email || !role) {
      setMessage('Please fill out all fields');
      return;
    }

    try {
      const response = await axios.post('/api/register-staff', {
        staffName,
        username,
        password,
        email,
        role,
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Error registering staff. Please try again.');
    }
  };

  return (
    <div className="container min-vh-100 d-flex flex-column">
      {/* Horizontal Menu */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4 shadow-sm">
        <div className="container-fluid">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <button
                className={`btn btn-link nav-link ${selectedMenu === 'dashboard' ? 'active fw-bold' : ''}`}
                onClick={() => setSelectedMenu('dashboard')}
              >
                Dashboard
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`btn btn-link nav-link ${selectedMenu === 'staffRegistration' ? 'active fw-bold' : ''}`}
                onClick={() => setSelectedMenu('staffRegistration')}
              >
                Staff Registration
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`btn btn-link nav-link ${selectedMenu === 'manageUsers' ? 'active fw-bold' : ''}`}
                onClick={() => setSelectedMenu('manageUsers')}
              >
                Manage Users
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`btn btn-link nav-link ${selectedMenu === 'settings' ? 'active fw-bold' : ''}`}
                onClick={() => setSelectedMenu('settings')}
              >
                Settings
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* Main Content */}
      <div className="card shadow-sm flex-grow-1">
        <div className="card-body">{renderMenuContent()}</div>
      </div>
    </div>
  );
};

export default Admin;
