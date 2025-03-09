import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import MembershipRegistration from "./MembershipRegistration"; 
import MembershipManagement from "./MembershipManagement"; 
import ClientBorrowingHistory from "./ClientBorrowingHistory"; // Import new component

function ClientManagement() {
  const [selectedSection, setSelectedSection] = useState(null);

  const handleSectionClick = (section) => {
    setSelectedSection(section);
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Client Management</h2>

      <div className="d-flex justify-content-center gap-3 mb-4">
        <button className="btn btn-primary" onClick={() => handleSectionClick("member-registration")}>
          Member Registration
        </button>
        <button className="btn btn-secondary" onClick={() => handleSectionClick("membership-management")}>
          Membership Management
        </button>
        <button className="btn btn-info" onClick={() => handleSectionClick("borrowing-history")}>
          Client Borrowing History
        </button>
        <button className="btn btn-warning" onClick={() => handleSectionClick("fine-management")}>
          Fine Management
        </button>
      </div>

      {selectedSection === "member-registration" && <MembershipRegistration />}
      {selectedSection === "membership-management" && <MembershipManagement />}
      {selectedSection === "borrowing-history" && <ClientBorrowingHistory />}
      
      {selectedSection === "fine-management" && (
        <div className="card p-4">
          <h3 className="mb-3">Fine Management</h3>
          <p>Handle overdue fines and penalties.</p>
        </div>
      )}
    </div>
  );
}

export default ClientManagement;
