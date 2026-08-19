import { Link } from "react-router-dom";

import styles from "./Navbar.module.css";

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <Link className={styles.logo} to="/">
        Gutendex
      </Link>

      <div className={styles.links}>
        <Link className={styles.link} to="/">
          Home
        </Link>

        <Link className={styles.link} to="/books">
          Books
        </Link>

        <Link className={styles.link} to="/favorites">
          Favorites
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;