// src/AddBookForm.js
import React from 'react';

function AddBookForm({ formData, onInputChange, onSubmit, onCancel }) {
  return (
    <div className="mt-4">
      <h5>Add New Book</h5>
      <form onSubmit={onSubmit}>
        <div className="row">
          {/* Row 1 */}
          <div className="col-md-3 mb-3">
            <label htmlFor="bookTitleStatement" className="form-label">Book Title Statement</label>
            <input
              type="text"
              className="form-control"
              id="bookTitleStatement"
              placeholder="Enter book title"
              value={formData.bookTitleStatement}
              onChange={onInputChange}
              required
            />
          </div>
          <div className="col-md-3 mb-3">
            <label htmlFor="author" className="form-label">Author/Main Entry-Personal Name</label>
            <input
              type="text"
              className="form-control"
              id="author"
              placeholder="Enter author name"
              value={formData.author}
              onChange={onInputChange}
              required
            />
          </div>
          <div className="col-md-3 mb-3">
            <label htmlFor="isbn" className="form-label">ISBN</label>
            <input
              type="text"
              className="form-control"
              id="isbn"
              placeholder="Enter ISBN"
              value={formData.isbn}
              onChange={onInputChange}
              required
            />
          </div>
          <div className="col-md-3 mb-3">
            <label htmlFor="category" className="form-label">Category/Subject Added Entry-Topical</label>
            <input
              type="text"
              className="form-control"
              id="category"
              placeholder="Enter category"
              value={formData.category}
              onChange={onInputChange}
              required
            />
          </div>
        </div>

        <div className="row">
          {/* Row 2 */}
          <div className="col-md-3 mb-3">
            <label htmlFor="deweyDecimal" className="form-label">Dewey Decimal Classification</label>
            <input
              type="text"
              className="form-control"
              id="deweyDecimal"
              placeholder="Enter Dewey Decimal "
              value={formData.deweyDecimal}
              onChange={onInputChange}
              required
            />
          </div>
          <div className="col-md-3 mb-3">
            <label htmlFor="publicationDistribution" className="form-label"> Publication Distribution</label>
            <input
              type="text"
              className="form-control"
              id="publicationDistribution"
              placeholder="Enter of publication"
              value={formData.publicationDistribution}
              onChange={onInputChange}
              required
            />
          </div>
          <div className="col-md-3 mb-3">
            <label htmlFor="sourceOfAcquisition" className="form-label"> Source of Acquisition</label>
            <input
              type="text"
              className="form-control"
              id="sourceOfAcquisition"
              placeholder="Enter Source of Acquisition"
              value={formData.sourceOfAcquisition}
              onChange={onInputChange}
              required
            />
          </div>
          <div className="col-md-3 mb-3">
            <label htmlFor="physicalDescription" className="form-label">Physical Description </label>
            <input
              type="text"
              className="form-control"
              id="physicalDescription"
              placeholder="Enter Physical Description"
              value={formData.physicalDescription}
              onChange={onInputChange}
              required
            />
          </div>
        </div>

        <div className="row">
          {/* Row 3 */}
          <div className="col-md-3 mb-3">
            <label htmlFor="tradePrice" className="form-label">Trade Price</label>
            <input
              type="text"
              className="form-control"
              id="tradePrice"
              placeholder="Enter Trade Price"
              value={formData.tradePrice}
              onChange={onInputChange}
              required
            />
          </div>
        </div>

        {/* Submit and Cancel Buttons */}
        <div className="row">
          <div className="col-md-12">
            <button type="submit" className="btn btn-success">Submit</button>
            <button
              type="button"
              className="btn btn-secondary ms-2"
              onClick={onCancel}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddBookForm;