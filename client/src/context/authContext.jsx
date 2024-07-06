
import {useState, useEffect} from "react"
import { registerRequest, loginUser, verifyTokenRequest } from '../api/auth.js'
import PropTypes from 'prop-types';
import { AuthContext } from "./useAuthContext.js";
import Cookies from "js-cookie";


export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [errors, setErrors] = useState([])
    const [loading, setLoading] = useState(true)

    const signup = async (user) => {
        
        try {
            const res = await registerRequest(user)
            setUser(res.data)
            setIsAuthenticated(true)
        } catch (error) {
            console.log(error.response.data.message)
            setErrors(error.response.data)
        }
    }

    const signIn = async (user) => {
        try {
            const res = await loginUser(user)
            setUser(res.data)
            setIsAuthenticated(true)
            
        } catch (error) {
            console.log(error.response.data)
            setErrors(error.response.data)
        }
    }

    const logOut = () => {
        Cookies.remove("token")
        setIsAuthenticated(false)
        setUser(null)
    }

    useEffect(() => {
        if(errors.length > 0){
            const timer = setTimeout(() => {
                setErrors([])
            }, 5000)
            return () => clearTimeout(timer)
        }
    }, [errors])

    useEffect(() => {
        const checkLogin = async () => {
          const cookies = Cookies.get();
          if (!cookies.token) {
            setIsAuthenticated(false);
            setLoading(false);
            return;
          }
    
          try {
            const res = await verifyTokenRequest(cookies.token);   
            if (!res.data) return setIsAuthenticated(false);
            setIsAuthenticated(true);
            setUser(res.data);
            setLoading(false);
          } catch (error) {
            setIsAuthenticated(false);
            setLoading(false);
          }
        };
        checkLogin();
      }, []);


    return(
        <AuthContext.Provider value={{loading, signup, signIn, logOut, user, isAuthenticated, errors}}>
            {children}
        </AuthContext.Provider>
    )
}

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired, // Valida que children sea un nodo React y que es obligatorio
};

