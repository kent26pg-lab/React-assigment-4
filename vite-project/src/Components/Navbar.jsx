import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import styles from "./NavBar.module.css";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);
  const currentSearch = searchParams.get("search") || "";

  const [search, setSearch] = useState(currentSearch);

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

  function handleSearch(event) {
    event.preventDefault();

    const trimmedSearch = search.trim();

    if (!trimmedSearch) {
      navigate("/books");
      return;
    }

    navigate(
      `/books?search=${encodeURIComponent(trimmedSearch)}`
    );
  }

  return (
    <header className={styles.navbar}>
      <nav className={styles.nav}>

        {/* HOVEDMENY + SEARCH */}
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

          {/* SEARCH */}
          <form
            className={styles.searchForm}
            onSubmit={handleSearch}
          >
            <input
              className={styles.searchInput}
              type="text"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search for book..."
            />

            <button
              className={styles.searchButton}
              type="submit"
            >
              Search
            </button>
          </form>
        </div>

        {/* CATEGORIES - EGEN REKKE */}
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