import React, { useState, useEffect } from "react";
import axios from "axios";
import HrDashboard from "./HrDashboard";

import StaffAttendance from './StaffAttendance';

import logo from "./image/logo.jpeg";
import Admin from './Admin';
import ChangePassword from "./ChangePassword"; // Import the new component
import PayrollSalary from "./PayrollSalary"; // Import the new component for Payroll & Salary
import PerformanceEvaluation from "./PerformanceEvaluation"; // Import the new component for Performance & Evaluation
import RecruitmentOnboarding from "./RecruitmentOnboarding"; // Import the new component for Recruitment & Onboarding
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTachometerAlt, faBook, faUsers, faExchangeAlt, faChartLine,
  faCog, faUserCog, faSignOutAlt, faUserCircle, faBell, faKey, faUserShield,
  faMoneyCheckAlt, faClipboardCheck, faUserPlus // New icons for the new menu items
} from "@fortawesome/free-solid-svg-icons";
import "./MainPage.css";
import { useNavigate } from "react-router-dom";

function HrMainpage() {
  const navigate = useNavigate();
  const [selectedMenu, setSelectedMenu] = useState("dashboard");
  const [dueCount, setDueCount] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchDueCount = async () => {
      try {
        const response = await axios.get("http://localhost:5002/api/due-books-count");
        setDueCount(response.data.dueCount);
      } catch (error) {
        console.error("Error fetching due books count:", error);
      }
    };

    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    fetchDueCount();
    return () => clearInterval(timer);
  }, []);

  const handleMenuClick = (menu) => {
    if (menu === "logout") {
      // Clear any user session data here if needed
      navigate("/login");  // Redirect to login page
    } else {
      setSelectedMenu(menu);
    }
  };

  const formatDate = (date) => {
    const options = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return date.toLocaleDateString('en-US', options);
  };

  const formatTime = (date) => {
    const options = { 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit', 
      hour12: true 
    };
    return date.toLocaleTimeString('en-US', options);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUsername = localStorage.getItem('username'); // Retrieve the username

    if (!token || !storedUsername) {
      navigate('/');
      return;
    }

    // Set the username in the state
    setUsername(storedUsername);

    // Fetch dashboard data
    axios
      .get('http://localhost:5002/dashboard', {
        headers: { Authorization: token },
      })
      .then((res) => setMessage(res.data.message))
      .catch(() => navigate('/'));
  }, [navigate]);

  return (
    <div className="d-flex flex-column vh-100">
      <div
        style={{
          background: "hsl(29, 92.90%, 55.90%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "5px 20px",
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 1000,
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <img src={logo} alt="Logo" style={{ height: "50px", width: "70px", marginRight: "10px" }} />
        </div>
        
        <div style={{ 
          display: "flex", 
          flexDirection: "column", 
          alignItems: "center",
          color: "white",
          fontWeight: "500"
        }}>
          <div style={{ fontSize: "1.1rem" }}>{formatDate(currentTime)}</div>
          <div style={{ fontSize: "1.0rem", fontWeight: "300" }}>{formatTime(currentTime)}</div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div style={{ position: "relative" }}>
            <FontAwesomeIcon 
              icon={faBell} 
              style={{ 
                color: "white", 
                fontSize: "30px", 
                cursor: "pointer",
                transition: "transform 0.2s",
              }} 
              className="hover-scale"
            />
            {dueCount > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: "-5px",
                  right: "-5px",
                  backgroundColor: "red",
                  color: "white",
                  fontSize: "10px",
                  borderRadius: "50%",
                  padding: "5px 7px",
                  fontWeight: "bold",
                }}
              >
                {dueCount}
              </span>
            )}
          </div>
          
          {/* User Profile */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", cursor: "pointer", padding: "8px 12px", borderRadius: "8px", backgroundColor: "rgba(204, 103, 36, 0.69)", transition: "background-color 0.3s ease" }}>
            <FontAwesomeIcon icon={faUserCircle} style={{ color: "white", fontSize: "32px", filter: "drop-shadow(0 2px 4px rgba(53, 29, 187, 0.72))" }} />
            <p style={{ color: "white", margin: 0, fontWeight: "600", fontSize: "16px", letterSpacing: "0.5px" }}>{username}</p>
          </div>
        </div>
      </div>
   

      <div className="d-flex flex-grow-1" style={{ marginTop: "60px" }}>
        <div
          style={{
            width: "250px",
            backgroundColor:  "hsla(134, 95.90%, 19.00%, 0.88)",
            position: "sticky",
            top: "60px",
            height: "calc(100vh - 60px)",
            overflowY: "auto",
            boxShadow: "2px 0 10px rgba(0, 0, 0, 0.2)",
          }}
        >
          <div className="p-3">
            <ul className="nav flex-column">
              {[
                { id: "dashboard", label: "Dashboard", icon: faTachometerAlt },
                { id: "user-management", label: "User Management", icon: faUserShield },
                { id: "payroll-salary", label: "Payroll & Salary", icon: faMoneyCheckAlt }, // New menu item
                { id: "performance-evaluation", label: "Performance & Evaluation", icon: faClipboardCheck }, // New menu item
                { id: "recruitment-onboarding", label: "Recruitment & Onboarding", icon: faUserPlus }, // New menu item
                { id: "Member-Visit-Tracking-Attendance", label: "Attendance & Leave", icon: faCog },
                { id: "change-password", label: "Change Password", icon: faKey },
                { id: "logout", label: "Logout", icon: faSignOutAlt },
              ].map((item) => (
                <li className="nav-item" key={item.id}>
                  <button
                    className={`nav-link sidebar-link w-100 text-start ${
                      selectedMenu === item.id ? "active" : ""
                    }`}
                    onClick={() => handleMenuClick(item.id)}
                  >
                    <FontAwesomeIcon 
                      icon={item.icon} 
                      className="me-3" 
                      style={{ width: "20px" }} 
                    />
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="p-4 flex-grow-1" style={{ 
          overflowY: "auto", 
          height: "calc(100vh - 60px)",
          backgroundColor: " #f5f6fa"
        }}>
          {selectedMenu === "dashboard" && <HrDashboard />}
          {selectedMenu === "user-management" && <Admin />}
          {selectedMenu === "payroll-salary" && <PayrollSalary />} {/* Render PayrollSalary component */}
          {selectedMenu === "performance-evaluation" && <PerformanceEvaluation />} {/* Render PerformanceEvaluation component */}
          {selectedMenu === "recruitment-onboarding" && <RecruitmentOnboarding />} {/* Render RecruitmentOnboarding component */}
          {selectedMenu === "Member-Visit-Tracking-Attendance" && <StaffAttendance />}
          {selectedMenu === "change-password" && <ChangePassword />}
          {selectedMenu === "logout" && null}
        </div>
      </div>
    </div>
  );
}

export default HrMainpage;