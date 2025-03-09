import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment"; // Import moment.js

const ClientBorrowingHistory = () => {
  const [borrowingHistory, setBorrowingHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchBorrowingHistory();
  }, []);

  const fetchBorrowingHistory = () => {
    setLoading(true);
    setError("");

    axios
      .get("http://localhost:5000/api/borrowing-history")
      .then((response) => {
        setBorrowingHistory(response.data);
      })
      .catch(() => {
        setError("Error fetching borrowing history.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="card p-4">
      <h3 className="mb-3">Client Borrowing History</h3>
      {loading && <p>Loading...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && borrowingHistory.length === 0 && <p>No borrowing records found.</p>}

      {!loading && borrowingHistory.length > 0 && (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Full Name</th>
              <th>Book Title</th>
              <th>Borrow Date</th>
              <th>Due Date</th>
              <th>Return Date</th>
              <th>Late Fee ($)</th>
            </tr>
          </thead>
          <tbody>
            {borrowingHistory.map((record) => (
              <tr key={record.id}>
                <td>{record.id}</td>
                <td>{record.full_name}</td>
                <td>{record.book_title}</td>
                <td>{moment(record.borrow_date).format("YYYY-MM-DD")}</td>
                <td>{moment(record.due_date).format("YYYY-MM-DD")}</td>
                <td>{record.return_date ? moment(record.return_date).format("YYYY-MM-DD") : "Not Returned"}</td>
                
                <td>${Number(record.late_fee).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ClientBorrowingHistory;
