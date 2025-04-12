import React, { useState } from "react";
import axios from "axios";
import { FaSearch, FaBook, FaUser, FaArrowRight, FaExchangeAlt } from "react-icons/fa";
import BorrowBookForm from "./BorrowBookForm";
import ReturnBookForm from "./ReturnBookForm";
import ViewBorrowedBooks from "./ViewBorrowedBooks";

function BorrowReturn() {
  // State declarations
  const [selectedMember, setSelectedMember] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [loadingMembers, setLoadingMembers] = useState(false);
  const [errorMembers, setErrorMembers] = useState("");

  const [selectedBook, setSelectedBook] = useState(null);
  const [searchBookQuery, setSearchBookQuery] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loadingBooks, setLoadingBooks] = useState(false);
  const [errorBooks, setErrorBooks] = useState("");

  const [showBorrowForm, setShowBorrowForm] = useState(false);
  const [showReturnForm, setShowReturnForm] = useState(false);
  const [showBorrowedBooks, setShowBorrowedBooks] = useState(false);

  // Member search handler
  const handleMemberSearch = async () => {
    if (!searchQuery.trim()) {
      setErrorMembers("Please enter a search term.");
      return;
    }
    setLoadingMembers(true);
    setErrorMembers("");
    try {
      const response = await axios.get(`http://localhost:5002/api/members?search=${searchQuery}`);
      setFilteredMembers(response.data);
      if (response.data.length === 0) setErrorMembers("No members found.");
    } catch (err) {
      setErrorMembers("Error searching members.");
    } finally {
      setLoadingMembers(false);
    }
  };

  // Book search handler
  const handleBookSearch = async () => {
    if (!searchBookQuery.trim()) {
      setErrorBooks("Please enter a search term.");
      return;
    }
    setLoadingBooks(true);
    setErrorBooks("");
    try {
      const response = await axios.get(`http://localhost:5002/api/books?search=${searchBookQuery}`);
      setFilteredBooks(response.data);
      if (response.data.length === 0) setErrorBooks("No books found.");
    } catch (err) {
      setErrorBooks("Error searching books.");
    } finally {
      setLoadingBooks(false);
    }
  };

  // Member selection handler
  const selectMember = (member) => {
    setSelectedMember(member);
    setSearchQuery("");
    setFilteredMembers([]);
  };

  // Book selection handler
  const selectBook = (book) => {
    setSelectedBook(book);
    setSearchBookQuery("");
    setFilteredBooks([]);
  };

  return (
    <div className="container-fluid p-4">
      <div className="card shadow-lg">
        <div className="card-header bg-white text-dark">
          <h3 className="mb-0"><FaBook className="me-2" />Borrow & Return Management</h3>
        </div>
        
        <div className="card-body">
          {/* View Borrowed Books Button */}
          <div className="mb-4">
            <button 
              className="btn btn-success w-100"
              onClick={() => setShowBorrowedBooks(!showBorrowedBooks)}
            >
              <FaBook className="me-2" />
              {showBorrowedBooks ? "Hide Borrowed Books" : "View Borrowed Books"}
            </button>
            {showBorrowedBooks && <ViewBorrowedBooks />}
          </div>

          {/* Borrow Section */}
          <div className="mb-5 p-4 border rounded bg-light">
            <h4 className="mb-4 text-dark"><FaUser className="me-2" />Borrow Book</h4>
            
            {!showBorrowForm ? (
              <>
                <div className="row g-4">
                  {/* Member Search */}
                  <div className="col-md-6">
                    <div className="card h-100">
                      <div className="card-header bg-white text-primary">
                        Search Member
                      </div>
                      <div className="card-body">
                        <div className="input-group">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Search by name, email, or ID"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                          />
                          <button className="btn btn-white" onClick={handleMemberSearch}>
                            <FaSearch />
                          </button>
                        </div>
                        {loadingMembers && (
                          <div className="mt-3 text-center">
                            <div className="spinner-border text-primary" role="status">
                              <span className="visually-hidden">Loading...</span>
                            </div>
                          </div>
                        )}
                        {errorMembers && (
                          <div className="alert alert-danger mt-3">{errorMembers}</div>
                        )}
                        {filteredMembers.length > 0 && (
                          <div className="mt-3">
                            {filteredMembers.map((member) => (
                              <div
                                key={member.id}
                                className="list-group-item list-group-item-action d-flex justify-content-between align-items-center hover-shadow"
                                onClick={() => selectMember(member)}
                                style={{ cursor: "pointer" }}
                              >
                                <div>
                                  <strong>{member.first_name} {member.last_name}</strong>
                                  <div className="text-muted small">ID: {member.member_id}</div>
                                </div>
                                <FaArrowRight className="text-primary" />
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Book Search */}
                  <div className="col-md-6">
                    <div className="card h-100">
                      <div className="card-header bg-white text-primary">
                        Search Book
                      </div>
                      <div className="card-body">
                        <div className="input-group">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Search by title, author, or ISBN"
                            value={searchBookQuery}
                            onChange={(e) => setSearchBookQuery(e.target.value)}
                          />
                          <button className="btn btn-white" onClick={handleBookSearch}>
                            <FaSearch />
                          </button>
                        </div>
                        {loadingBooks && (
                          <div className="mt-3 text-center">
                            <div className="spinner-border text-primary" role="status">
                              <span className="visually-hidden">Loading...</span>
                            </div>
                          </div>
                        )}
                        {errorBooks && (
                          <div className="alert alert-danger mt-3">{errorBooks}</div>
                        )}
                        {filteredBooks.length > 0 && (
                          <div className="mt-3">
                            {filteredBooks.map((book) => (
                              <div
                                key={book.id}
                                className="list-group-item list-group-item-action d-flex justify-content-between align-items-center hover-shadow"
                                onClick={() => selectBook(book)}
                                style={{ cursor: "pointer" }}
                              >
                                <div>
                                  <strong>{book.title}</strong>
                                  <div className="text-muted small">
                                     {book.book_title_statement} | ISBN: {book.isbn}
                                  </div>
                                </div>
                                <FaArrowRight className="text-primary" />
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Selected Info */}
                <div className="row mt-4">
                  <div className="col-md-6">
                    {selectedMember && (
                      <div className="alert alert-success d-flex align-items-center">
                        <FaUser className="me-2 fs-4" />
                        <div>
                          <strong>Selected Member:</strong><br/>
                          {selectedMember.first_name} {selectedMember.last_name}<br/>
                          <small>ID: {selectedMember.member_id}</small>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="col-md-6">
                    {selectedBook && (
                      <div className="alert alert-info d-flex align-items-center">
                        <FaBook className="me-2 fs-4" />
                        <div>
                          <strong>Selected Book:</strong><br/>
                          {selectedBook.book_title_statement}<br/>
                          <small>ISBN: {selectedBook.isbn}</small>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="text-center mt-4">
                  <button
                    className="btn btn-success btn-lg px-5"
                    onClick={() => setShowBorrowForm(true)}
                    disabled={!selectedMember || !selectedBook}
                  >
                    <FaArrowRight className="me-2" />
                    Proceed to Borrow
                  </button>
                </div>
              </>
            ) : (
              <BorrowBookForm
                member={selectedMember}
                book={selectedBook}
                onSuccess={() => {
                  setShowBorrowForm(false);
                  setSelectedMember(null);
                  setSelectedBook(null);
                }}
                onCancel={() => setShowBorrowForm(false)}
              />
            )}
          </div>

          {/* Return Section */}
          <div className="mt-5 p-4 border rounded bg-light">
            <h4 className="mb-4 text-dark"><FaExchangeAlt className="me-2" />Return Book</h4>
            {!showReturnForm ? (
              <div className="text-center">
                <button
                  className="btn btn-warning btn-lg px-5"
                  onClick={() => setShowReturnForm(true)}
                >
                  <FaExchangeAlt className="me-2" />
                  Start Return Process
                </button>
              </div>
            ) : (
              <ReturnBookForm
                onSuccess={() => setShowReturnForm(false)}
                onCancel={() => setShowReturnForm(false)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BorrowReturn;