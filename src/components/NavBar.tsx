import { NavLink } from "react-router-dom";
import styles from "./style.module.css";
import Home from "./Screens/Home";
import About from "./Screens/About";
import Upload from "./Screens/Upload";
import Reports from "./Screens/Reports";
import Contact from "./Screens/Contact";

export function NavBar() {
  return (
    <nav className={styles.navbar}>
      <NavLink className={styles.navlink} to="/about">About</NavLink>
      <NavLink className={styles.navlink} to="/contact">Upload</NavLink>
      <NavLink className={styles.navlink} to="/contact">Reports</NavLink>
      <NavLink className={styles.navlink} to="/contact">Contact</NavLink>
    </nav>
  );
}

export default NavBar;