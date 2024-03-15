import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [userType, setUserType] = useState(sessionStorage.getItem('userType'));

    const updateUserType = (type) => {
        sessionStorage.setItem('userType', type);
        setUserType(type);
    };

    return (
        <UserContext.Provider value={{ userType, updateUserType }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
