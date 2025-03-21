import React, { useState } from 'react';
import StaffRegistration from './StaffRegistration'; 
import ManageUser from './ManageUser';

const Admin = () => {
  const [selectedMenu, setSelectedMenu] = useState('dashboard'); // Default menu

  const renderMenuContent = () => {
    switch (selectedMenu) {
      case 'dashboard':
        return <p>Welcome to the Admin Dashboard! Here you can manage the system.</p>;
      case 'staffRegistration':
        return <StaffRegistration onRegistrationSuccess={() => setSelectedMenu('dashboard')} />;
      case 'manageUsers':
        return <ManageUser onRegistrationSuccess={() => setSelectedMenu('dashboard')} />;
      case 'settings':
        return <p>Manage system settings here.</p>;
      default:
        return <p>Select an option from the menu.</p>;
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