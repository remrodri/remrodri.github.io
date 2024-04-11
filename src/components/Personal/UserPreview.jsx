/* eslint-disable react/prop-types */
import * as stylex from "@stylexjs/stylex";
import { myBlackColors, myFontSizes, mywhiteColors } from "../../assets/styles/styles.stylex";
import { useRoles } from "../../context/RoleProvider";

const styles = stylex.create({
  base: () => ({
    color: mywhiteColors.antiflesh,
    height: "86.4%",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }),
  userInformationContainer: () => ({
    width: "35%",
    height: "90%",
    background: {
      default: "rgba(27, 29, 36, 0.38)",
    },
    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
    backdropFilter: "blur(13px)",
    border: "1px solid rgba(0, 0, 0, 0.3)",
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  }),
  labelInformationfield: () => ({
    fontSize: myFontSizes.myFontSize4,
    height: "10%",
    alignContent: "center",
  }),
  userInformationField: () => ({
    height: "75%",
    fontSize: myFontSizes.myFontSize5,
    width: "80%",
    alignContent:'center',
  }),
  titleStyles: () => ({
    background: myBlackColors.blackColor2,
    paddingLeft: "1rem",
  }),
  infoStyles: () => ({
    background: myBlackColors.blackColor3,
    textAlign: "center",
  }),
  buttonsField: () => ({
    height: "15%",
    width: "100%",
    fontSize: myFontSizes.myFontSize6,
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
  }),
  buttonsStyle: () => ({
    color: myBlackColors.blackColor1,
    height: "4.5rem",
    width: "45%",
    textAlign: "center",
    background: {
      default: "rgba(27, 29, 36, 0.38)",
    },
    borderRadius: "10px",
  }),
  editButtonStyle: () => ({
    background: {
      default: "#e5b55c",
    },
  }),
  registerButtonStyle: () => ({
    background: {
      default: "#2a80f9",
    },
  }),
});
function UserPreview({ formValues, handleShowPreview, handleRegisterData }) {
  // console.log("roles::: ", roles);
  const { getRoleByID } = useRoles();
  // console.log(getRoleByID("66018c264cbbc339db1bd87b"));

  return (
    <div {...stylex.props(styles.base())}>
      <div {...stylex.props(styles.userInformationContainer())}>
        <div {...stylex.props(styles.labelInformationfield())}>
          <label htmlFor="">Revisa la información del usuario</label>
        </div>
        <div {...stylex.props(styles.userInformationField())}>
          <p {...stylex.props(styles.titleStyles())}>Nombre(s):</p>
          <p {...stylex.props(styles.infoStyles())}>{formValues.firstName}</p>
          <p {...stylex.props(styles.titleStyles())}>Apellido(s):</p>
          <p {...stylex.props(styles.infoStyles())}>{formValues.lastName}</p>
          <p {...stylex.props(styles.titleStyles())}>Rol:</p>
          <p {...stylex.props(styles.infoStyles())}>
            {getRoleByID(formValues.roleId)}
          </p>
          <p {...stylex.props(styles.titleStyles())}>Telefono:</p>
          <p {...stylex.props(styles.infoStyles())}>{formValues.phone}</p>
          <p {...stylex.props(styles.titleStyles())}>Correo electronico: </p>
          <p {...stylex.props(styles.infoStyles())}>{formValues.email}</p>
          <p {...stylex.props(styles.titleStyles())}>Carnet de identidad:</p>
          <p {...stylex.props(styles.infoStyles())}>{formValues.ci}</p>
        </div>
        <div {...stylex.props(styles.buttonsField())}>
          <button
            onClick={() => handleShowPreview()}
            {...stylex.props(styles.buttonsStyle(), styles.editButtonStyle())}
          >
            Editar
          </button>
          <button
            type="submit"
            onClick={() => handleRegisterData()}
            {...stylex.props(
              styles.buttonsStyle(),
              styles.registerButtonStyle()
            )}
          >
            Registrar
          </button>
        </div>
      </div>
    </div>
  );
}
export default UserPreview;
