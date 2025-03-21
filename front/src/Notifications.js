import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import "./Notifications.css"; // Create this CSS file for styling

const Notifications = ({ show, onClose }) => {
  const [dueBooks, setDueBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (show) {
      const fetchDueBooks = async () => {
        try {
          const response = await axios.get("http://localhost:5002/api/due-books");
          setDueBooks(response.data.dueBooks);
          setError("");
        } catch (err) {
          console.error("Error fetching due books:", err);
          setError("Failed to load due books");
        } finally {
          setLoading(false);
        }
      };

      fetchDueBooks();
    }
  }, [show]);

  if (!show) return null;

  return (
    <div className="notifications-modal">
      <div className="notifications-content">
        <div className="notifications-header">
          <h3>Due Books Today</h3>
          <button onClick={onClose} className="close-btn">
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : dueBooks.length === 0 ? (
          <p>No books due today</p>
        ) : (
          <ul className="due-books-list">
            {dueBooks.map((book, index) => (
              <li key={index} className="due-book-item">
                <div className="book-info">
                  <strong>{book.book_title}</strong>
                  <div>Borrower: {book.borrower_name}</div>
                  <div>Due Date: {new Date(book.return_date).toLocaleDateString()}</div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Notifications;