import { useState } from "react";
import { login } from "../services/userService";
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
        return decodedToken.roleName
      }
    } catch (error) {
      console.error('No hay Token para Decodificar',error)
    }
  }

  const logout = () => {
    setIsAuth(false);
    localStorage.removeItem("token");
  };
  return { isAuth, handleLogin, logout, decodeTokenRoleName };
};
export default useAuth;
