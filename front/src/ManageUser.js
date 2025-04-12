import React, { useState, useEffect } from 'react';

function ManageUser() {
  const [users, setUsers] = useState([]); // State to store users
  const [editingUser, setEditingUser] = useState(null); // Track user being edited
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [showActions, setShowActions] = useState(null); // Track which user's actions are visible

  // Fetch users from the database on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  // Fetch all users from the backend API
  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:5002/users');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  // Handle deleting a user
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5002/users/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        // Remove the user from the local state
        setUsers(users.filter((user) => user.id !== id));
        setShowActions(null); // Hide actions after deletion
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  // Handle editing a user
  const handleEdit = (user) => {
    setEditingUser(user);
    setUsername(user.username);
    setEmail(user.email);
    setRole(user.role);
    setShowActions(null); // Hide actions when editing
  };

  // Handle updating a user
  const handleUpdate = async () => {
    try {
      const updatedUser = { username, email, role };
      const response = await fetch(`http://localhost:5002/users/${editingUser.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUser),
      });

      if (response.ok) {
        // Update the user in the local state
        const updatedUsers = users.map((user) =>
          user.id === editingUser.id ? { ...user, ...updatedUser } : user
        );
        setUsers(updatedUsers);
        setEditingUser(null); // Reset editing state
        setUsername('');
        setEmail('');
        setRole('');
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  // Toggle actions visibility for a specific user
  const toggleActions = (userId) => {
    setShowActions(showActions === userId ? null : userId);
  };

  return (
    <div>
      <h1>Manage Users</h1>
      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>ID</th>
            <th>Profile Image</th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>
                {user.image && (
                  <img
                    src={`http://localhost:5002/${user.image}`} // Serve image from the backend
                    alt="Profile"
                    style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover' }}
                  />
                )}
              </td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{new Date(user.created_at).toLocaleString()}</td>
              <td>
                <button onClick={() => toggleActions(user.id)}>Actions</button>
                {showActions === user.id && (
                  <>
                    <button onClick={() => handleEdit(user)}>Update</button>
                    <button onClick={() => handleDelete(user.id)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit User Form */}
      {editingUser && (
        <div>
          <h2>Edit User</h2>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <button onClick={handleUpdate}>Save</button>
          <button onClick={() => setEditingUser(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
}

export default ManageUser;