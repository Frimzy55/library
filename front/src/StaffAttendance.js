import React, { useState, useEffect } from 'react';

function StaffAttendance() {
  const [username, setUsername] = useState('');
  const [userDetails, setUserDetails] = useState(null);
  const [checkInTime, setCheckInTime] = useState(null);
  const [checkOutTime, setCheckOutTime] = useState(null);
  const [error, setError] = useState('');

  // Load all attendance data from local storage on component mount
  const [attendanceData, setAttendanceData] = useState(() => {
    const savedData = localStorage.getItem('attendanceData');
    return savedData ? JSON.parse(savedData) : {};
  });

  // Save attendance data to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('attendanceData', JSON.stringify(attendanceData));
  }, [attendanceData]);

  // Load user-specific data when username changes
  useEffect(() => {
    if (username && attendanceData[username]) {
      const userData = attendanceData[username];
      setUserDetails(userData.userDetails);
      setCheckInTime(userData.checkInTime || null);
      setCheckOutTime(userData.checkOutTime || null);
    } else {
      setUserDetails(null);
      setCheckInTime(null);
      setCheckOutTime(null);
    }
  }, [username, attendanceData]);

  const handleSearch = async () => {
    try {
      const response = await fetch(`http://localhost:5002/api/users?username=${username}`);
      if (!response.ok) {
        throw new Error('User not found');
      }
      const data = await response.json();
      setUserDetails(data);
      setError('');

      // Initialize attendance data for the new user if not already present
      if (!attendanceData[username]) {
        setAttendanceData((prevData) => ({
          ...prevData,
          [username]: { userDetails: data, checkInTime: null, checkOutTime: null },
        }));
      }
    } catch (err) {
      setError(err.message);
      setUserDetails(null);
      setCheckInTime(null);
      setCheckOutTime(null);
    }
  };

  const handleCheckIn = () => {
    const currentTime = new Date().toLocaleString();
    setCheckInTime(currentTime);
    setAttendanceData((prevData) => ({
      ...prevData,
      [username]: { ...prevData[username], checkInTime: currentTime },
    }));
  };

  const handleCheckOut = () => {
    const currentTime = new Date().toLocaleString();
    setCheckOutTime(currentTime);
    setAttendanceData((prevData) => ({
      ...prevData,
      [username]: { ...prevData[username], checkOutTime: currentTime },
    }));
  };

  const handleClearData = () => {
    setAttendanceData((prevData) => {
      const newData = { ...prevData };
      delete newData[username]; // Remove data for the current user
      return newData;
    });
    setUserDetails(null);
    setCheckInTime(null);
    setCheckOutTime(null);
  };

  return (
    <div>
      <h1>Staff Attendance</h1>
      <div>
        <input
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {(userDetails || checkInTime || checkOutTime) && (
        <div>
          <table border="1" cellPadding="10" cellSpacing="0" style={{ marginTop: '20px' }}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Email</th>
                <th>Role</th>
                <th>Created At</th>
                <th>Image</th>
                <th>Check-In Time</th>
                <th>Check-Out Time</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{userDetails?.id}</td>
                <td>{userDetails?.username}</td>
                <td>{userDetails?.email}</td>
                <td>{userDetails?.role}</td>
                <td>{userDetails?.created_at && new Date(userDetails.created_at).toLocaleString()}</td>
                <td>
                  {userDetails?.image && (
                    <img
                      src={userDetails.image}
                      alt="User"
                      style={{ width: '50px', height: '50px' }}
                    />
                  )}
                </td>
                <td>{checkInTime}</td>
                <td>{checkOutTime}</td>
              </tr>
            </tbody>
          </table>
          <div style={{ marginTop: '10px' }}>
            <button onClick={handleCheckIn} style={{ marginRight: '10px' }} disabled={checkInTime}>
              Check In
            </button>
            <button onClick={handleCheckOut} disabled={!checkInTime || checkOutTime}>
              Check Out
            </button>
            <button onClick={handleClearData} style={{ marginLeft: '10px', backgroundColor: '#ff4444', color: 'white' }}>
              Clear Data
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default StaffAttendance;