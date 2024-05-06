import * as stylex from "@stylexjs/stylex";
import {
  myBlackColors,
  myFontSizes,
  mywhiteColors,
} from "../../assets/styles/styles.stylex";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import { useRoles } from "../../context/RoleProvider";
import { useUsers } from "../../context/user/UserProvider";
import Modal from "react-modal";
import UserPreview from "./UserPreview";
// import UserForm from "./UserForm";

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
  // const [currentComponent, setCurrentComponent] = useState(<UserForm />);
  const { createUser } = useUsers();
  // const { filteredRoles } = props;
  const { roles, loadRoles, rolesToSpanish } = useRoles();
  const [formValues, setFormValues] = useState();
  const [showPreview, setShowPreview] = useState(false);

  //const [ModalIsOpen, setIsOpen] = useState(false);

  useEffect(() => {
    loadRoles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // function openModal() {
  //   setIsOpen(true);
  // }
  // function closeModal() {
  //   setIsOpen(false);
  // }

  // const showComponent = (component) => {
  //   if (currentComponent) {
  //     setCurrentComponent(null);
  //   }
  //   setCurrentComponent(component);
  // };
  function filteredRoles() {
    return (
      rolesToSpanish &&
      rolesToSpanish.filter((role) => role.roleName !== "admin")
    );
  }
  // const filteredRoles=() => {
  //   return (roles && roles.filter((role)=> role.roleName !=='admin')) || [];
  // }
  const handleRegisterData = async () => {
    try {
      // console.log(formValues);
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

      {showPreview ? (
        <UserPreview
          {...stylex.props(styles.baseFormField())}
          values={formValues}
          roles={roles}
          handleShowPreview={handleShowPreview}
          handleRegisterData={handleRegisterData}
        />
      ) : (
        <div {...stylex.props(styles.baseFormField())}>
          <Formik
            initialValues={formValues}
            enableReinitialize={true}
            onSubmit={async (values, actions) => {
              // openModal();
              console.log(rolesToSpanish);
              setFormValues(values);
              actions.setSubmitting(false);
              handleShowPreview();
              console.log(values);
              //HandleShowPreview(values);
              // try {
              //   const response = await createUser(values);
              //   if (!response.error) {
              //     alert("Usuario creado correctamente");
              //     // action.resetForm();
              //   } else {
              //     throw new Error(response.message);
              //   }
              // } catch (err) {
              //   alert(`Error al registrar el usuario: ${err}`);
              // }
            }}
          >
            {({ handleChange, handleSubmit, values, isSubmitting }) => (
              <form onSubmit={handleSubmit}>
                <div>
                  <div {...stylex.props(styles.formField())}>
                    <label htmlFor="">Nombre(s):</label>
                    <input
                      type="text"
                      name="firstName"
                      onChange={handleChange}
                      value={values.firstName}
                      {...stylex.props(styles.input())}
                      required
                    />
                    <label htmlFor="">Apellido(s)</label>
                    <input
                      type="text"
                      name="lastName"
                      onChange={handleChange}
                      value={values.lastName}
                      {...stylex.props(styles.input())}
                      required
                    />
                    {/* <label htmlFor="">Nombre de Usuario</label>
              <input
                type="text"
                name="userName"
                onChange={handleChange}
                value={values.userName}
              /> */}
                    <div {...stylex.props(styles.roleAndSelectField())}>
                      <div {...stylex.props(styles.selectField())}>
                        <label htmlFor="">Rol</label>
                        <select
                          required
                          name="roleId"
                          onChange={handleChange}
                          value={values.roleId || ""}
                          {...stylex.props(styles.selectStyle())}
                        >
                          <option value="">Seleccione un Rol...</option>
                          {filteredRoles() &&
                            filteredRoles().map((role) => (
                              <option key={role._id} value={role._id}>
                                {role.roleName}
                              </option>
                            ))}
                        </select>
                      </div>
                      <div {...stylex.props(styles.phoneField())}>
                        <label htmlFor="">Telefono</label>
                        <input
                          required
                          type="text"
                          name="phone"
                          onChange={handleChange}
                          value={values.phone}
                          //{...stylex.props(styles.input())}
                          {...stylex.props(styles.phoneInput())}
                        />
                      </div>
                    </div>
                    <label htmlFor="">Correo Electronico</label>
                    <input
                      required
                      type="text"
                      name="email"
                      onChange={handleChange}
                      value={values.email}
                      {...stylex.props(styles.input())}
                    />
                    <label htmlFor="">Carnet de identidad</label>
                    <input
                      required
                      type="text"
                      name="ci"
                      onChange={handleChange}
                      value={values.ci}
                      {...stylex.props(styles.input())}
                    />
                  </div>
                  <div {...stylex.props(styles.buttonField())}>
                    <button
                      {...stylex.props(styles.buttonStyle())}
                      type="submit"
                    >
                      Siguiente
                    </button>
                  </div>
                  {/* { showPreview} */}
                  {/* <Modal
                    isOpen={ModalIsOpen}
                    onRequestClose={closeModal}
                    //style={modalStyles}
                    // overlayClassName={overlay}
                    //overlay={overlay}
                    style={{
                      overlay: {
                        backgroundColor: "rgba(255, 255, 255, 0.37)",
                      },
                      content: {
                        background: "rgba(0, 0, 0, 0.79)",
                        top: "40px",
                        left: "30%",
                        right: "30%",
                        bottom: "40px",
                        border: "1px solid rgba(0, 0, 0, 1)",
                        //color: '#fff'
                      },
                    }}
                  >
                  </Modal> */}
                </div>
              </form>
            )}
          </Formik>
        </div>
      )}
    </div>
  );
}
export default RegisterUserForm;
