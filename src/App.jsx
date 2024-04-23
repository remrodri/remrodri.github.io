import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { RoleContextProvider } from "./context/RoleProvider";
import CardsContainer from "./components/Personal/CardsContainer";
import { UserContextProvider } from "./context/user/UserProvider";
import PersonalComponent from "./components/Personal/PersonalComponent";
import RegisterUserForm from "./components/Personal/RegisterUserForm";
import LogComponent from "./components/LogComponent";

const App = () => {
  const token = localStorage.getItem("token");
  if (token) {
    const decodedToken = jwtDecode(token);
    console.log("decodedToken::: ", decodedToken);
  }
  useEffect(() => {
    token;
  }, [token]);

  return (
    <UserContextProvider>
      <RoleContextProvider>
        <RouterProvider router={router} />
      </RoleContextProvider>
    </UserContextProvider>
  );
};
const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/administrador",
    element: <AdminPage />,
    children: [
      {
        path: "personal",
        element: <PersonalComponent />,
        children: [
          {
            path: '',
            element:<CardsContainer/>
          },
          {
            path: 'nuevo',
            element:<RegisterUserForm/>
          },
          {
            path: 'editar/:id',
            element:<RegisterUserForm/>
          }
        ]
      },
      {path:'bitacora',element:<LogComponent/>}
    ],
  },
]);

export default App;
