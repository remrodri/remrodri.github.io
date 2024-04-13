import { useContext, useEffect, useState } from "react";
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
  

  useEffect(() => {
    loadUsers()
  },[])
  // cargar usuarios
  async function loadUsers() {
    try {
      const response = await getAllUsers();
      setUsers(response);
      // console.log("users::: ", users);
    } catch (error) {
      console.log(error);      
    }
    
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
        //loadUsers,
        createUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
