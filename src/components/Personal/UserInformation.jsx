// eslint-disable-next-line react/prop-types
function UserInformation({ user, handleSelectedUser }) {
  return (
    <div>
      TODA LA INFORMACION DEL USUARIO
      <label htmlFor="lastName">Apellidos</label>
      
      <p>{user.lastName}</p>
      <button onClick={() => handleSelectedUser(null)}>cerrar</button>
    </div>
  );
}
export default UserInformation;