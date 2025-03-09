import React, { useState, useEffect } from "react";
import axios from "axios";

function MembershipManagement() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchMembers = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/api/view");
      setMembers(response.data);
      setError("");
    } catch (err) {
      setError("Failed to fetch members. Please try again.");
      console.error("Error fetching members:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleViewAllMembers = () => {
    fetchMembers();
  };

  return (
    <div className="card p-4">
      <h3 className="mb-3">Membership Management</h3>
      
      <div className="d-flex gap-3 mb-4">
        <button
          className="btn btn-primary"
          onClick={handleViewAllMembers}
          disabled={loading}
        >
          {loading ? "Loading..." : "View All Members"}
        </button>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {members.length > 0 && (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead className="table-white">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Membership Type</th>
                <th>Max Books</th>
                <th>Date Joined</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {members.map((member) => (
                <tr key={member.member_id}>
                  <td>{`${member.first_name} ${member.last_name}`}</td>
                  <td>{member.email}</td>
                  <td>{member.phone}</td>
                  <td>{member.membership_type}</td>
                  <td>{member.max_books}</td>
                  <td>{new Date(member.date_joined).toLocaleDateString()}</td>
                  <td>
                    <span className={`badge ${
                      member.status === 'active' 
                        ? 'bg-success' 
                        : 'bg-danger'
                    }`}>
                      {member.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default MembershipManagement;