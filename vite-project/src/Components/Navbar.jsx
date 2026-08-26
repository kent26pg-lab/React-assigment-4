import {
  Link,
  NavLink,
  useLocation,
} from "react-router-dom";

import styles from "./NavBar.module.css";

function Navbar() {
  const location = useLocation();

  const showCategories =
    location.pathname === "/books" ||
    location.pathname.startsWith("/categories/");

  const categories = [
    "Fiction",
    "Mystery",
    "Thriller",
    "Romance",
    "Fantasy",
    "Morality",
    "Society",
    "Power",
    "Justice",
    "Adventure",
    "Tragedy",
    "War",
    "Philosophy",
  ];

  return (
    <header className={styles.navbar}>
      <nav className={styles.nav}>
        <div className={styles.links}>
          <Link
            to="/"
            className={`${styles.link} ${
              location.pathname === "/"
                ? styles.active
                : ""
            }`}
          >
            Home
          </Link>

          <Link
            to="/books"
            className={`${styles.link} ${
              location.pathname === "/books"
                ? styles.active
                : ""
            }`}
          >
            Books
          </Link>

          <Link
            to="/favorites"
            className={`${styles.link} ${
              location.pathname === "/favorites"
                ? styles.active
                : ""
            }`}
          >
            Favorites
          </Link>
        </div>

        {showCategories && (
          <div className={styles.categorySection}>
            <h2 className={styles.categoryTitle}>
              Categories
            </h2>

            <div className={styles.categories}>
              {categories.map((category) => (
                <NavLink
                  key={category}
                  to={`/categories/${category}`}
                  className={({ isActive }) =>
                    `${styles.category} ${
                      isActive
                        ? styles.activeCategory
                        : ""
                    }`
                  }
                >
                  {category}
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Navbar;