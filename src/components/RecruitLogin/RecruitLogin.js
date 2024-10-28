import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import { FaUserTie } from 'react-icons/fa'; 
import './RecruitLogin.css';

const RecruitLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { login } = useUser();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8001/api/login/recruit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (response.ok) {
                // Log the user in on success
                login(username);
                console.log(data.message);
                navigate('/recruit'); // Navigate to the Recruit page on successful login
            } else {
                console.error(data.message); // Show error message if login failed
                alert(data.message);
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2 className="login-title">
                    <FaUserTie className="login-icon" />
                </h2>
                <form onSubmit={handleSubmit} className="login-form">
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                        required
                        className="login-input"
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                        className="login-input"
                    />
                    <button type="submit" className="login-button">Login</button>
                </form>
            </div>
        </div>
    );
};

export default RecruitLogin;
