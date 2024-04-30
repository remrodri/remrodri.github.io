import { useState } from "react";
import { login,logoutRequest } from "../services/userService";
import { jwtDecode } from "jwt-decode";


const useAuth = () => {
  const [isAuth, setIsAuth] = useState(false);
  
  const handleLogin = async (values) => {
    
    // console.log('values::: ', values);
    try {
      const token = await login(values);
      if (token){
        setIsAuth(true);
        localStorage.setItem('token', token);

      }
    } catch (error) {
      console.error('Error en el inicio de sesion',error.message);
      
    }
    setIsAuth(true);
  };

  const decodeTokenRoleName = () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const decodedToken = jwtDecode(token);
        // console.log('decodedToken::: ', decodedToken);
        return decodedToken.roleName
      }
    } catch (error) {
      console.error('No hay Token para Decodificar',error)
    }
  }



  const logout = () => {
    try {

      const token = localStorage.getItem('token');
      if (token) {
        const decodedToken = jwtDecode(token);
        // console.log('decodedToken::: ', decodedToken.userId);
        logoutRequest(decodedToken.userId);
      }
      setIsAuth(false);
      localStorage.removeItem("token");

    } catch (error) {
      console.error('No hay token para decodificar', error);
    }
  };
  return { isAuth, handleLogin, logout, decodeTokenRoleName };
};
export default useAuth;
