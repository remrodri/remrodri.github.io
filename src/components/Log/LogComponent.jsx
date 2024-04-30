import * as stylex from "@stylexjs/stylex";
import { useEffect, useState } from "react";
import FilterDate from "./FilterDate";
import { useLogs } from "../../context/log/LogProvider";
import { useUsers } from "../../context/user/UserProvider";
import FilterName from "./FilterName";
import FilterRole from "./FilterRole";
import { useRoles } from "../../context/RoleProvider";

const styles = stylex.create({
  base: () => ({
    height: "100%",
  }),
  FiltersContainer: () => ({
    height: "10rem",
    display: "flex",
  }),
  CardsContainer: () => ({
    height: "calc(100% - 10rem)",
    overflowY: "auto",
  }),
});
function LogComponent() {
  const { roles } = useRoles();
  const { logs } = useLogs();
  const { users, loadUsers } = useUsers();
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [userSelected, setUserSelected] = useState(null);
  const [roleSelected, setRoleSelected] = useState(null);

  const handleFilterChange = (startDate, endDate) => {
    console.log("startDate, endDate::: ", startDate, endDate);
    console.log("logs::: ", logs);
    console.log("userSelected::: ", userSelected);
    console.log("roleSelected::: ", roleSelected);
    // const start = moment(startDate)
    //   .set({ hour: 0, minute: 0, second: 0 })
    //   .format("llll");
    // start.set({hour:0, minute:0, second:0});
    // const end = moment(endDate)
    //   .set({ hour: 23, minute: 59, second: 59 })
    //   .format("llll");
    // end.set({hour:23, minute:59, second:59});
    const [sYear, sMonth, sDay] = startDate.split("-");
    const start = new Date(sYear, sMonth - 1, sDay, 0, 0, 0, 0);
    // start.setHours(0, 0, 0, 0);
    const [eYear, eMonth, eDay] = endDate.split("-");
    const end = new Date(eYear, eMonth - 1, eDay, 23, 59, 59, 999);
    // console.log("end::: ", end);
    // end.setHours(23, 59, 59, 999);
    console.log("start::: ", start);
    console.log("end::: ", end);
    const filteredLogs = logs.filter((log) => {
      const logDate = new Date(log.createAt);
      const isInTimeRange = logDate >= start && logDate <= end;
      const logUser = users.find((user) => user._id === log.userId);
      const userRole = roles.find((role) => role._id === logUser.roleId);
      console.log("logUser::: ", logUser);
      if (userSelected && !roleSelected) {
        return isInTimeRange && userSelected._id === log.userId;
      }
      if (!userSelected && roleSelected) {
        // const user = users.find((user) => user._id === log.userId);
        return isInTimeRange && userRole;
      }
      if (userSelected && roleSelected) { 
        return isInTimeRange && userRole && logUser
      }
      return isInTimeRange;
    });
    const filteredLogsWithName = filteredLogs.map(log => {
      const user = users.find(user => user._id === log.userId)
      return {...log, userName:`${user.firstName} ${user.lastName}`}
    })
    console.log('filteredLogsWithName::: ', filteredLogsWithName);
    // console.log("filteredLogs::: ", filteredLogs);
    setFilteredLogs(filteredLogsWithName);
  };

  const filterLogsByCurrentDate = () => {
    const currentDate = new Date().toISOString().slice(0, 10);

    console.log("logs::: ", logs);
    console.log("users::: ", users);
    const filtered = logs
      .filter((log) => log.createAt.slice(0, 10) === currentDate)
      .map((log) => {
        const user = users.find((user) => user._id === log.userId);
        // console.log('user::: ', user);
        return {
          ...log,
          userName: user ? `${user.firstName} ${user.lastName}` : "sin nombre",
        };
      });
    console.log(filteredLogs);
    setFilteredLogs(filtered);
  };

  useEffect(() => {
    filterLogsByCurrentDate();
    loadUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [logs]);

  return (
    <div {...stylex.props(styles.base())}>
      <div {...stylex.props(styles.FiltersContainer())}>
        <FilterDate handleFilterChange={handleFilterChange} />
        <FilterName users={users} setUserSelected={setUserSelected} />
        <FilterRole roles={roles} setRoleSelected={setRoleSelected} />
      </div>
      <div {...stylex.props(styles.CardsContainer())}>
        espacio de cards
        {filteredLogs.map((log) => (
          <div key={log._id}>
            <p>nombre:{log.userName}</p>
            <p>actividad:{log.eventType}</p>
            <p>fecha:{log.createAt.slice(0, 10)}</p>
            <p>
              hora:{new Date(log.createAt).getHours()}{" "}
              {new Date(log.createAt).getMinutes()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
export default LogComponent;
