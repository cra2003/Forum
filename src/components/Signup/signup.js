import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import { FaUserPlus } from 'react-icons/fa'; 
import './signup.css';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('Board'); // Default value is 'Board'
    const navigate = useNavigate();
    const { signup } = useUser(); // Assuming you have a signup function in UserContext

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('New Signup:', { username, password, role });
        await signup(username, password, role); // Pass the password and role to the signup function
        navigate('/home'); // Redirect after signup (this will happen after a successful signup)
    };

    return (
        <div className="signup-container">
            <div className="signup-box">
                <h2 className="signup-title">
                    <FaUserPlus className="signup-icon" />
                </h2>
                <form onSubmit={handleSubmit} className="signup-form">
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                        required
                        className="signup-input"
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                        className="signup-input"
                    />
                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="signup-select"
                    >
                        <option value="Board">Board</option>
                        <option value="Recruit">Recruit</option>
                    </select>
                    <button type="submit" className="signup-button">Sign up</button>
                </form>
            </div>
        </div>
    );
};

export default Signup;
