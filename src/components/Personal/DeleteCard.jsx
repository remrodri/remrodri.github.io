import * as stylex from '@stylexjs/stylex';
import { useUsers } from '../../context/user/UserProvider';

const styles = stylex.create({
  base: () => ({
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  })
})
// eslint-disable-next-line react/prop-types
function DeleteCard({ handleModal, userId}) {
    const {deleteUser}=useUsers()
  return (
    <div {...stylex.props(styles.base())}>
      <label htmlFor="">Confirmar Eliminacion</label>
      <button onClick={() => handleModal()}>cancelar</button>
      <button onClick={() => deleteUser(userId)}>eliminar</button>
    </div>
  );
}
export default DeleteCard; 