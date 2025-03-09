import React, { useState, useEffect } from "react";
import axios from "axios";

const ReturnBookForm = ({ member, book, onReturnSuccess }) => {
  const [borrowRecord, setBorrowRecord] = useState(null);
  const [returnDate, setReturnDate] = useState(new Date().toISOString().split("T")[0]);
  const [lateFee, setLateFee] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBorrowRecord = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/borrows?memberId=${member.member_id}&bookId=${book.id}`
        );
        
        if (response.data.length === 0) {
          throw new Error("No active borrowing record found");
        }
        
        setBorrowRecord(response.data[0]);
      } catch (err) {
        setError(err.message || "Error fetching borrowing record");
      } finally {
        setLoading(false);
      }
    };

    fetchBorrowRecord();
  }, [member, book]);

  useEffect(() => {
    if (borrowRecord) {
      const dueDate = new Date(borrowRecord.due_date);
      const returnDateObj = new Date(returnDate);
      const timeDiff = returnDateObj - dueDate;
      const daysLate = Math.ceil(timeDiff / (1000 * 3600 * 24));
      setLateFee(daysLate > 0 ? daysLate * 5 : 0); // Assuming $5/day late fee
    }
  }, [returnDate, borrowRecord]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/returns", {
        memberId: member.member_id,
        bookId: book.id,
        returnDate,
        lateFee
      });

      alert(response.data.message || "Book returned successfully");
      onReturnSuccess();
    } catch (err) {
      alert(err.response?.data?.message || "Error returning book");
    }
  };

  if (loading) return <div>Loading borrowing details...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="card p-4 mt-3">
      <h4>Return Book Form</h4>
      <form onSubmit={handleSubmit}>
        <div className="row g-3 mb-3">
          <div className="col-md-6">
            <label className="form-label">Borrower ID</label>
            <input type="text" className="form-control" value={member.member_id} readOnly />
          </div>
          <div className="col-md-6">
            <label className="form-label">Borrower Name</label>
            <input type="text" className="form-control" value={`${member.first_name} ${member.last_name}`} readOnly />
          </div>
        </div>

        <div className="row g-3 mb-3">
          <div className="col-md-6">
            <label className="form-label">Book ID</label>
            <input type="text" className="form-control" value={book.id} readOnly />
          </div>
          <div className="col-md-6">
            <label className="form-label">Book Title</label>
            <input type="text" className="form-control" value={book.book_title} readOnly />
          </div>
        </div>

        <div className="row g-3 mb-3">
          <div className="col-md-4">
            <label className="form-label">Issue Date</label>
            <input type="text" className="form-control" value={borrowRecord.issue_date} readOnly />
          </div>
          <div className="col-md-4">
            <label className="form-label">Due Date</label>
            <input type="text" className="form-control" value={borrowRecord.due_date} readOnly />
          </div>
          <div className="col-md-4">
            <label className="form-label">Return Date</label>
            <input
              type="date"
              className="form-control"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Late Fee</label>
          <div className="input-group">
            <span className="input-group-text">$</span>
            <input type="number" className="form-control" value={lateFee.toFixed(2)} readOnly />
          </div>
        </div>

        <div className="d-flex gap-2">
          <button type="submit" className="btn btn-success">Confirm Return</button>
          <button type="button" className="btn btn-secondary" onClick={onReturnSuccess}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReturnBookForm;