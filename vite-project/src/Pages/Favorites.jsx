import { Link } from "react-router-dom";
import { useFavorites } from "../Context/FavoriteContext.jsx";

import styles from "./Favorites.module.css";

function Favorites() {
  const { favorites, removeFavorite } = useFavorites();

  return (
    <main className={styles.container}>
      {favorites.length === 0 ? (
        <p className={styles.empty}>You dont have any favorites yet.</p>
      ) : (
        <div className={styles.books}>
          {favorites.map((book) => (
            <article key={book.id} className={styles.card}>
              <Link to={`/books/${book.id}`} className={styles.link}>
                <img
                  src={book.formats?.["image/jpeg"]}
                  alt={book.title}
                  className={styles.cover}
                />

                <h2 className={styles.bookTitle}>{book.title}</h2>
              </Link>

              <button
                className={styles.removeButton}
                onClick={() => removeFavorite(book.id)}
              >
                Fjern
              </button>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}

export default Favorites;
