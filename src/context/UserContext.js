import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const useUser = () => {
    return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null); // `null` means no user is logged in

    const login = (username) => {
        setUser(username);
    };

    const logout = () => {
        setUser(null);
    };

    const signup = async (username, password, role) => {
        try {
            const response = await fetch('http://localhost:8001/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password, role }),
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Something went wrong');
            }

            // Optionally log the user in after signup
            // Automatically log in the user after successful signup
            console.log(data.message); // Success message
        } catch (error) {
            console.error('Error during signup:', error);
        }
    };

    return (
        <UserContext.Provider value={{ user, login, logout, signup }}>
            {children}
        </UserContext.Provider>
    );
};
