import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import AdminPage from "./pages/AdminPage";
import LoginPage from "./pages/LoginPage";
import PrivateRoute from "./components/PrivateRoute";
import { useEffect, useState } from "react";


function App() {
    const [isAuth, setIsAuth] = useState(true);

    useEffect(() => {
      const userInfo = localStorage.getItem("userInfo");
      console.log("userInfo::: ", userInfo);
      if (userInfo) {
        setIsAuth(true);
      }
    }, []);
  const router = createBrowserRouter([
    {
      path:'/',
      element: <LoginPage setIsAuth/>
    },
    {
      path: "administrador/*",
      element: (isAuth ? <AdminPage /> : <Navigate to ="/" />),
    },
    {
      path:'operador'
    },
    {
      path:'guia'
    }
  ]);

  return <RouterProvider router={router} />;
}

export default App;
