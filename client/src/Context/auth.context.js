import { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(
        {
            user: null,
            token: "",
        }
    );
    
    //default axios
    useEffect(() => {
        axios.defaults.headers.common["Authorization"] = auth.token;
    }, [auth.token]);

    useEffect(() => {
        const userData = localStorage.getItem('auth');
        if(userData){
            const parseUserData = JSON.parse(userData);
            setAuth({
                ...auth,
                user : parseUserData.user,
                token : parseUserData.token
            })
        }
    }, [])
    return (
        <AuthContext.Provider value={[auth, setAuth]}>
            {children}
        </AuthContext.Provider>
    )
}

// Custom hook 
const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider }
