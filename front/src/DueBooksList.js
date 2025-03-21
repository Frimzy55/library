import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import "./DueBooksList.css"; // Optional CSS file for styling

const DueBooksList = () => {
  const [dueBooks, setDueBooks] = useState([]);
  const [showDueBooks, setShowDueBooks] = useState(false);
  const [dueCount, setDueCount] = useState(0);

  useEffect(() => {
    const fetchDueCount = async () => {
      try {
        const response = await axios.get("http://localhost:5002/api/due-books-count");
        setDueCount(response.data.dueCount);
      } catch (error) {
        console.error("Error fetching due books count:", error);
      }
    };

    fetchDueCount();
  }, []);

  const fetchDueBooks = async () => {
    try {
      const response = await axios.get("http://localhost:5002/api/due-books");
      setDueBooks(response.data.dueBooks);
      setShowDueBooks(!showDueBooks);
    } catch (error) {
      console.error("Error fetching due books:", error);
    }
  };

  return (
    <div style={{ position: "relative" }}>
      <FontAwesomeIcon
        icon={faBell}
        style={{ color: "white", fontSize: "30px", cursor: "pointer" }}
        onClick={fetchDueBooks}
      />
      {dueCount > 0 && (
        <span className="notification-badge">{dueCount}</span>
      )}

      {showDueBooks && (
        <div className="due-books-dropdown">
          <h4>Due Books</h4>
          {dueBooks.length > 0 ? (
            <ul>
              {dueBooks.map((book, index) => (
                <li key={index}>
                  <strong>{book.book_title}</strong> - Borrower: {book.borrower_name} (Due: {book.return_date})
                </li>
              ))}
            </ul>
          ) : (
            <p>No books due today.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default DueBooksList;
