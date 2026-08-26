import { Link, useLocation } from "react-router-dom";

import styles from "./NavBar.module.css";

function Navbar() {
  const location = useLocation();

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

  const isBooksActive =
    location.pathname === "/books" ||
    location.pathname.startsWith("/books/") ||
    location.pathname.startsWith("/categories/");

  const isCategoryPage =
    location.pathname.startsWith("/categories/");

  const currentCategory = isCategoryPage
    ? decodeURIComponent(location.pathname.split("/")[2])
    : null;

  const showCategories =
    location.pathname === "/books" ||
    location.pathname.startsWith("/categories/");

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
              isBooksActive ? styles.active : ""
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
              {categories.map((category) => {
                const isActive =
                  currentCategory === category;

                return (
                  <Link
                    key={category}
                    to={`/categories/${category}`}
                    className={`${styles.category} ${
                      isActive
                        ? styles.categoryActive
                        : ""
                    }`}
                  >
                    {category}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Navbar;