import { useContext, useState } from "react"
import { RoleContext } from "./RoleContext"
import { getRoles } from "../services/roleService";

export const useRoles = () => {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error("useRoles must be used within a RolesProvider")
  }
  return context;
};

// eslint-disable-next-line react/prop-types
export const RoleContextProvider = ({ children }) => { 
  const [roles, setRoles] = useState([]);
  
  async function loadRoles() {
    const response = await getRoles();
    //console.log('response::: ', response);
    setRoles(response);
  }
  return (
    <RoleContext.Provider value={{ roles, loadRoles }}>
      {children}
    </RoleContext.Provider>
  )
}