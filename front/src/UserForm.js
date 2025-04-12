import React, { useState } from 'react';
import axios from 'axios';

const UserForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'user',
        image: null // Add image field to form data
    });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData(prevState => ({
            ...prevState,
            image: file
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form submitted with data:', formData);

        // Create FormData object to handle file upload
        const data = new FormData();
        data.append('name', formData.name);
        data.append('email', formData.email);
        data.append('password', formData.password);
        data.append('role', formData.role);
        if (formData.image) {
            data.append('image', formData.image);
        }

        try {
            const response = await axios.post("http://localhost:5002/signup", data, {
                headers: {
                    'Content-Type': 'multipart/form-data' // Set content type for file upload
                }
            });
            setMessage('Registration successful!');
            console.log('Registration successful:', response.data);
        } catch (error) {
            setMessage('Registration failed. Please try again.');
            console.error('Registration failed:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Username:</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Email:</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Password:</label>
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Role:</label>
                <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select>
            </div>
            <div>
                <label>Profile Image:</label>
                <input
                    type="file"
                    name="image"
                    onChange={handleFileChange}
                    accept="image/*" // Accept only image files
                />
            </div>
            <button type="submit">Register</button>
            {message && <p>{message}</p>}
        </form>
    );
};

export default UserForm