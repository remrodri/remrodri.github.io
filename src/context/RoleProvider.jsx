import { useContext, useState } from "react"
import { RoleContext } from "./RoleContext"
import { getRoles } from "../services/roleService";

// eslint-disable-next-line react-refresh/only-export-components
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
  
  //cargar roles
  async function loadRoles() {
    const response = await getRoles();
    //console.log('response::: ', response);
    setRoles(response);
  }

  const rolesToSpanish = roles.map(role => {
    return {
      ...role,
      roleName: translateToSpanish(role.roleName)
    }
  });
  function translateToSpanish(roleName) { 
    switch (roleName) {
      case 'tourGuide':
        return 'Guia';
      case 'salesOperator':
        return 'Operador de ventas';
      default:
        return roleName;
    }
  }

  function getRoleByID(idRole) {
    const roleName = rolesToSpanish.find(role => { return role._id === idRole }).roleName
      // if (roleName==='salesOperator') {
      //   return 'Operador de ventas'
      // }
      // if (roleName === 'guide') {
      //   return 'Guia'
    // }
    return roleName;
    }
  
  return (
    <RoleContext.Provider value={{
      roles,
      loadRoles,
      getRoleByID,
      rolesToSpanish
    }}>
      {children}
    </RoleContext.Provider>
  )
}