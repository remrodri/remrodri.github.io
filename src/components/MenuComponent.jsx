import * as stylex from "@stylexjs/stylex";
import { useRoles } from "../context/RoleProvider";
import { useEffect } from "react";
import {
  myBlackColors,
  myFontSizes,
  mywhiteColors,
} from "../assets/styles/styles.stylex";
import { useNavigate } from "react-router-dom";


const styles = stylex.create({
  base: () => ({
    width: "20rem",
    height: "100%",
    background: {
      default: "rgba(27, 29, 36, 0.38)",
    },
    borderTopLeftRadius: "16px",
    borderBottomLeftRadius: "16px",
    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
    backdropFilter: "blur(13px)",
    border: "1px solid rgba(0, 0, 0, 0.3)",
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
  }),
  logoField: () => ({
    height: "7rem",
    color: mywhiteColors.whiteInput,
    fontSize: myFontSizes.myFontSize5,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }),
  buttonsField: () => ({
    flexGrow: 1,
    padding: "0 0.6rem",
    display: "flex",
    flexDirection: "column",
    gap: "0.6rem",
  }),
  buttonStyle: () => ({
    fontSize: myFontSizes.myFontSize6,
    color: mywhiteColors.aliceBlue,
    height: "3.5rem",
    textAlign: "center",
    background: {
      default: "rgba(27, 29, 36, 0.55)",
      ":hover": myBlackColors.blackColor1,
    },
    border: "2px solid rgba(0, 0, 0, 0.3)",
    //borderRadius:'0.9rem'
    borderTopLeftRadius: "0.9rem",
    borderBottomLeftRadius: "0.9rem",
  }),
  logoutField: () => ({
    height: "7rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }),
  logoutButtonStyle: () => ({
    height: "4rem",
    width: "6rem",
  }),
});
function MenuComponent(props) {
  const navigate = useNavigate();
  //const { roles, loadRoles } = useRoles();
  //const userInfo = localStorage.getItem("userInfo");
  //const roleId = JSON.parse(userInfo).roleId;
  //console.log("roleId::: ", roleId);
  useEffect(() => {
    //loadRoles();
  }, []);

  function getRoleName() {
    // localStorage.setItem('role', JSON.stringify(roles.find((role) => role._id === roleId).roleName));
    // console.log('roles::: ', roles);
    //const roleObj = roles.find((role) => role._id === roleId);
    const roleInfo = localStorage.getItem("role");
    const roleToObj = JSON.parse(roleInfo);
    //console.log("roleToObj::: ", roleToObj);
    if (roleToObj === "admin") return "Administrador";
    if (roleToObj === "operator") return "Operador";
    if (roleToObj === "guide") return "Guia";
  }

  const onLogout=()=> {
    localStorage.removeItem("userInfo");
    localStorage.removeItem("role");
    localStorage.removeItem("isAuth");
    navigate('/');
    //window.location.reload();
  }

  return (
    <div {...stylex.props(styles.base())}>
      <div {...stylex.props(styles.logoField())}>
        <label>{getRoleName()}</label>
      </div>
      <div {...stylex.props(styles.buttonsField())}>
        <button {...stylex.props(styles.buttonStyle())}>Personal</button>
        <button {...stylex.props(styles.buttonStyle())}>Bitacora</button>
      </div>
      <div {...stylex.props(styles.logoutField())}>
        <button
          {...stylex.props(styles.logoutButtonStyle())}
          onClick={()=>onLogout()}
        >
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
}
export default MenuComponent;
