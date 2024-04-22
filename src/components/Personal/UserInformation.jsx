/* eslint-disable react/prop-types */

function UserInformation({ user, handleSelectedUser }) {
  // console.log('user::: ', user);

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