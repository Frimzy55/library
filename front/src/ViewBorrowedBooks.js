import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";

function ViewBorrowedBooks() {
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showBorrowed, setShowBorrowed] = useState(false);

  useEffect(() => {
    fetchBorrowedBooks();
  }, []);

  const fetchBorrowedBooks = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get("http://localhost:5002/api/borrowed-books");
      setBorrowedBooks(response.data);
    } catch (error) {
      setError("Failed to fetch borrowed books. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card p-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Active Borrowed Books</h3>
        <button
          className="btn btn-outline-secondary"
          onClick={() => setShowBorrowed(!showBorrowed)}
        >
          {showBorrowed ? (
            <i className="fas fa-eye-slash"></i>
          ) : (
            <i className="fas fa-eye"></i>
          )}
        </button>
      </div>

      {showBorrowed && (
        <>
          {loading && <p className="text-warning">Loading borrowed books...</p>}
          {error && <p className="text-danger">{error}</p>}

          {borrowedBooks.length > 0 ? (
            <ul className="list-group mt-3">
              {borrowedBooks.map((book) => {
                const dueDate = moment(book.due_date).startOf('day');
                const today = moment().startOf('day');
                const daysLeft = dueDate.diff(today, 'days');
                
                return (
                  <li key={book.id} className="list-group-item">
                    <strong>{book.book_title}</strong> borrowed by {book.full_name} on {moment(book.borrow_date).format('MMMM Do YYYY')}, due on {dueDate.format('MMMM Do YYYY')}.
                    <br />
                    {daysLeft === 0 ? (
                      <span className="text-warning">Return today</span>
                    ) : daysLeft > 0 ? (
                      <span className="text-success">{daysLeft} {daysLeft === 1 ? 'day' : 'days'} left</span>
                    ) : (
                      <span className="text-danger">Overdue by {Math.abs(daysLeft)} {Math.abs(daysLeft) === 1 ? 'day' : 'days ago' }</span>
                    )}
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="text-warning">No borrowed books found.</p>
          )}
        </>
      )}
    </div>
  );
}

export default ViewBorrowedBooks;
