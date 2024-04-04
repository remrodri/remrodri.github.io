import * as stylex from "@stylexjs/stylex";
import { myFontSizes, mywhiteColors } from "../../assets/styles/styles.stylex";
import { useState } from "react";
import RegisterUserComponent from "./RegisterUserComponent";

const styles = stylex.create({
  base: () => ({
    height: "100%",
    width: "100%",
    // background: {
    //   //default: "rgba(248, 248, 255, 0.21)",
    //   default: "rgba(57, 47, 48, 0.56)",
    // },
    background: {
      //default: "rgba(27, 29, 36, 0.62)",
      default: "rgba(27, 29, 36, 0.38)",
    },
    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
    backdropFilter: "blur(20px)",
    border: "1px solid rgba(0, 0, 0, 0.3)",
    borderTopRightRadius: "16px",
    borderBottomRightRadius: "16px",

    //boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
    //backdropFilter: "blur(13px)",
    //border: "1px solid rgba(248, 248, 255, 0.3)",
    //border: "1px solid rgba(57, 47, 48, 0.3)",
    padding: "1rem",
  }),
  buttonsContainer: () => ({
    height: "10%",
    marginBottom: "1%",
    background: {
      //default: "rgba(27, 26, 57, 0.2)",
      //default: "rgba(255, 255, 255, 0.12)",
      default: "rgba(27, 29, 36, 0.38)",
    },
    //backdropFilter: "blur(20px)",
    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
    //border: "1px solid rgba(27, 26, 57, 0.3)",
    border: "1px solid rgba(0, 0, 0, 0.3)",
    borderTopRightRadius: "6px",
    // display: "flex",
    // flexDirection: "column",
    // justifyContent: "center",
    padding: "0 1rem",
  }),
  labelButtonsField: () => ({
    color: mywhiteColors.antiflesh,
    fontSize: myFontSizes.myFontSize7,
    height: "35%",
    display: "flex",
    alignItems: "center",
  }),
  buttonsField: () => ({
    height: "65%",
    display: "flex",
    alignItems: "center",
  }),
  buttonRegisterStyle: () => ({
    color: mywhiteColors.antiflesh,
    fontSize: myFontSizes.myFontSize7,
    background: {
      default: "#429962",
      ":hover": "#2b7045",
    },
    border: "1px solid rgba(0, 0, 0, 0.3)",
    width: "15rem",
    height: "3rem",
    textAlign: "center",
    borderRadius: "0.6rem",
  }),
  workSpaceContainer: () => ({
    height: "88.3%",
  }),
});
function PersonalComponent() {
  const [currentComponent,setCurrentComponent]=useState(null)

    const showComponent = (component) => {
      if (currentComponent) {
        setCurrentComponent(null);
      }
      setCurrentComponent(component);
    };
  return (
    <div {...stylex.props(styles.base())}>
      <div {...stylex.props(styles.buttonsContainer())}>
        <div {...stylex.props(styles.labelButtonsField())}>
          <label>Gestion de personal</label>
        </div>
        <div {...stylex.props(styles.buttonsField())}>
          <button
            onClick={()=>showComponent(<RegisterUserComponent/>)}
            {...stylex.props(styles.buttonRegisterStyle())}>
            Registrar
          </button>
        </div>
      </div>
      <div {...stylex.props(styles.workSpaceContainer())}>
        {currentComponent}
      </div>
    </div>
  );
}
export default PersonalComponent;
