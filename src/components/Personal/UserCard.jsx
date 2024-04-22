/* eslint-disable react/prop-types */
import * as stylex from "@stylexjs/stylex";
import { myFontSizes, mywhiteColors } from "../../assets/styles/styles.stylex";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import DeleteCard from "./DeleteCard";

Modal.setAppElement("#root");

const styles = stylex.create({
  base: () => ({
    color: mywhiteColors.antiflesh,
    display: "flex",
    // flexDirection: 'column',
    width: "100%",
    height: "4rem",
    position: "relative",
  }),
  generalInfoField: () => ({
    flexDirection: "row",
    flexGrow: "1",
  }),
  menuIcon: () => ({
    top: 0,
    right: 0,
    position: "absolute",
    height: "100%",
    width: "3rem",
    fontSize: myFontSizes.myFontSize3,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }),
  menuField: () => ({
    display: "flex",
    flexDirection: "column",
    zIndex: "999",
  }),
  userInfoField: () => ({
    height: "10rem",
  }),
  modalContainer: () => ({
    height: "40dvh",
    width: "40dvh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }),
});

const modalStyles = {
  content: {
    height: "40rem",
    width: "40rem",
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translateY(-50%) translateX(-50%)',
  },
};

function UserCard(props) {
  const navigate = useNavigate();
  const { user, handleSelectedUser, deleteUser } = props;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  // const [showUserInfo, setShowInfo] = useState(false);

  const handleModal = () => {
    setModalIsOpen(!modalIsOpen);
  };
  //modifica es estado para ver o no el menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  //atrapa la opcion a realizar  del menu y llama al callback correspondiente
  const handleMenuItemClick = (option) => {
    console.log("option::: ", option);
    if (option === "viewUser") {
      // toggleUserInfo();
      handleSelectedUser(user._id);
    }
    if (option === "EditUser") {
      navigate("editar/" + user._id);
    }
    if (option === "removeUser") {
      deleteUser(user._id);
    }
    toggleMenu();
  };

  // const toggleUserInfo = () => {
  //   setShowInfo(!showUserInfo);
  // };

  return (
    <div {...stylex.props(styles.base())}>
      <div {...stylex.props(styles.generalInfoField())}>
        <label htmlFor="username">Nombre:</label>
        <p>{user.firstName}</p>
      </div>
      <button {...stylex.props(styles.menuIcon())} onClick={toggleMenu}>
        ⋮
      </button>
      {isMenuOpen && (
        <div {...stylex.props(styles.menuField())} onMouseLeave={toggleMenu}>
          <button onClick={() => handleMenuItemClick("viewUser")}>
            Informacion completa
          </button>
          <button onClick={() => handleMenuItemClick("EditUser")}>
            Editar Informacion
          </button>
          {/* <button onClick={() => handleMenuItemClick("removeUser")}>
            Eliminar Usuario
          </button> */}
          <button onClick={() => handleModal()}>Eliminar Usuario</button>
        </div>
      )}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleModal}
        contentLabel="card de eliminacion"
        style={modalStyles}
      >
        <DeleteCard handleModal={handleModal} userId={user._id} />
      </Modal>
      {/* {showUserInfo && (
        <UserInformation/>
      )} */}
    </div>
  );
}
export default UserCard;
