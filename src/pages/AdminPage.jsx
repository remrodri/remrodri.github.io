import backgroundImage from "../assets/images/pexels-quark-studio-2507010.jpg";
import * as stylex from "@stylexjs/stylex";
import MenuComponent from "../components/MenuComponent";
import PersonalComponent from "../components/PersonalComponent";


const styles = stylex.create({
  base: () => ({
    height: "100dvh",
    backgroundImage: `url("${backgroundImage}")`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0.6%",
    gap:'0.6%',
  }),
  
  menuContainer: () => ({
    height: '100%',
    //width:'12%',
  }),
  componentContainer: () => ({
    height: '100%',
    width: '100%',
  })
});

function AdminPage() {
  return (
    <div {...stylex.props(styles.base())}>
        <div {...stylex.props(styles.menuContainer())}>
          <MenuComponent/>
        </div>
        <div {...stylex.props(styles.componentContainer())}>
          <PersonalComponent/>
        </div>
      
    </div>
  );
}
export default AdminPage;
