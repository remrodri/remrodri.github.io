import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import AdminPage from "./pages/AdminPage";
import LoginPage from "./pages/LoginPage";
import { useEffect, useState } from "react";
import { RoleContextProvider } from "./context/RoleProvider";
import RegisterUserForm from "./components/Personal/RegisterUserForm";
import PersonalComponent from "./components/Personal/PersonalComponent";
import LogComponent from "./components/LogComponent";
import { UserContextProvider } from "./context/user/UserProvider";
import CardsContainer from "./components/Personal/CardsContainer";

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
          <LoginPage setIsAuth={setIsAuth} />
        </RoleContextProvider>
      ),
    },
    {
      path: "administrador",
      element: JSON.parse(localStorage.getItem("isAuth")) ? (
        <UserContextProvider>
          <RoleContextProvider>
            <AdminPage />
          </RoleContextProvider>
        </UserContextProvider>
      ) : (
        <Navigate to="/" />
      ),
      children: [
        {
          path: "personal",
          element: <PersonalComponent />,
          children: [
            {
              path: "",
              element: <CardsContainer />,
            },
            {
              path: "nuevo",
              element: <RegisterUserForm />,
            },
            {
              path: 'editar/:id',
              element: <RegisterUserForm />,
            }
          ],
        },
        {
          path: "bitacora",
          element: <LogComponent />,
        },
      ],
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
