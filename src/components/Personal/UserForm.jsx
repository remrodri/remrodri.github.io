import { Formik } from "formik";
import * as stylex from "@stylexjs/stylex";
import { useRoles } from "../../context/RoleProvider";
import { mywhiteColors } from "../../assets/styles/styles.stylex";

const styles = stylex.create({
  base: () => ({
    color:mywhiteColors.antiflesh,
  })
});

// eslint-disable-next-line react/prop-types
function UserForm({ formValues, setformValues, handleShowPreview}) {
  const { rolesToSpanish } = useRoles();
  function filteredRoles() {
    // console.log(rolesToSpanish);
    return (
      rolesToSpanish &&
      // eslint-disable-next-line react/prop-types
      rolesToSpanish.filter((role) => role.roleName !== "admin")
    );
  }


  return (
    <Formik
      initialValues={formValues}
      //enableReinitialize={true}
      onSubmit={async (values, actions) => {
        actions.setSubmitting(false);
        setformValues(values);
        console.log(formValues);
        handleShowPreview();
        //showComponent(<UserPreview values={values}/>)
        // console.log("values::: ", values);
      }}
    >
      {({ handleChange, handleSubmit, values }) => (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="nombres">Nombre(s)</label>
            <input
              {...stylex.props(styles.base())}
              type="text"
              id="firstName"
              onChange={handleChange}
              value={values.firstName}
              required
            />
            <label htmlFor="apellidos">Apellido(s)</label>
            <input
            {...stylex.props(styles.base())}
              type="text"
              name="lastName"
              onChange={handleChange}
              value={values.lastName}
              required
            />
            <div>
              <div>
                <label htmlFor="rol">Rol</label>
                <select
                  required
                  name="roleId"
                  onChange={handleChange}
                  value={values.roleId || ""}
                >
                  <option value="">Seleccione un rol...</option>
                  {filteredRoles() &&
                    filteredRoles().map((role) => (
                      <option key={role._id} value={role._id}>
                        {role.roleName}
                      </option>
                    ))}
                </select>
              </div>
              <div>
                <label htmlFor="phone">Telefono</label>
                <input
                {...stylex.props(styles.base())}
                  required
                  type="text"
                  name="phone"
                  onChange={handleChange}
                  value={values.phone}
                />
              </div>
            </div>
            <label htmlFor="email">Correo Electronico</label>
            <input
            {...stylex.props(styles.base())}
              required
              type="email"
              name="email"
              onChange={handleChange}
              value={values.email}
            />
            <label htmlFor="ci">Cedula de identidad</label>
            <input
            {...stylex.props(styles.base())}
              required
              type="text"
              name="ci"
              value={values.ci}
              onChange={handleChange}
            />
            <div>
              <button
                type="submit"
                // onClick={() =>
                //   showComponent(
                //     <UserPreview
                //       values={values}
                //       showComponent={showComponent}
                //     />
                //   )
                // }
              >
                Siguiente
              </button>
            </div>
          </div>
        </form>
      )}
    </Formik>
  );
}
export default UserForm;