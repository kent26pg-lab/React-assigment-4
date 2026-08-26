import { useEffect, useState } from "react";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";

import styles from "./CategoryBooks.module.css";

function CategoryBooks() {
  const { category } = useParams();

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;

  const [books, setBooks] = useState([]);
  const [nextPage, setNextPage] = useState(null);
  const [previousPage, setPreviousPage] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchBooks() {
      try {
        setLoading(true);
        setError("");

        const url =
          page === 1
            ? `https://gutendex.com/books?topic=${encodeURIComponent(category)}`
            : `https://gutendex.com/books?topic=${encodeURIComponent(
                category,
              )}&page=${page}`;

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Couldnt fetch books.");
        }

        const data = await response.json();

        setBooks(data.results);
        setNextPage(data.next);
        setPreviousPage(data.previous);
      } catch (error) {
        console.error(error);
        setError("Something went wrong. Could fetch books.");
      } finally {
        setLoading(false);
      }
    }

    fetchBooks();
  }, [category, page]);

  function getPageNumber(url) {
    if (!url) {
      return null;
    }

    const urlObject = new URL(url);

    return Number(urlObject.searchParams.get("page"));
  }

  function handleNextPage() {
    const nextPageNumber = getPageNumber(nextPage);

    if (!nextPageNumber) {
      return;
    }

    navigate(
      `/categories/${encodeURIComponent(category)}?page=${nextPageNumber}`,
    );
  }

  function handlePreviousPage() {
    const previousPageNumber = getPageNumber(previousPage);

    if (!previousPageNumber || previousPageNumber === 1) {
      navigate(`/categories/${encodeURIComponent(category)}`);

      return;
    }

    navigate(
      `/categories/${encodeURIComponent(category)}?page=${previousPageNumber}`,
    );
  }

  function handleBack() {
    navigate("/books");
  }

  if (loading) {
    return (
      <main className={styles.container}>
        <p className={styles.loading}>Loading books...</p>
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
      <button
        onClick={handleBack}
        className={styles.backButton}
      >
        ← Back to books
      </button>

      {books.length === 0 ? (
        <p className={styles.empty}>
          No books found in this category.
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
              </Link>
            ))}
          </div>

          <div className={styles.pagination}>
            <button
              className={styles.pageButton}
              onClick={handlePreviousPage}
              disabled={!previousPage}
            >
              ← Previous
            </button>

            <span className={styles.pageNumber}>
              Page {page}
            </span>

            <button
              className={styles.pageButton}
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