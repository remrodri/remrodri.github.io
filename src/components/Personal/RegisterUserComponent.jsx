import * as stylex from '@stylexjs/stylex';
import { myBlackColors, myFontSizes, mywhiteColors } from '../../assets/styles/styles.stylex';
import { Formik } from 'formik';
import { createUser } from '../../services/userService';

const styles = stylex.create({
  base: () => ({
    height: "100%",
    width: "100%",
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
    //    gap:'0.1rem',
  }),
  progressBarStep1: () => ({
    fontSize: myFontSizes.myFontSize7,
    fontWeight: "400",
    width: "10rem",
    height: "4rem",
    //border: "1px solid rgba(255, 255, 255, 0.3)",
    borderTop: "1px solid rgba(255, 255, 255, 0.3)",
    //borderRight: "1px solid rgba(255, 255, 255, 0.3)",
    borderBottom: "1px solid rgba(255, 255, 255, 0.3)",
    borderRadius: "30px 0 0 30px",
    //borderTopLeftRadius: "-30px",
    backgroundColor: "rgba(255, 255, 255, 0.27)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textShadow:
      "2px 2px 4px rgba(0, 0, 0, 0.3),-2px -2px 4px rgba(0, 0, 0, 0.3),2px -2px 4px rgba(0, 0, 0, 0.3), -2px 2px 4px rgba(0, 0, 0, 0.3)",
  }),
  progressBarStep2: () => ({
    fontSize: myFontSizes.myFontSize7,
    color:mywhiteColors.ghost,
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
  formField: () => ({}),
});
function RegisterUserComponent() { 
  
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
      <div {...stylex.props(styles.formField())}>
        formulario
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            userName: "",
            roleId: "",
            phone: "",
            email: "",
            status: "",
            ci: "",
          }}
          onSubmit={async (values, action) => {
            console.log(values);
            try {
              const response = await createUser(values);
              if (!response.error) {
                alert("Usuario creado correctamente");
                action.resetForm();
              } else {
                throw new Error(response.message);
              }
            } catch (err) {
              alert(`Error al registrar el usuario: ${err}`);
            }
          }}
        ></Formik>
      </div>
    </div>
  );
}
export default RegisterUserComponent;