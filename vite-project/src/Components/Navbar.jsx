import { useState } from "react";
import { Link } from "react-router-dom";

import CategoryMenu from "./CategoryMenu.jsx";
import styles from "./Navbar.module.css";

function Navbar() {
  const [showCategories, setShowCategories] = useState(false);

  function toggleCategories() {
    setShowCategories((current) => !current);
  }

  return (
    <nav className={styles.navbar}>
      <div className={styles.mainNav}>
        <Link className={styles.logo} to="/">
          Gutendex project
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
      </div>

      <div className={styles.categoryBar}>
        <button
          className={styles.categoryButton}
          onClick={toggleCategories}
        >
          Categories
          <span className={styles.arrow}>
            {showCategories ? "▴" : "▾"}
          </span>
        </button>
      </div>

      {showCategories && <CategoryMenu />}
    </nav>
  );
}

export default Navbar;