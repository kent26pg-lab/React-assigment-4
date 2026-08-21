import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import styles from "./CategoryBooks.module.css";

function CategoryBooks() {
  const { category } = useParams();

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchBooks() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `https://gutendex.com/books?topic=${category}`
        );

        if (!response.ok) {
          throw new Error("Kunne ikke hente bøker.");
        }

        const data = await response.json();

        setBooks(data.results);
      } catch (error) {
        console.error(error);
        setError("Noe gikk galt. Klarte ikke å hente bøkene.");
      } finally {
        setLoading(false);
      }
    }

    fetchBooks();
  }, [category]);

  if (loading) {
    return (
      <main className={styles.container}>
        <p className={styles.loading}>Laster bøker...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className={styles.container}>
        <p className={styles.error}>{error}</p>
      </main>
    );
  }

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>{category}</h1>

      {books.length === 0 ? (
        <p className={styles.empty}>
          Ingen bøker funnet i denne kategorien.
        </p>
      ) : (
        <div className={styles.books}>
          {books.map((book) => (
            <Link
              key={book.id}
              to={`/books/${book.id}`}
              className={styles.book}
            >
              {book.formats["image/jpeg"] ? (
                <img
                  src={book.formats["image/jpeg"]}
                  alt={book.title}
                  className={styles.cover}
                />
              ) : (
                <div className={styles.noCover}>
                  No cover
                </div>
              )}

              <h2 className={styles.bookTitle}>{book.title}</h2>

              <p className={styles.author}>
                {book.authors.length > 0
                  ? book.authors[0].name
                  : "Ukjent forfatter"}
              </p>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}

export default CategoryBooks;