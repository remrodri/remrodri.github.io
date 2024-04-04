import { useContext, useState } from "react";
import { UserContext } from "./UserContexto";
import { getAllUsers } from "../../services/userService";

// eslint-disable-next-line react-refresh/only-export-components
export const useUsers = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUsers must be used within a UsersProvider");
  }
  return context;
};

// eslint-disable-next-line react/prop-types
export const UserContextProvider = ({ children }) => {
  const [users, setUsers] = useState([]);

  // cargar usuarios
  async function loadUsers() {
    const response = await getAllUsers();
    setUsers(response);
  }
  return (
    <UserContext.Provider
      value={{
        users,
        loadUsers
      }}>
      {children}
    </UserContext.Provider>
  )
}
