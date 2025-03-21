import React, { useState } from 'react';
import axios from 'axios';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';
import moment from 'moment';
import 'bootstrap/dist/css/bootstrap.min.css';

function MemberVisit() {
  // State declarations
  const [searchTerm, setSearchTerm] = useState('');
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedMember, setSelectedMember] = useState(null);
  const [checkInDate, setCheckInDate] = useState('');
  const [purpose, setPurpose] = useState('');
  const [comments, setComments] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [showAttendance, setShowAttendance] = useState(false);
  const [loadingAttendance, setLoadingAttendance] = useState(false);

  // Search members handler
  const handleSearch = async () => {
    if (searchTerm.trim() === '') {
      setMembers([]);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`http://localhost:5002/api/members?search=${searchTerm}`);
      setMembers(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Error fetching members');
      setMembers([]);
    }
    setLoading(false);
  };

  // Select member handler
  const handleMemberSelect = (member) => {
    setSelectedMember(member);
    setCheckInDate(new Date().toISOString().split('T')[0]);
    setPurpose('');
    setComments('');
    setSearchTerm('');
    setMembers([]);
  };

  // Submit visit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSubmitSuccess(false);
    
    if (!selectedMember) {
      setError('Please select a member first');
      return;
    }

    try {
      await axios.post('http://localhost:5002/api/visits', {
        member_id: selectedMember.member_id,
        full_name: `${selectedMember.first_name} ${selectedMember.last_name}`,
        check_in_date: checkInDate,
        purpose: purpose,
        comments: comments
      });
      setSubmitSuccess(true);
      setSelectedMember(null);
      setTimeout(() => setSubmitSuccess(false), 3000);
    } catch (err) {
      setError(err.response?.data?.error || 'Error submitting visit');
    }
  };

  // View attendance handler
  const handleViewAttendance = async () => {
    setLoadingAttendance(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:5002/api/attendance');
      setAttendanceRecords(response.data);
      setShowAttendance(!showAttendance);
    } catch (err) {
      setError(err.response?.data?.error || 'Error fetching attendance records');
    }
    setLoadingAttendance(false);
  };

  return (
    <motion.div 
      className="container py-5"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Member Visit Management</h2>

              {!selectedMember ? (
                <>
                  <div className="input-group mb-3">
                    <input
                      type="text"
                      placeholder="Search members..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="form-control"
                    />
                    <button 
                      onClick={handleSearch} 
                      className="btn btn-primary"
                      disabled={loading}
                    >
                      <Search size={20} />
                    </button>
                  </div>

                  <div className="mb-3">
                    <button 
                      className="btn btn-outline-primary w-100"
                      onClick={handleViewAttendance}
                      disabled={loadingAttendance}
                    >
                      {loadingAttendance ? 'Loading...' : 
                       showAttendance ? 'Hide Attendance' : 'View Attendance'}
                    </button>
                  </div>

                  {showAttendance && (
  <div className="mt-3">
    <h5>Attendance Records</h5>
    {attendanceRecords.length === 0 ? (
      <div className="alert alert-info">No attendance records found</div>
    ) : (
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="table-white">
            <tr>
              <th>Name</th>
              <th>Check-in Date</th>
              <th>Purpose</th>
              <th>Comments</th>
            </tr>
          </thead>
          <tbody>
            {attendanceRecords.map(record => (
              <tr key={record.visit_id}>
                <td>{record.full_name}</td>
                <td>{moment(record.check_in_date).format('MMM Do YYYY')}</td>
                <td>
                  <span className="badge bg-primary">
                    {record.purpose}
                  </span>
                </td>
                <td>
                  {record.comments && (
                    <small className="text-muted">
                      {record.comments.length > 50 
                        ? `${record.comments.substring(0, 50)}...`
                        : record.comments}
                    </small>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </div>
)}

                  {!showAttendance && (
                    <>
                      {loading && <div className="alert alert-info text-center">Loading...</div>}
                      {error && <div className="alert alert-danger text-center">{error}</div>}
                      <div className="list-group">
                        {members.map((member) => (
                          <motion.button
                            key={member.member_id}
                            type="button"
                            className="list-group-item list-group-item-action"
                            onClick={() => handleMemberSelect(member)}
                            whileHover={{ scale: 1.02 }}
                          >
                            <div className="d-flex justify-content-between align-items-start">
                              <div>
                                <h5 className="mb-1">{member.first_name} {member.last_name}</h5>
                                <small className="text-muted">{member.email}</small>
                              </div>
                              <span className="badge bg-primary rounded-pill">
                                ID: {member.member_id}
                              </span>
                            </div>
                          </motion.button>
                        ))}
                      </div>
                    </>
                  )}
                </>
              ) : (
                <motion.form
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-4"
                >
                  <h4 className="mb-4">Member Check-in Form</h4>
                  
                  <div className="mb-3">
                    <label className="form-label">Member Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={`${selectedMember.first_name} ${selectedMember.last_name}`}
                      readOnly
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Check-in Date</label>
                    <input
                      type="date"
                      className="form-control"
                      value={checkInDate}
                      onChange={(e) => setCheckInDate(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Purpose of Visit</label>
                    <select
                      className="form-select"
                      value={purpose}
                      onChange={(e) => setPurpose(e.target.value)}
                      required
                    >
                      <option value="">Select purpose</option>
                      <option value="Learning">Learning</option>
                      <option value="Research">Research</option>
                      <option value="Event">Event</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="mb-4">
                    <label className="form-label">Additional Comments</label>
                    <textarea
                      className="form-control"
                      rows="3"
                      value={comments}
                      onChange={(e) => setComments(e.target.value)}
                    ></textarea>
                  </div>

                  <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setSelectedMember(null)}
                    >
                      Back to Search
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Submit Visit
                    </button>
                  </div>
                </motion.form>
              )}

              {submitSuccess && (
                <div className="alert alert-success mt-3">
                  Visit recorded successfully!
                </div>
              )}
              {error && (
                <div className="alert alert-danger mt-3">
                  {error}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default MemberVisit;