import React, { useState } from 'react';
import axios from 'axios';

const AddMember: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [position, setPosition] = useState('');
    const [picture, setPicture] = useState<File | null>(null);
    const [joinDate, setJoinDate] = useState('');
    const [message, setMessage] = useState('');

    const handlePictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        setPicture(file);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!name || !email || !picture || !joinDate) {
            setMessage('All fields are required!');
            return;
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('position', position);
        formData.append('picture', picture);
        formData.append('joinDate', joinDate);

        try {
            const response = await axios.post('http://localhost:8080/testBVK/member/create', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setMessage(response.data);
        } catch (error) {
            console.error('Error uploading member details:', error);
            setMessage('Error uploading member details. Please try again.');
        }
    };

    return (
        <div className="container mt-4">
            <h2>Add New Member</h2>
            <form onSubmit={handleSubmit} className="needs-validation" noValidate>
                <div className="form-group">
                    <label htmlFor="name">Member Name:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Member Email:</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="position">Member Position:</label>
                    <select
                        id="position"
                        className="form-control"
                        value={position}
                        onChange={(e) => setPosition(e.target.value)}
                        required
                    >
                        <option value="">Select a position</option>
                        <option value="Developer">Developer</option>
                        <option value="Security">Security</option>
                        <option value="Manager">Manager</option>
                        <option value="Designer">Designer</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="picture">Upload Picture:</label>
                    <input
                        type="file"
                        className="form-control-file"
                        id="picture"
                        accept="image/*"
                        onChange={handlePictureChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="joinDate">Join Date:</label>
                    <input
                        type="date"
                        className="form-control"
                        id="joinDate"
                        value={joinDate}
                        onChange={(e) => setJoinDate(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Add Member</button>
            </form>
            {message && <p className="mt-3">{message}</p>}
        </div>
    );
};

export default AddMember;
