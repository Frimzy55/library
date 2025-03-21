import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook, faBookOpen, faSyncAlt, faUsers,
  faBell, faUserCheck
} from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from 'react-router-dom'; // ✅ Import useLocation and useNavigate

function AdminPage() {
  const location = useLocation();
  const navigate = useNavigate(); // Use navigate for redirection
  const [message, setMessage] = useState('');
  const [username, setUsername] = useState('');

  const [stats, setStats] = useState({
    totalBooks: 0,
    borrowedBooks: 0,
    dueBooks: 0,
    totalClients: 0,
    overdueBooks: 0,
    activeBorrowers: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get("http://localhost:5002/api/library-stats");
        setStats(response.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };
    fetchStats();
  }, []);

  const cardVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
    hover: { scale: 1.02 }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (!token || role !== 'admin') {
      navigate('/');
      return;
    }

    axios
      .get('http://localhost:5002/admin', {
        headers: { Authorization: token },
      })
      .then((res) => setMessage(res.data.message))
      .catch(() => navigate('/'));
  }, [navigate]);

  return (
    <div className="container-fluid px-3 py-4">
      <h4 className="mb-4 fw-bold text-dark text-center">Library Overview</h4>
      
      <div className="row g-3">
        {[
          { 
            icon: faBook, 
            title: "Total Books", 
            value: stats.totalBooks, 
            gradient: "linear-gradient(45deg, #4e73df, #224abe)",
          },
          { 
            icon: faBookOpen, 
            title: "Borrowed", 
            value: stats.borrowedBooks, 
            gradient: "linear-gradient(45deg, #e74a3b, #c23020)",
          },
          { 
            icon: faSyncAlt, 
            title: "Due Today", 
            value: stats.dueBooks, 
            gradient: "linear-gradient(45deg, #f6c23e, #dda20a)",
          },
          { 
            icon: faUsers, 
            title: "Members", 
            value: stats.totalClients, 
            gradient: "linear-gradient(45deg, #1cc88a, #13855c)",
          },
          { 
            icon: faBell, 
            title: "Overdue", 
            value: stats.overdueBooks, 
            gradient: "linear-gradient(45deg, #858796, #5a5c69)",
          },
          { 
            icon: faUserCheck, 
            title: "Borrowers", 
            value: stats.activeBorrowers, 
            gradient: "linear-gradient(45deg, #36b9cc, #258391)",
          },
        ].map((item, index) => (
          <motion.div 
            key={index}
            className="col-6 col-md-4 col-lg-3"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: index * 0.1 }}
            whileHover="hover"
          >
            <div 
              className="card border-0 shadow-sm h-100"
              style={{ 
                background: item.gradient,
                borderRadius: "10px",
                cursor: "pointer",
              }}
            >
              <div className="card-body p-3">
                <div className="d-flex align-items-center">
                  <div className="me-3">
                    <FontAwesomeIcon 
                      icon={item.icon} 
                      size="sm" 
                      className="text-white"
                    />
                  </div>
                  <div className="text-white">
                    <div className="text-uppercase mb-1" style={{ fontSize: "0.7rem", fontWeight: 600 }}>
                      {item.title}
                    </div>
                    <div style={{ fontSize: "1.2rem", fontWeight: 700 }}>
                      {item.value || 0}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Compact Status Summary */}
      <div className="row mt-4">
        <div className="col-12">
          <div className="card shadow-sm border-0 p-3">
            <div className="d-flex flex-wrap gap-4 justify-content-center">
              <div className="d-flex align-items-center">
                <div className="bg-primary rounded-circle me-2" style={{ width: "10px", height: "10px" }}></div>
                <small>Available: {stats.totalBooks - stats.borrowedBooks}</small>
              </div>
              <div className="d-flex align-items-center">
                <div className="bg-danger rounded-circle me-2" style={{ width: "10px", height: "10px" }}></div>
                <small>Borrowed: {stats.borrowedBooks}</small>
              </div>
              <div className="d-flex align-items-center">
                <div className="bg-warning rounded-circle me-2" style={{ width: "10px", height: "10px" }}></div>
                <small>Overdue: {stats.overdueBooks}</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPage;