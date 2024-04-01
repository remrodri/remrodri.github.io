
import { useNavigate } from "react-router-dom";
import { useRoles } from "../context/useRoles";

function LoginPage(props) {
  
  const navigate = useNavigate();
  const { setIsAuth } = props;
  const { roles } = useRoles;

  const onLogin = () => {

    const userInfo = localStorage.getItem("userInfo");
    const roleId = JSON.parse(userInfo).roleId;
    return roles.find((role) => role._id === roleId);
  };
  return (
    <div>
      LOGIN PAGE
      <button onClick={() => navigate("/administrador")}>ir a admin</button>
    </div>
  );
  
}
export default LoginPage;
