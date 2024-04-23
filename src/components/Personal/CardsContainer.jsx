import * as stylex from "@stylexjs/stylex";
import { useUsers } from "../../context/user/UserProvider";
import { useEffect, useState } from "react";
import { useRoles } from "../../context/RoleProvider";
import { myFontSizes, mywhiteColors } from "../../assets/styles/styles.stylex";
import UserCard from "./UserCard";
import UserInformation from "./UserInformation";

const styles = stylex.create({
  base: () => ({
    width: "100%",
    height: "100%",
    background: {
      default: "rgba(255, 255, 255, 0.2)",
    },
    borderBottomRightRadius: "10px",
    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
    // backdropFilter: "blur(5px)",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    display: "flex",
    flexDirection: "column",
    alignSelf: "auto",
  }),
  filterField: () => ({
    height: "6rem",
    padding: "1rem",
    display: "flex",
    flexDirection: "column",
  }),
  labelFilterField: () => ({
    fontSize: myFontSizes.myFontSize7,
    color: mywhiteColors.antiflesh,
  }),
  selectFilterStyle: () => ({
    width: "15rem",
  }),
  cardsField: () => ({
    // height: "calc(100% - 6rem)",
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    // height:'100%'
    overflowY:'auto',
  }),
});

//componente de renderizado de Cards de usuarios
function CardsContainer() {
  const { users,deleteUser } = useUsers();
  const { roles } = useRoles();
  const [usersFiltered, setUsersFiltered] = useState([]);
  const [selectedUser,setSelectedUser]=useState(null)
  

  const handleSelectedUser = (userId) => { 
    setSelectedUser(userId)
  }
  useEffect(() => {
    handleSelectChange();
    setUsersFiltered(users);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users]);

  function handleSelectChange() {
    const roles = document.getElementById("selectOption");
    const selectedRole = roles.options[roles.selectedIndex].value;
    // console.log("selectedRole::: ", selectedRole);

    usersFilter(selectedRole);
  }
  //se recibe un rol para filtrar  la lista de usuarios
  function usersFilter(selectedRole) {
    if (selectedRole === "all") {
      // console.log("users::: ", users);
      setUsersFiltered(users);
      // console.log("usersFiltered::: ", usersFiltered);
    } else {
      setUsersFiltered(users.filter((user) => user.roleId === selectedRole));
    }
  }
  
  function translateRole(role) { 
      if (role.roleName === 'admin')
        return 'Administrador'
      if (role.roleName === 'tourGuide')
        return 'Guia'
      if (role.roleName === 'salesOperator')
        return 'Operador'
  }

  function sendUsers() {
    return usersFiltered.map((user) => (
      <div key={user._id}>
        <UserCard
          // key={user._id}
          user={user}
          handleSelectedUser={handleSelectedUser}
          deleteUser={deleteUser}
        />
        {selectedUser === user._id && (
          <UserInformation
            // key={user._id}
            user={user}
            handleSelectedUser={handleSelectedUser}
          />
        )}
      </div>
    ));
  }
  // console.log(translateRoles())
  // console.log("selectedUser::: ", selectedUser);
  // console.log('rolesToSpanish::: ', rolesToSpanish);
  return (
    <div {...stylex.props(styles.base())}>
      <div {...stylex.props(styles.filterField())}>
        <label {...stylex.props(styles.labelFilterField())} htmlFor="title">
          Filtrar por rol
        </label>
        <select
          name=""
          id="selectOption"
          defaultValue={"all"}
          onChange={() => handleSelectChange()}
          {...stylex.props(styles.selectFilterStyle())}
        >
          <option value="all">Todos</option>
          {roles &&
            roles.map((role) => (
              <option key={role._id} value={role._id}>
                {translateRole(role)}
              </option>
            ))}
        </select>
      </div>
      <div {...stylex.props(styles.cardsField())}>{sendUsers()}</div>
    </div>
  );
}
export default CardsContainer;
