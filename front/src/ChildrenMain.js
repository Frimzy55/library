import React, { useState, useEffect, Children } from "react";
import axios from "axios";
//import Dashboard from "./Dashboard";
import ChildrenDashBoard from "./ChildrenDashBoard";

import ClientManagement from "./ClientManagement";
import BooksManagement from "./BooksManagement";

import BorrowReturn from "./BorrowReturn";
import MemberVisit from './MemberVisit'
import ReportAnalysis from "./ReportAnalysis";
import logo from "./image/logo.jpeg";
import Admin from './Admin';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTachometerAlt, faBook, faUsers, faExchangeAlt, faChartLine,
  faCog, faUserCog, faSignOutAlt, faUserCircle, faBell
} from "@fortawesome/free-solid-svg-icons";
import "./MainPage.css";
import { useNavigate } from "react-router-dom";
import MainPage from "./MainPage";

function ChildrenMain() {
  const navigate = useNavigate();
  const [selectedMenu, setSelectedMenu] = useState("dashboard");
  const [dueCount, setDueCount] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());
   const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchDueCount = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/due-books-count");
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

  /*const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
  };*/


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
          backgroundColor: "hsl(29, 92.90%, 55.90%)",
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
          
          <FontAwesomeIcon 
            icon={faUserCircle} 
            style={{ 
              color: "white", 
              fontSize: "30px", 
              cursor: "pointer",
              transition: "transform 0.2s",
            }} 
            className="hover-scale"
          />
           <p className="ml-2 mb-0">{username }</p>
        </div>
      </div>
   

      <div className="d-flex flex-grow-1" style={{ marginTop: "60px" }}>
        <div
          style={{
            width: "250px",
            backgroundColor: "hsla(134, 95.90%, 19.00%, 0.88)",
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
                { id: "books-management", label: "Books Management", icon: faBook },
                { id: "members-management", label: "Client Management", icon: faUsers },
                { id: "Member-Visit-Tracking-Attendance", label: "Member Visit & Attendance", icon: faCog },
                { id: "borrow-return", label: "Borrow & Return", icon: faExchangeAlt },
                { id: "report-analysis", label: "Report & Analysis", icon: faChartLine },
               
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
          {selectedMenu === "dashboard" && <ChildrenDashBoard />}
          
          {selectedMenu === "books-management" && <BooksManagement />}
          
          {selectedMenu === "members-management" && <ClientManagement />}
          {selectedMenu === "Member-Visit-Tracking-Attendance" && <MemberVisit/>}
          {selectedMenu === "borrow-return" && <BorrowReturn />}
          {selectedMenu === "report-analysis" && <ReportAnalysis/>}
          
        
          {selectedMenu === "logout" && null}
        </div>
      </div>
    </div>
  );
}

export default ChildrenMain;