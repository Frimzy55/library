// src/IssueReturn.js
import React, { useState } from 'react';

function IssueReturn({ onClose }) {
  const [formData, setFormData] = useState({
    userId: '',
    bookIsbn: '',
    actionType: 'issue' // Default to 'issue'
  });
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const endpoint = formData.actionType === 'issue' 
        ? 'http://localhost:5000/api/books/issue' 
        : 'http://localhost:5000/api/books/return';

      const response = await fetch(endpoint, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: formData.userId,
          isbn: formData.bookIsbn
        }),
      });

      if (response.ok) {
        alert(`Book successfully ${formData.actionType === 'issue' ? 'issued' : 'returned'}`);
        onClose(); // Close the component after successful operation
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Operation failed');
      }
    } catch (err) {
      console.error('Error:', err);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="card mt-3">
      <div className="card-body">
        <h5 className="card-title">Issue/Return Book</h5>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="userId" className="form-label">User ID</label>
            <input
              type="text"
              className="form-control"
              id="userId"
              name="userId"
              value={formData.userId}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="bookIsbn" className="form-label">Book ISBN</label>
            <input
              type="text"
              className="form-control"
              id="bookIsbn"
              name="bookIsbn"
              value={formData.bookIsbn}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="actionType" className="form-label">Action</label>
            <select
              className="form-select"
              id="actionType"
              name="actionType"
              value={formData.actionType}
              onChange={handleInputChange}
            >
              <option value="issue">Issue Book</option>
              <option value="return">Return Book</option>
            </select>
          </div>

          {error && <div className="alert alert-danger">{error}</div>}

          <div className="d-flex justify-content-end gap-2">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {formData.actionType === 'issue' ? 'Issue Book' : 'Return Book'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default IssueReturn;