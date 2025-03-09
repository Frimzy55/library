import React, { useState } from 'react';
import styled from 'styled-components';

// LoginInterface component (placeholder, replace with actual implementation)
const LoginInterface = ({ onClose }) => {
  return (
    <ModalOverlay>
      <ModalContent>
        <h2>Login Page</h2>
        <p>This is the login page.</p>
        <button onClick={onClose}>Close</button>
      </ModalContent>
    </ModalOverlay>
  );
};

// Main App Component
const LibraryManagementSystem = () => {
  const [showLogin, setShowLogin] = useState(false);

  const handleNextClick = () => {
    setShowLogin(true);
  };

  const handleCloseLogin = () => {
    setShowLogin(false);
  };

  return (
    <AppContainer>
      <Logo src="logo.jpeg" alt="Library Logo" />
      <Subtitle>REGIONAL HEAD OFFICE</Subtitle>
      <NextButton onClick={handleNextClick}>Next</NextButton>
      {showLogin && <LoginInterface onClose={handleCloseLogin} />}
    </AppContainer>
  );
};

// Styled Components
const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f0f0;
`;

const Logo = styled.img`
  width: 160px;
  height: 140px;
  margin-bottom: 20px;
`;

const Subtitle = styled.h1`
  font-size: 25px;
  font-weight: 300;
  margin-bottom: 20px;
`;

const NextButton = styled.button`
  font-size: 16px;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
`;

export default LibraryManagementSystem;