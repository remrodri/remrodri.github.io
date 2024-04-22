import * as Yup from "yup";
import useAuth from "../hooks/auth";
import { ErrorMessage, Field, Form, Formik } from "formik";

function LoginPage() {
  const { handleLogin } = useAuth();
  const initialValues = {
    email: "",
    password: "",
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
              <ErrorMessage name='passeord' component={'div'}/>
            </div>
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting?'Iniciando sesion': 'Iniciar Sesión'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
export default LoginPage;
