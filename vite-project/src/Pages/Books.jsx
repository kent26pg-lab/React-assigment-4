import { useEffect, useState } from "react";

import BookCard from "../Components/BookCard.jsx";
import styles from "./Books.module.css";

function Books() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchBooks() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "https://gutendex.com/books"
        );

        if (!response.ok) {
          throw new Error(
            `HTTP error! status: ${response.status}`
          );
        }

        const data = await response.json();

        setBooks(data.results);
      } catch (error) {
        console.error("Fetch error:", error);
        setError("Kunne ikke hente bøkene.");
      } finally {
        setLoading(false);
      }
    }

    fetchBooks();
  }, []);

  async function handleSearch(event) {
    event.preventDefault();

    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `https://gutendex.com/books?search=${encodeURIComponent(search)}`
      );

      if (!response.ok) {
        throw new Error(
          `HTTP error! status: ${response.status}`
        );
      }

      const data = await response.json();

      setBooks(data.results);
    } catch (error) {
      console.error("Search error:", error);
      setError("Kunne ikke søke etter bøker.");
    } finally {
      setLoading(false);
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
        <div className={styles.books}>
          {books.map((book) => (
            <BookCard
              key={book.id}
              book={book}
            />
          ))}
        </div>
      )}
    </main>
  );
}

export default Books;