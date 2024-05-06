import { useNavigate } from "react-router-dom";
import loginBackground from "../assets/images/pexels-pixabay-276514.jpg";
import cardImage from "../assets/images/welcomeBack.jpg";
import * as stylex from "@stylexjs/stylex";
import { Formik } from "formik";
import {
  myBlackColors,
  myFontSizes,
  mywhiteColors,
} from "../assets/styles/styles.stylex";
import { login } from "../services/userService";
import { useEffect } from "react";
import { useRoles } from "../context/RoleProvider";

const styles = stylex.create({
  base: () => ({
    backgroundImage: `url(${loginBackground})`,
    //backgroundImage:`url(${myBackgrounds.bgWall1})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100dvh",
  }),
  glassContainer: () => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "rgba(0, 0, 0, 0.2)",
    backdropFilter: "blur(5px)",
    height: "100dvh",
  }),
  mainContainer: () => ({
    minHeight: "70dvh",
    minWidth: "90dvh",
    display: "flex",
  }),
  cardContainer: () => ({
    width: "54dvh",
    height: "70dvh",
    color: "#fff",
    fontSize: myFontSizes.myFontSize4,
    //textAlign: "center",
    background: `url(${cardImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    /* From https://css.glass */
    //background: "rgba(0, 0, 0, 0.2)",
    borderTopLeftRadius: "16px",
    borderBottomLeftRadius: "16px",
    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
    //backdropFilter: "blur(5px)",
    border: "1px solid rgba(0, 0, 0, 0.3)",
  }),
  cardTittleField: () => ({
    height: "40%",
    width: "100%",
    fontSize: myFontSizes.myFontSize1,
    fontWeight: "200",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }),
  cardParagraph: () => ({
    height: "60%",
    padding: "0 1rem 8.5rem 1rem",
    textAlign: "justify",
    display: "flex",
    alignItems: "end",
    fontSize: myFontSizes.myFontSize7,
  }),
  LoginContainer: () => ({
    fontSize: myFontSizes.myFontSize4,
    width: "36dvh",
    height: "70dvh",
    color: myBlackColors.blackColor1,
    display: "flex",
    flexDirection: "column",
    background: "rgba(255, 255, 255, 0.63)",
    borderTopRightRadius: "16px",
    borderBottomRightRadius: "16px",
    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
    backdropFilter: "blur(5px)",
    border: "1px solid rgba(0, 0, 0, 0.3)",
  }),
  tittleField: () => ({
    height: "20%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "500",
  }),
  inputField: () => ({
    height: "60%",
    width: "100%",
    fontSize: myFontSizes.myFontSize5,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",

    //paddingTop: "1rem",

    //padding: "0 1%",
  }),
  field: () => ({
    height: "20%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  }),
  tittleLabel: () => ({
    width: "85%",
  }),
  inputStyle: () => ({
    //color: "inherit",
    color: myBlackColors.blackColor1,
    fontSize: myFontSizes.myFontSize6,
    width: "85%",
    height: "3rem",
    background: mywhiteColors.whiteInput,
    //padding: '0 0.5rem',
    //background: myBlackColors.blackColor2,
    //border: `1px solid ${myBlackColors.blackColor3}`,
    borderRadius: "5px",
    //height: "10%",
    paddingLeft: "0.8rem",
  }),
  revoveryTittle: () => ({
    fontSize: myFontSizes.myFontSize8,
    width: "100%",
    textAlign: "left",
    paddingLeft: "2rem",
  }),
  buttonField: () => ({
    height: "20%",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }),
  buttonStyle: () => ({
    color: mywhiteColors.myWhite,
    width: "85%",
    textAlign: "center",
    borderRadius: "5px",
    border: {
      default: `1px solid ${myBlackColors.blackColor3}`,
      ":hover": `3px solid #38292a`,
    },
    fontSize: myFontSizes.myFontSize6,
    height: "40%",
    background: {
      default: myBlackColors.blackColor3,
      ":hover": "#6b5051",
    },
  }),
});

function LoginPage(props) {
  const navigate = useNavigate();
  // eslint-disable-next-line react/prop-types
  const { setIsAuth } = props;
  const { roles } = useRoles();

  useEffect(() => {
    // loadRoles();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function saveRoleInfo() {
    const userInfo = localStorage.getItem("userInfo");
    const roleId = JSON.parse(userInfo).roleId;
    const role = roles.find((role) => role._id === roleId).roleName;
    localStorage.setItem("role", JSON.stringify(role));
  }

  const findPage = () => {
    if (JSON.parse(localStorage.getItem("role")) === "admin") {
      navigate("/administrador");
    }
  };

  return (
    <div {...stylex.props(styles.base())}>
      <div {...stylex.props(styles.glassContainer())}>
        <div {...stylex.props(styles.mainContainer())}>
          <div {...stylex.props(styles.cardContainer())}>
            <div {...stylex.props(styles.cardTittleField())}>
              <label>PICOT</label>
            </div>
            <div {...stylex.props(styles.cardParagraph())}>
              <p>
                Esta aplicación está diseñada para brindarte una experiencia
                completa y conveniente en la gestión de operaciones turísticas.
              </p>
            </div>
          </div>
          <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={async (values, actions) => {
              try {
                actions.setSubmitting(true);
                const response = await login(values);
                localStorage.setItem("userInfo", JSON.stringify(response));
                localStorage.setItem("isAuth", JSON.stringify(true));
                setIsAuth(true);
                saveRoleInfo();
                findPage();
                setTimeout(() => {}, 500);
              } catch (error) {
                alert(`Error al iniciar sesión ${error}`);
              } finally {
                actions.setSubmitting(false);
              }
            }}
          >
            {({ handleChange, handleSubmit, values, isSubmitting }) => (
              <form
                onSubmit={handleSubmit}
                {...stylex.props(styles.LoginContainer())}
              >
                <label {...stylex.props(styles.tittleField())}>
                  Iniciar Sesión
                </label>
                <div {...stylex.props(styles.inputField())}>
                  <div {...stylex.props(styles.field())}>
                    <label {...stylex.props(styles.tittleLabel())}>
                      Usuario
                    </label>
                    <input
                      type="email"
                      name="email"
                      onChange={handleChange}
                      value={values.email}
                      {...stylex.props(styles.inputStyle())}
                    />
                  </div>
                  <div {...stylex.props(styles.field())}>
                    <label {...stylex.props(styles.tittleLabel())}>
                      Contraseña
                    </label>
                    <input
                      type="password"
                      name="password"
                      onChange={handleChange}
                      value={values.password}
                      {...stylex.props(styles.inputStyle())}
                    />
                  </div>
                  <div {...stylex.props(styles.field())}>
                    <label {...stylex.props(styles.revoveryTittle())}>
                      Recuperar contraseña
                    </label>
                  </div>
                </div>
                <div {...stylex.props(styles.buttonField())}>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    {...stylex.props(styles.buttonStyle())}
                  >
                    {isSubmitting ? "Autenticando" : "Ingresar"}
                  </button>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
export default LoginPage;
