import React, { useState } from "react";
import axios from "axios";

function BorrowBookForm({ member, book }) {
  const [borrowDate, setBorrowDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleBorrow = async () => {
    if (!borrowDate || !returnDate) {
      setError("Please select both borrow and return dates.");
      return;
    }
  
    setLoading(true);
    setError("");
    setSuccess("");
  
    try {
      const response = await axios.post("http://localhost:5000/api/borrow", {
        memberId: member.member_id,
        fullName: `${member.first_name.trim()} ${member.last_name.trim()}`,
        phoneNumber: member.phone,
        email: member.email,
        bookId: book.id,
        bookArthur: book.author,
        bookTitle:book.book_title_statement,
        borrowDate,
        returnDate,
      });
  
      if (response.status === 201) {
        setSuccess("Book borrowed successfully!");
      }
    } catch (err) {
      setError("Failed to borrow the book. Please try again.");
      console.error("Borrow error:", err);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="card p-4">
      <h4>Borrow Book</h4>
      <p>Fill in the details to borrow the selected book.</p>

      {error && <p className="text-danger">{error}</p>}
      {success && <p className="text-success">{success}</p>}

      <div>
        <h5>MEMBER DETAILS</h5>
         <label htmlFor="memberId" className="form-label">
         Member ID
       </label>
        <input
          type="text"
         id="memberId"
         className="form-control"
         value={`(${member.member_id})`}
         disabled
        />
 
      </div>
      <div>
         <label htmlFor="fullName" className="form-label">
         Full Name
       </label>
       <input
  type="text"
  id="fullname"
  className="form-control"
  value={`${member.first_name.trim()} ${member.last_name.trim()}`}
  disabled
/>

 
      </div>
      <div>
         <label htmlFor="phoneNumber" className="form-label">
         Phone Number
       </label>
        <input
          type="text"
         id="phoneNumber"
         className="form-control"
         value={`${member.phone}`}
         disabled
        />
 
      </div>
      <div>
         <label htmlFor="email" className="form-label">
         Email
       </label>
        <input
          type="text"
         id="email"
         className="form-control"
         value={`${member.email}`}
         disabled
        />
 
      </div>

      
     

      <div>

        <br></br>
        <br></br>
      <h5>BOOK DETAILS</h5>
    
         <label htmlFor="bookTitle" className="form-label">
         Book Title
       </label>
        <input
          type="text"
         id="bookTitle"
         className="form-control"
         value={`${book.book_title_statement}`}
         disabled
        />
 
      </div>
      <div>
         <label htmlFor="authorName" className="form-label">
         Book Arthur Name
       </label>
        <input
          type="text"
         id="authorName"
         className="form-control"
         value={`${book.author}`}
         disabled
        />
 
      </div>

      <div className="mb-3">
        <label className="form-label">Borrow Date</label>
        <input type="date" className="form-control" value={borrowDate} onChange={(e) => setBorrowDate(e.target.value)} />
      </div>

      <div className="mb-3">
        <label className="form-label">Return Date</label>
        <input type="date" className="form-control" value={returnDate} onChange={(e) => setReturnDate(e.target.value)} />
      </div>

      <button className="btn btn-primary" onClick={handleBorrow} disabled={loading}>
        {loading ? "Processing..." : "Confirm Borrow"}
      </button>
    </div>
  );
}

export default BorrowBookForm;
