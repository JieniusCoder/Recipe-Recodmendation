import { NavLink } from "react-router-dom";
import styles from "./style.module.css";

export function NavBar() {
  return (
    <nav className={styles.navbar}>
      <NavLink className={styles.navlink} to="/home">
        Home
      </NavLink>
      <NavLink className={styles.navlink} to="/about">About</NavLink>
      <NavLink className={styles.navlink} to="/contact">Upload</NavLink>
      <NavLink className={styles.navlink} to="/contact">Reports</NavLink>
      <NavLink className={styles.navlink} to="/contact">Contact</NavLink>
    </nav>
  );
}

export default NavBar;