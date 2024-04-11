import * as stylex from "@stylexjs/stylex";
import {
  myBlackColors,
  myFontSizes,
  mywhiteColors,
} from "../../assets/styles/styles.stylex";
import { useEffect, useState } from "react";
import { useRoles } from "../../context/RoleProvider";
import { useUsers } from "../../context/user/UserProvider";
import Modal from "react-modal";
import UserPreview from "./UserPreview";
import UserForm from "./UserForm";

const styles = stylex.create({
  base: () => ({
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
  }),
  baseLabelField: () => ({
    width: "100%",
    display: "flex",
    justifyContent: "center",
    height: "3rem",
  }),
  baseLabelStyle: () => ({
    color: mywhiteColors.antiflesh,
    fontSize: myFontSizes.myFontSize5,
  }),
  progressBarField: () => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "6rem",
  }),
  progressBarStep1: () => ({
    fontSize: myFontSizes.myFontSize7,
    fontWeight: "400",
    width: "10rem",
    height: "4rem",
    borderTop: "1px solid rgba(255, 255, 255, 0.3)",
    borderBottom: "1px solid rgba(255, 255, 255, 0.3)",
    borderRadius: "30px 0 0 30px",
    backgroundColor: "rgba(255, 255, 255, 0.27)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textShadow:
      "2px 2px 4px rgba(0, 0, 0, 0.3),-2px -2px 4px rgba(0, 0, 0, 0.3),2px -2px 4px rgba(0, 0, 0, 0.3), -2px 2px 4px rgba(0, 0, 0, 0.3)",
  }),
  progressBarStep2: () => ({
    fontSize: myFontSizes.myFontSize7,
    color: mywhiteColors.ghost,
    fontWeight: "400",
    width: "10rem",
    height: "4rem",
    borderTop: "1px solid rgba(255, 255, 255, 0.3)",
    borderBottom: "1px solid rgba(255, 255, 255, 0.3)",
    backgroundColor: "rgba(255, 255, 255, 0.27)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textShadow:
      "2px 2px 4px rgba(255, 255, 255, 0.3),-2px -2px 4px rgba(255, 255, 255, 0.3),2px -2px 4px rgba(255, 255, 255, 0.3), -2px 2px 4px rgba(255, 255, 255, 0.3)",
  }),
  progressBarStep3: () => ({
    fontSize: myFontSizes.myFontSize7,
    fontWeight: "400",
    width: "10rem",
    height: "4rem",
    backgroundColor: "rgba(255, 255, 255, 0.27)",
    borderRadius: "0 30px 30px 0",
    borderTop: "1px solid rgba(255, 255, 255, 0.3)",
    borderBottom: "1px solid rgba(255, 255, 255, 0.3)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textShadow:
      "2px 2px 4px rgba(0, 0, 0, 0.3),-2px -2px 4px rgba(0, 0, 0, 0.3),2px -2px 4px rgba(0, 0, 0, 0.3), -2px 2px 4px rgba(0, 0, 0, 0.3)",
  }),
  baseFormField: () => ({
    height: "86.4%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }),
  formField: () => ({
    height: "40rem",
    display: "flex",
    flexDirection: "column",
    color: mywhiteColors.antiflesh,
    fontSize: myFontSizes.myFontSize5,
    width: "40rem",
  }),
  input: () => ({
    fontSize: myFontSizes.myFontSize6,
    color: myBlackColors.blackColor1,
    height: "3rem",
    background: mywhiteColors.antiflesh,
    // width: "100%",
    borderRadius: "6px",
    padding: "0 3px",
  }),
  selectStyle: () => ({
    fontSize: myFontSizes.myFontSize6,
    borderRadius: "6px",
    width: "100%",
    height: "3rem",
    background: mywhiteColors.antiflesh,
  }),
  roleAndSelectField: () => ({
    display: "flex",
    width: "100%",
    gap: "4%",
  }),
  selectField: () => ({
    width: "48%",
  }),
  phoneField: () => ({
    width: "48%",
  }),
  phoneInput: () => ({
    fontSize: myFontSizes.myFontSize6,
    color: myBlackColors.blackColor1,
    height: "3rem",
    background: mywhiteColors.antiflesh,
    width: "98%",
    borderRadius: "6px",
    paddingLeft: "3px",
  }),
  buttonField: () => ({
    height: "4rem",
  }),
  buttonStyle: () => ({
    height: "100%",
    width: "100%",
    fontSize: myFontSizes.myFontSize7,
    textAlign: "center",
    background: "#2b7045",
    color: mywhiteColors.antiflesh,
    borderRadius: "6px",
  }),
});

Modal.setAppElement("#root");

function RegisterUserForm() {
  const { createUser } = useUsers();
  const { loadRoles} = useRoles();
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    roleId: "",
    phone: "",
    ci: "",
    email: "",
  });
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    loadRoles();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const handleRegisterData = async () => {
    try {
      const response = await createUser(formValues);
      if (response) {
        alert("Usuario creado correctamente");
        // action.resetForm();
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      alert(`Error al registrar el usuario: ${err}`);
    }
  };
  function handleShowPreview() {
    setShowPreview(!showPreview);
  }

  return (
    <div {...stylex.props(styles.base())}>
      <div {...stylex.props(styles.baseLabelField())}>
        <label {...stylex.props(styles.baseLabelStyle())}>
          Registro de nuevo usuario
        </label>
      </div>
      <div {...stylex.props(styles.progressBarField())}>
        <div {...stylex.props(styles.progressBarStep1())}>Paso 1</div>
        <div {...stylex.props(styles.progressBarStep2())}>Paso 2</div>
        <div {...stylex.props(styles.progressBarStep3())}>Paso 3</div>
      </div>
      {!showPreview ? <UserForm formValues={formValues} setformValues={setFormValues} handleShowPreview={ handleShowPreview} /> : <UserPreview formValues={formValues} handleShowPreview={handleShowPreview} handleRegisterData={handleRegisterData}/>}
    </div>
  );
}
export default RegisterUserForm;
