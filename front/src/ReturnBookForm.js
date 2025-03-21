import React, { useState } from 'react';
import axios from 'axios';
import { FaSearch } from 'react-icons/fa';
import moment from 'moment';

const ReturnBookForm = ({ onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    borrowerId: '',
    borrowerName: '',
    bookId: '',
    bookTitle: '',
    issueDate: '',
    dueDate: '',
    returnDate: new Date().toISOString().split('T')[0],
    lateFee: 0
  });


  
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [borrowerSearchQuery, setBorrowerSearchQuery] = useState('');
  const [borrowerResults, setBorrowerResults] = useState([]);
  const [borrowerSelected, setBorrowerSelected] = useState(false);

  const handleSearch = async () => {
    if (!borrowerSearchQuery.trim()) return;
    setLoading(true);
    setError('');

    try {
      const response = await axios.get(`http://localhost:5000/api/borrowers?search=${borrowerSearchQuery}`);
      setBorrowerResults(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Error fetching borrowers');
      setBorrowerResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectBorrower = async (borrower) => {
    setLoading(true);
    setError('');
    setBorrowerSelected(false);
    
    try {
      const response = await axios.get(`http://localhost:5000/api/returnform-books?member_id=${borrower.member_id}`);
      const bookData = response.data;

      if (bookData) {
        setFormData({
          borrowerId: borrower.member_id,
          borrowerName: borrower.full_name,
          bookId: bookData.book_id,
          bookTitle: borrower.book_title,
          issueDate: borrower.borrow_date,
          dueDate: borrower.due_date,
          returnDate: new Date().toISOString().split('T')[0],
          lateFee: calculateLateFee(borrower.due_date)
        });
        setBorrowerSelected(true);
      }
      
      setBorrowerSearchQuery('');
      setBorrowerResults([]);
    } catch (err) {
      setError(err.response?.data?.error || 'Error fetching book details');
    } finally {
      setLoading(false);
    }
  };

  const calculateLateFee = (dueDate) => {
    const due = new Date(dueDate);
    const today = new Date();
    const diffDays = Math.ceil((today - due) / (1000 * 60 * 60 * 24));
    return diffDays > 1 ? diffDays * 5 : 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage(''); 

    try {
      // Send properly formatted data to match backend expectations
      const returnData = {
        full_name: formData.borrowerName,
        member_id: formData.borrowerId,
        book_title: formData.bookTitle,
        borrow_date: formData.issueDate,
        due_date: formData.dueDate,
        return_date: formData.returnDate,
        late_fee: formData.lateFee
      };
  
      const response = await axios.post('http://localhost:5002/api/returns', returnData);
  
      if (response.data.success) {
        await axios.delete(`http://localhost:5002/api/borrowed-books/${formData.borrowerId}`);
        
      
        setSuccessMessage('Error returning book ');
        onSuccess();
        resetFields();

        setTimeout(() => setSuccessMessage(''), 5000);
      // Clear error message after 10 seconds
    
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || ' Book returned successfully';
      setError(errorMsg);
      console.error('Return error:', errorMsg);
      
      // Clear error message after 10 seconds
      setTimeout(() => setError(''), 10000);

      
    }
  };

  const resetFields = () => {
    setFormData({
      borrowerId: '',
      borrowerName: '',
      bookId: '',
      bookTitle: '',
      issueDate: '',
      dueDate: '',
      returnDate: new Date().toISOString().split('T')[0],
      lateFee: 0
    });
    setBorrowerSelected(false);
  };

  return (
    <div className="card p-4 mt-3">
      <h4 className="mb-3">Return Book Form</h4>
      <form onSubmit={handleSubmit}>
        <div className="row g-3 mb-3">
          <div className="col-md-12">
            <label className="form-label">Search Borrower</label>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Search borrower by name, phone, email, or ID..."
                value={borrowerSearchQuery}
                onChange={(e) => setBorrowerSearchQuery(e.target.value)}
              />
              <button type="button" className="btn btn-outline-secondary" onClick={handleSearch}>
                <FaSearch />
              </button>
            </div>
          </div>
        </div>
        {borrowerResults.length > 0 && (
          <ul className="list-group mt-2">
            {borrowerResults.map(borrower => (
              <li
                key={borrower.member_id}
                className="list-group-item list-group-item-action"
                style={{ cursor: 'pointer' }}
                onClick={() => handleSelectBorrower(borrower)}
              >
                {borrower.full_name} (ID: {borrower.member_id})
              </li>
            ))}
          </ul>
        )}
        <div className="row g-3 mb-3">
          <div className="col-md-6">
            <label className="form-label">Borrower Name</label>
            <input type="text" className="form-control" value={formData.borrowerName} readOnly />
          </div>
          <div className="col-md-6">
            <label className="form-label">Member ID</label>
            <input type="text" className="form-control" value={formData.borrowerId} readOnly />
          </div>
          <div className="col-md-6">
            <label className="form-label">Book Title</label>
            <input type="text" className="form-control" value={formData.bookTitle} readOnly />
          </div>
        </div>


        <div className="row g-3 mb-3">
          <div className="col-md-4">
            <label className="form-label">Issue Date</label>
            <input type="text" className="form-control" value={moment(formData.issueDate).format('MMMM Do YYYY')} readOnly />
          </div>
          <div className="col-md-4">
            <label className="form-label">Due Date</label>
            <input type="text" className="form-control" value={moment(formData.dueDate).format('MMMM Do YYYY')} readOnly />
          </div>
          <div className="col-md-4">
            <label className="form-label">Return Date</label>
            <input type="text" className="form-control" value={moment(formData.returnDate).format('MMMM Do YYYY')} readOnly />
          </div>
        </div>

        <div className="row g-3 mb-3">
          <div className="col-md-4">
            <label className="form-label">Late Fee (Gh¢)</label>
            <input type="number" className="form-control" value={formData.lateFee.toFixed(2)} readOnly />
          </div>
        </div>

        {/* Success Message */}
      {successMessage && (
        <div className="alert alert-danger alert-dismissible fade show">
          {successMessage}
          <button 
            type="button" 
            className="btn-close" 
            onClick={() => setSuccessMessage('')}
          />
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="alert alert-danger alert-dismissible fade show   alert alert-success alert-dismissible fade show">
          {error}
          <button 
            type="button" 
            className="btn-close" 
            onClick={() => setError('')}
          />
        </div>
      )}
        <div className="d-flex gap-2 mt-4">
          <button type="submit" className="btn btn-primary" disabled={!borrowerSelected}>Submit Return</button>
          <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default ReturnBookForm;