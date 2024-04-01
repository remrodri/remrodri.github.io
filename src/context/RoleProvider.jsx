import { createContext, useEffect, useState } from "react";
import { getRoles } from "../services/roleService";

export const RoleContext = createContext();
// eslint-disable-next-line react/prop-types
export const RoleContextProvider = ({ children }) => { 
  const [roles, setRoles] = useState([]);

  async function loadRoles() {
    try {
      const response = await getRoles();
      console.log('response::: ', response);
      setRoles(response);
    } catch (error) {
      console.error("Error al cargar los roles", error);
    }
  }
  useEffect(() => {
    loadRoles();
  }, []);
  return (
    <RoleContext.Provider value={{ roles }}>
      {children}
    </RoleContext.Provider>
  )
}
