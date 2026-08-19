import { useEffect, useState } from "react";

import BookCard from "../Components/BookCard.jsx";
import styles from "./Books.module.css";

function Books() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [nextPage, setNextPage] = useState(null);
  const [previousPage, setPreviousPage] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function fetchBooks(url) {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(
          `HTTP error! status: ${response.status}`
        );
      }

      const data = await response.json();

      setBooks(data.results);
      setNextPage(data.next);
      setPreviousPage(data.previous);
    } catch (error) {
      console.error("Fetch error:", error);
      setError("Kunne ikke hente bøkene.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchBooks("https://gutendex.com/books");
  }, []);

  async function handleSearch(event) {
    event.preventDefault();

    const url = `https://gutendex.com/books?search=${encodeURIComponent(
      search
    )}`;

    fetchBooks(url);
  }

  function handleNextPage() {
    if (nextPage) {
      fetchBooks(nextPage);
    }
  }

  function handlePreviousPage() {
    if (previousPage) {
      fetchBooks(previousPage);
    }
  }

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Books</h1>

      <form
        className={styles.searchForm}
        onSubmit={handleSearch}
      >
        <input
          className={styles.searchInput}
          type="text"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Søk etter bok..."
        />

        <button
          className={styles.searchButton}
          type="submit"
        >
          Søk
        </button>
      </form>

      {loading && (
        <p className={styles.loading}>Loading...</p>
      )}

      {error && (
        <p className={styles.error}>{error}</p>
      )}

      {!loading && !error && (
        <>
          <div className={styles.books}>
            {books.map((book) => (
              <BookCard
                key={book.id}
                book={book}
              />
            ))}
          </div>

          <div className={styles.pagination}>
            <button
              className={styles.pageButton}
              onClick={handlePreviousPage}
              disabled={!previousPage}
            >
              ← Forrige
            </button>

            <button
              className={styles.pageButton}
              onClick={handleNextPage}
              disabled={!nextPage}
            >
              Neste →
            </button>
          </div>
        </>
      )}
    </main>
  );
}

export default Books;