import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import AdminPage from "./pages/AdminPage";
import LoginPage from "./pages/LoginPage";
import { useEffect, useState } from "react";
import { RoleContextProvider } from "./context/RoleProvider";

function App() {
  // eslint-disable-next-line no-unused-vars
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      setIsAuth(true);
    }

  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <RoleContextProvider>
          <LoginPage setIsAuth={ setIsAuth} />
        </RoleContextProvider>
      ),
    },
    {
      path: "administrador",
      element: JSON.parse(localStorage.getItem("isAuth")) ? (
        <RoleContextProvider>
          <AdminPage />
        </RoleContextProvider>
      ) : (
        <Navigate to="/" />
      ),
    },
    {
      path: "operador",
    },
    {
      path: "guia",
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
