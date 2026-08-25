import { Link } from "react-router-dom";
import { useFavorites } from "../Context/FavoriteContext.jsx";

import styles from "./Favorites.module.css";

function Favorites() {
  const { favorites, removeFavorite } = useFavorites();

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Favoritter</h1>

      {favorites.length === 0 ? (
        <p className={styles.empty}>
          Du har ingen favoritter enda.
        </p>
      ) : (
        <div className={styles.books}>
          {favorites.map((book) => {
            const cover = book.formats["image/jpeg"];

            return (
              <div key={book.id} className={styles.book}>
                <Link
                  to={`/books/${book.id}`}
                  className={styles.bookLink}
                >
                  {cover ? (
                    <img
                      src={cover}
                      alt={book.title}
                      className={styles.cover}
                    />
                  ) : (
                    <div className={styles.noCover}>
                      No cover
                    </div>
                  )}

                  <h2 className={styles.bookTitle}>
                    {book.title}
                  </h2>
                </Link>

                <button
                  className={styles.removeButton}
                  onClick={() => removeFavorite(book.id)}
                >
                  Fjern fra Favoritter
                </button>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}

export default Favorites;