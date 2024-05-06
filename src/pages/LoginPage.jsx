import * as Yup from "yup";
import useAuth from "../hooks/auth";
import { ErrorMessage, Field, Form, Formik } from "formik";
// import { jwtDecode } from "jwt-decode";
// import { useRoles } from "../context/RoleProvider";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";
import * as stylex from "@stylexjs/stylex";
import { createPortal } from "react-dom";
import PasswordComponent from "../components/password/PasswordComponent";

const styles = stylex.create({
  passwordLabelStyle: () => ({
    cursor: "pointer",
  }),
});
function LoginPage() {
  const navigate = useNavigate();
  const { handleLogin, decodeTokenRoleName } = useAuth();
  // const { roles } = useRoles();
  const initialValues = {
    email: "",
    password: "",
  };
  const [swalShown, setSwalShown] = useState(false);
  const showSwal = () => {
    Swal.fire({
      didOpen: () => setSwalShown(true),
      didClose: () => setSwalShown(false),
    });
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await handleLogin(values);
      const roleName = decodeTokenRoleName() || "";
      // console.log('roleName::: ', roleName);
      if (roleName === "administrador") {
        navigate("/administrador");
      }
      // const token = localStorage.getItem("token");
      // if (token) {
      //   const decodedToken = jwtDecode(token);
      //   console.log('decodedToken::: ', decodedToken);
      //   // const roleId = decodedToken.roleId;
      //   // console.log('decodedToken::: ', decodedToken.roleId);

      //   // const userRole = roles.find((role) => {
      //   //   return role._id===roleId
      //   // })

      //   // console.log('userRole::: ', userRole.roleName);
      //   if (decodedToken.roleName === 'admin') {
      //     navigate('/administrador');
      //   }
      // }
    } catch (error) {
      console.error("Error en el inicio de sesion", error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <label htmlFor="email">Correo eletronico</label>
              <Field type="email" name="email" />
              <ErrorMessage name="email" component={"div"} />
            </div>
            <div>
              <label htmlFor="password">Contraseña</label>
              <Field type="password" name="password" />
              <ErrorMessage name="passeord" component={"div"} />
            </div>
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Iniciando sesion" : "Iniciar Sesión"}
            </button>
          </Form>
        )}
      </Formik>
      <label
        htmlFor=""
        onClick={showSwal}
        {...stylex.props(styles.passwordLabelStyle())}
      >
        Recuperar contraseña
      </label>
      {swalShown &&
        createPortal(<PasswordComponent />, Swal.getHtmlContainer())}
    </div>
  );
}
export default LoginPage;
