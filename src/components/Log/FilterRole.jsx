import * as stylex from "@stylexjs/stylex";

const styles = stylex.create({
  base: () => ({
    display: "flex",
    flexDirection: "column"
  }),
});
// eslint-disable-next-line react/prop-types
function FilterRole({ roles, setRoleSelected }) {
  const handleSelectRole = (event) => {
    const selectedRoleName = event.target.value;
    // eslint-disable-next-line react/prop-types
    const selectedRole = roles.find((role) => role.roleName === selectedRoleName);
    console.log('selectedRole::: ', selectedRole);
    if (selectedRole) {
      setRoleSelected(selectedRole);
    }

    console.log('selectedRoleName::: ', selectedRoleName);
  };

  return <div {...stylex.props(styles.base())}>
    <label htmlFor="role">Filtro por Rol</label>
    <input
      list='roleList'
      name='roleInput'
      onChange={handleSelectRole}
    />
    <datalist
      id="roleList">
      {
        // eslint-disable-next-line react/prop-types
        roles.map((role) => (
        <option key={role._id}>{role.roleName}</option>
      ))}
    </datalist>
    
  </div>;
}
export default FilterRole;
