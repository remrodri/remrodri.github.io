import { useContext, useState } from "react";
import { UserContext } from "./UserContext";
import { createUserRequest, getAllUsers } from "../../services/userService";

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
  // const createUser = async (user) => {
  //   console.log('user::: ', user);
  //   try {
  //     const response = await createUserRequest(user);
  //     setUsers([...users, response]);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  async function createUser(user) {
    // console.log("user::: ", user);
    try {
      const response = await createUserRequest(user);
      // console.log('response::: ', response);
      setUsers([...users, response]);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <UserContext.Provider
      value={{
        users,
        loadUsers,
        createUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
