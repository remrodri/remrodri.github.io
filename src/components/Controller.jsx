import { useEffect, useState } from "react";
import App from "../App";

import { Navigate } from "react-router-dom";


function Controller() {
  
  
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    console.log("userInfo::: ", userInfo);
    if (userInfo) {
      setIsAuth(true);
    }
  }, []);
  return isAuth ? (
    <App />
  ) : (
        <Navigate to="/"/>
  );
}
export default Controller;
