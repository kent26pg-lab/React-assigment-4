import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import styles from "./CategoryBooks.module.css";

function CategoryBooks() {
  const { category } = useParams();

  const [books, setBooks] = useState([]);
  const [nextPage, setNextPage] = useState(null);
  const [previousPage, setPreviousPage] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [pageUrl, setPageUrl] = useState(
    `https://gutendex.com/books?topic=${category}`
  );

  useEffect(() => {
    async function fetchBooks() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(pageUrl);

        if (!response.ok) {
          throw new Error("Kunne ikke hente bøker.");
        }

        const data = await response.json();

        setBooks(data.results);
        setNextPage(data.next);
        setPreviousPage(data.previous);
      } catch (error) {
        console.error(error);
        setError("Noe gikk galt. Klarte ikke å hente bøkene.");
      } finally {
        setLoading(false);
      }
    }

    fetchBooks();
  }, [pageUrl]);

  useEffect(() => {
    setPageUrl(`https://gutendex.com/books?topic=${category}`);
  }, [category]);

  function handleNextPage() {
    if (nextPage) {
      setPageUrl(nextPage);
    }
  }

  function handlePreviousPage() {
    if (previousPage) {
      setPageUrl(previousPage);
    }
  }

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
        <>
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

                <h2 className={styles.bookTitle}>
                  {book.title}
                </h2>

                <p className={styles.author}>
                  {book.authors.length > 0
                    ? book.authors[0].name
                    : "Ukjent forfatter"}
                </p>
              </Link>
            ))}
          </div>

          <div className={styles.pagination}>
            <button
              className={styles.paginationButton}
              onClick={handlePreviousPage}
              disabled={!previousPage}
            >
              ← Previous
            </button>

            <button
              className={styles.paginationButton}
              onClick={handleNextPage}
              disabled={!nextPage}
            >
              Next →
            </button>
          </div>
        </>
      )}
    </main>
  );
}

export default CategoryBooks;