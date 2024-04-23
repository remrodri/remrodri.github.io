import * as stylex from "@stylexjs/stylex";
import {
  myBlackColors,
  myFontSizes,
  mywhiteColors,
} from "../assets/styles/styles.stylex";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/auth";

const styles = stylex.create({
  base: () => ({
    width: "20rem",
    height: "100%",
    background: {
      default: "rgba(27, 29, 36, 0.38)",
    },
    borderTopLeftRadius: "1.6rem",
    borderBottomLeftRadius: "1.6rem",
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
    border: "1px solid rgba(0, 0, 0, 0.3)",
    //borderRadius:'0.9rem'
    borderTopLeftRadius: "0.9rem",
    borderBottomLeftRadius: "0.9rem",
  }),
  logoutField: () => ({
    height: "7rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "1rem",
  }),
  logoutButtonStyle: () => ({
    height: "100%",
    width: "100%",
    fontSize: myFontSizes.myFontSize6,
    color: mywhiteColors.aliceBlue,
    textAlign: "center",
    background: {
      default: "rgba(27, 29, 36, 0.55)",
      ":hover": myBlackColors.blackColor1,
    },
    border: "1px solid rgba(0, 0, 0, 0.3)",
    borderBottomLeftRadius: "0.6rem",
  }),
});
function MenuComponent() {
  // const { roles } = props;
  const { decodeTokenRoleName } = useAuth();

  const navigate = useNavigate();

  const onLogout = () => {

    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div {...stylex.props(styles.base())}>
      <div {...stylex.props(styles.logoField())}>
        <label>{decodeTokenRoleName()}</label>
      </div>
      <div {...stylex.props(styles.buttonsField())}>
        <button
          // onClick={() => showComponent(<PersonalComponent />)}
          onClick={() => navigate("personal")}
          {...stylex.props(styles.buttonStyle())}
        >
          Personal
        </button>
        <button
          // onClick={() => showComponent(<LogComponent />)}
          onClick={() => navigate("bitacora")}
          {...stylex.props(styles.buttonStyle())}
        >
          Bitacora
        </button>
      </div>
      <div {...stylex.props(styles.logoutField())}>
        <button
          {...stylex.props(styles.logoutButtonStyle())}
          onClick={() => onLogout()}
        >
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
}
export default MenuComponent;
