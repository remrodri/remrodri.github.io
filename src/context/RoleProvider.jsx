import { useContext, useEffect, useState } from "react";
import { RoleContext } from "./RoleContext";
import { getRoles } from "../services/roleService";

// eslint-disable-next-line react-refresh/only-export-components
export const useRoles = () => {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error("useRoles must be used within a RolesProvider");
  }
  return context;
};

// eslint-disable-next-line react/prop-types
export const RoleContextProvider = ({ children }) => {
  const [roles, setRoles] = useState([]);
  // const [rolesToSpanish, setRolesToSpanish] = useState([]);

  useEffect(() => {
    loadRoles();
    // translateToSpanish();
  }, []);

  //cargar roles
  async function loadRoles() {
    try {
      const response = await getRoles();
      //console.log('response::: ', response);
      setRoles(response);
      // const translatedRoles = roles.map((role) => {
      //   return {
      //     ...role,
      //     roleName: translateToSpanish(role.roleName),
      //   };
      // });
      // setRolesToSpanish(translatedRoles);
      // translateToSpanish();
    } catch (error) {
      console.error("Error al cagar roles:", error);
    }
  }

  // const translateToSpanish = useMemo(() => {
  //   return (rolename) => {
  //     switch (rolename) {
  //       case "admin":
  //         return "Administrador";
  //       case "tourGuide":
  //         return "Guia";
  //       case "salesOperator":
  //         return "Operador";
  //       default:
  //         return "sin nombre";
  //     }
  //   };
  // }, []);
  
  // function translateToSpanish(roleName) {
  //   switch (roleName) {
  //     case "admin":
  //       return "Administrador";
  //     case "tourGuide":
  //       return "Guia";
  //     case "salesOperator":
  //       return "Operador";
  //     default:
  //       return "sin nombre";
  //   }
  // }

  // function getRoleById(idRole) {
  //   console.log("idRole::: ", idRole);
  //   console.log(rolesToSpanish);
  //   const roleName = rolesToSpanish.find((role) => {
  //     return role._id === idRole;
  //   })?.roleName;
  //   return roleName || "sin nombre";
  //   // if (roleName==='salesOperator') {
  //   //   return 'Operador de ventas'
  //   // }
  //   // if (roleName === 'guide') {
  //   //   return 'Guia'
  //   // }
  //   // return roleName;
  // }

  return (
    <RoleContext.Provider
      value={{
        roles,
        loadRoles,
        // translateToSpanish,
        // rolesToSpanish
        // getRoleById,
        // rolesToSpanish,
      }}
    >
      {children}
    </RoleContext.Provider>
  );
};
