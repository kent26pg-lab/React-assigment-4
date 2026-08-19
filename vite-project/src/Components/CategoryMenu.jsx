import { Link } from "react-router-dom";

import styles from "./CategoryMenu.module.css";

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

function CategoryMenu() {
  return (
    <div className={styles.menu}>
      <div className={styles.categories}>
        {categories.map((category) => (
          <Link
            key={category}
            className={styles.link}
            to={`/categories/${category}`}
          >
            {category}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default CategoryMenu;