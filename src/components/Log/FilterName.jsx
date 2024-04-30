import * as stylex from '@stylexjs/stylex';

const styles = stylex.create({
  base: () => ({
    display: 'flex',
    flexDirection: 'column',
  })
})

// eslint-disable-next-line react/prop-types
const FilterName = ({ users, setUserSelected }) => {
  
  const handleSelectUser = (event) => {
    const selectedUserId = event.target.value;
    console.log('selectedUserId::: ', selectedUserId);
    // eslint-disable-next-line react/prop-types
    const selectedUser = users.find((user) => `${user.firstName} ${user.lastName}` === selectedUserId);
    if (selectedUser) {
      //onSelectUser(selectedUser);
      setUserSelected(selectedUser);
    }
  };
  return (
    <div {...stylex.props(styles.base())}>
      <label htmlFor="userInput">Selecciona un usario</label>
      <input
        list="userList"
        name="userInput"
        onChange={handleSelectUser}
        autoComplete="off"
      />
      <datalist id="userList">
        
        {
          // eslint-disable-next-line react/prop-types
          users.map(user => (
          <option key={user._id} >{user.firstName} {user.lastName}</option>
        ))}
        </datalist>
    </div>
  );
};
export default FilterName;
