import { Navigate, Route, Routes } from "react-router-dom";

const PrivateRoute = ({ element: Element, isAuth, ...rest }) => {
  return (
    <Routes>
      <Route {...rest} element={isAuth ? <Element /> : <Navigate to="/" />} />
    </Routes>
  );
};
export default PrivateRoute;
