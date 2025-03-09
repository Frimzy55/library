// src/HomePage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from './image/logo.jpeg'; // Import the local image

function HomePage() {
  const navigate = useNavigate();

  const handleNext = () => {
    navigate('/login'); // Navigate to the login page
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 flex-column">
      {/* Add an image on top of the heading */}
      <img
        src={logo} // Use the imported image
        alt="Head Office"
        className="mb-3" // Add margin below the image
        style={{ width: '150px', height: '150px' }} // Adjust image size
      />
      <h5 className="mb-3">Regional Head Office</h5> {/* Reduced margin below the heading */}
      <br></br>
      <br></br>
      <br></br>
      <br></br>
    

      {/* Add a Next Button */}
      <button className="btn btn-success" onClick={handleNext}>
        Sign in
      </button>
    </div>
  );
}

export default HomePage;