import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import useAuth from "./hooks/auth";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";

const App = () => {
  const token = localStorage.getItem("token");
  if (token) {
    const decodedToken = jwtDecode(token);
    console.log('decodedToken::: ', decodedToken);
  }
  useEffect(() => {
    token
  },[token])

  return <RouterProvider router={router} />;
};
const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to='/login'/>,
  },
  {
    path: '/login',
    element:<LoginPage/>
  },
  {
    path: '/admin',
    element:<AdminPage/>
  }  
]);

export default App;

