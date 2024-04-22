import { useState } from "react";
import { login } from "../services/userService";


const useAuth = () => {
  const [isAuth, setIsAuth] = useState(false);
  const handleLogin = async (values) => {
    console.log('values::: ', values);
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

  const logout = () => {
    setIsAuth(false);
    localStorage.removeItem("token");
  };
  return { isAuth, handleLogin, logout };
};
export default useAuth;
