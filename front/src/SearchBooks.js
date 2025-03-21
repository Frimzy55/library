import React, { useState } from "react";
import BooksTable from "./BooksTable";

function SearchBooks({ onClose }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      alert("Please enter a book title to search");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5002/api/books/search?title=${encodeURIComponent(searchTerm)}`
      );
      if (response.ok) {
        const data = await response.json();
        setSearchResults(data);
      } else {
        alert("No books found with the given title");
      }
    } catch (error) {
      console.error("Error searching books:", error);
      alert("An error occurred while searching books");
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow-lg p-4">
        <h4 className="text-center mb-3">Search for a Book</h4>

        {/* Search Bar */}
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Enter book title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="btn btn-primary" onClick={handleSearch}>
            Search
          </button>
        </div>

        {/* Buttons */}
        <div className="d-flex justify-content-between mt-3">
          <button className="btn btn-outline-danger" onClick={onClose}>
            Close
          </button>
        </div>

        {/* Search Results */}
        {searchResults.length > 0 ? (
          <BooksTable books={searchResults} onClose={onClose} />
        ) : (
          <p className="mt-3 text-muted text-center">No books found</p>
        )}
      </div>
    </div>
  );
}

export default SearchBooks;
