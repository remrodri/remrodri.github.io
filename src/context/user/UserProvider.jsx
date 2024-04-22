import { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import {
  createUserRequest,
  getAllUsers,
  getUserByIDRequest,
  removeUserRequest,
  updateUserRequest,
} from "../../services/userService";

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
    loadUsers();
  }, []);
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
      if (response === "Usuario creado correctamente") { 
        setUsers([...users, user]);
        return response;
      }
        // console.log('response::: ', response);
    } catch (error) {
      console.log(error);
    }
  }
  async function getUserByID(id) {
    try {
      const response = await getUserByIDRequest(id);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  const updateUser = async (id, newData) => {
    // console.log('newData::: ', newData);
    // console.log('id::: ', id);
    try {
      const response = await updateUserRequest(id, newData);

      // console.log('response::: ', response);
      setUsers(users.map((user) => (user.id === id ? newData : user)));
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = async (id) => {
    try {
      const response = await removeUserRequest(id);
      setUsers(users.filter((user) => user._id !== id));
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        users,
        //loadUsers,
        createUser,
        getUserByID,
        updateUser,
        deleteUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
