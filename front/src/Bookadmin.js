// src/BooksManagement.js
//import React, { useState } from 'react';
import React, { useState, useEffect } from "react";
import AddBookForm from './AddBookForm'; // Import the AddBookForm component
import BooksTable from './BooksTable'; // Import the BooksTable component
import SearchBooks from './SearchBooks'; // Import the SearchBooks component
import IssueReturn from './IssueReturn';
import { useNavigate } from "react-router-dom";
import axios from "axios";

function BooksManagement() {
     const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false); // State to control form visibility
  const [showBooks, setShowBooks] = useState(false); // State to control book display
  const [books, setBooks] = useState([]); // State to store books data
  const [showSearch, setShowSearch] = useState(false); // State to control search display
  const [showReturn, setShowReturn] = useState(false); 
  const [username, setUsername] = useState('');
      const [message, setMessage] = useState('');
    

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    isbn: '',
    category: '',
    publisher: '',
    yearOfPublication: '',
    totalCopies: '',
    availableCopies: '',
    shelfLocation: '',
  });




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

  // Fetch books from the API
  const fetchBooks = async () => {
    try {
      const response = await fetch('http://localhost:5002/api/books'); // Adjust API URL as needed
      if (response.ok) {
        const data = await response.json();
        setBooks(data); // Update state with fetched books
        setShowBooks(true); // Show books table
        setShowForm(false); // Hide the form if visible
        setShowSearch(false); // Hide search results if visible
        setShowReturn(false);
      } else {
        alert('Failed to fetch books');
      }
    } catch (error) {
      console.error('Error fetching books:', error);
      alert('An error occurred while fetching books');
    }
  };

  // Handle input change for the form
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  // Handle form submission to add a new book
  const handleFormSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      const response = await fetch('http://localhost:5002/api/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Book added successfully!');
        setShowForm(false); // Hide the form
        setFormData({
          title: '',
          author: '',
          isbn: '',
          category: '',
          publisher: '',
          yearOfPublication: '',
          totalCopies: '',
          availableCopies: '',
          shelfLocation: '',
        }); // Reset form fields
      } else {
        alert('Failed to add book');
      }
    } catch (error) {
      console.error('Error adding book:', error);
      alert('An error occurred while adding the book');
    }
  };

  return (
    <div className="container mt-4">
      <h2>  Books Management</h2>

      {/* Display buttons only if the form, book list, and search are not shown */}
      {!showForm && !showBooks && !showSearch && (
        <div className="d-flex flex-column gap-3">
          <button className="btn btn-primary" onClick={() => setShowForm(true)}>
           Add New Books
          </button>
          <button className="btn btn-secondary" onClick={fetchBooks}>
            View All Books
          </button>
          <button className="btn btn-success" onClick={() => setShowSearch(true)}>
            Search Books
          </button>
          <button className="btn btn-warning" onClick={()=>setShowReturn(true)}>
            Issue/Return Books</button>
        </div>
      )}

      {/* Display form when adding a new book */}
      {showForm && (
        <AddBookForm
          formData={formData}
          onInputChange={handleInputChange}
          onSubmit={handleFormSubmit}
          onCancel={() => setShowForm(false)}
        />
      )}

      {/* Display books table when "View All Books" is clicked */}
      {showBooks && <BooksTable books={books} onClose={() => setShowBooks(false)} />}

      {/* Display search component when "Search Books" is clicked */}
      {showSearch && <SearchBooks onClose={() => setShowSearch(false)} />}

      {showReturn && <IssueReturn onClose={() => setShowReturn(false)} />}
    </div>
  );
}

export default BooksManagement;