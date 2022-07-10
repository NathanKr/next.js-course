import styles from '../../styles/NavBar.module.css'
import NavBarColorTabs from "./NavBarColorTabs";

const NavBar = () => {
  return (
    <div className={styles.NavBar}>
      <h1>SPWS</h1>
      <NavBarColorTabs/>
      
    </div>
  );
};

export default NavBar;
