import React, { createContext, useContext, ReactNode, useState } from 'react';

const UserContext = createContext(null);

function UserProvider({ children }) {
    const [user, setUser] = useState({ username: 'initialUsername' });

    const updateUser = (newUserData) => {
        setUser(newUserData);
    };

    return (
        <UserContext.Provider value={{ user, updateUser }}>
            {children}
        </UserContext.Provider>
    );
}

export {UserProvider, UserContext};