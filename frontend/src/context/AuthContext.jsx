import React, {createContext, useState, useEffect} from 'react';
import axios from "axios";
export const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("user")) || "")

    
    return (
        <AuthContext.Provider value={{
            currentUser,
            setCurrentUser
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider