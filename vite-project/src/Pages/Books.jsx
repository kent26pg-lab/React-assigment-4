import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import BookCard from "../Components/BookCard.jsx";
import styles from "./Books.module.css";

function Books() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const searchParam = searchParams.get("search") || "";
  const pageParam = searchParams.get("page") || "1";

  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState(searchParam);

  const [nextPage, setNextPage] = useState(null);
  const [previousPage, setPreviousPage] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setSearch(searchParam);
  }, [searchParam]);

  useEffect(() => {
    async function loadBooks() {
      try {
        setLoading(true);
        setError("");

        const params = new URLSearchParams();

        if (searchParam) {
          params.set("search", searchParam);
        }

        if (pageParam !== "1") {
          params.set("page", pageParam);
        }

        const query = params.toString();

        const url = query
          ? `https://gutendex.com/books/?${query}`
          : "https://gutendex.com/books/";

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        setBooks(data.results);
        setNextPage(data.next);
        setPreviousPage(data.previous);
      } catch (error) {
        console.error("Fetch error:", error);

        setError("couldnt fetch the books.");
        setBooks([]);
        setNextPage(null);
        setPreviousPage(null);
      } finally {
        setLoading(false);
      }
    }

    loadBooks();
  }, [searchParam, pageParam]);

  function getPageNumber(url) {
    if (!url) {
      return null;
    }

    try {
      const urlObject = new URL(url);

      return urlObject.searchParams.get("page");
    } catch (error) {
      console.error("Kunne ikke lese side fra URL:", error);
      return null;
    }
  }

  function handleSearch(event) {
    event.preventDefault();

    const trimmedSearch = search.trim();

    if (!trimmedSearch) {
      navigate("/books");
      return;
    }

    navigate(`/books?search=${encodeURIComponent(trimmedSearch)}`);
  }

  function handleNextPage() {
    const nextPageNumber = getPageNumber(nextPage);

    if (!nextPageNumber) {
      return;
    }

    if (searchParam) {
      navigate(
        `/books?search=${encodeURIComponent(
          searchParam,
        )}&page=${nextPageNumber}`,
      );
    } else {
      navigate(`/books?page=${nextPageNumber}`);
    }
  }

  function handlePreviousPage() {
    const previousPageNumber = getPageNumber(previousPage);

    if (!previousPageNumber) {
      if (searchParam) {
        navigate(`/books?search=${encodeURIComponent(searchParam)}`);
      } else {
        navigate("/books");
      }

      return;
    }

    if (searchParam) {
      navigate(
        `/books?search=${encodeURIComponent(
          searchParam,
        )}&page=${previousPageNumber}`,
      );
    } else {
      navigate(`/books?page=${previousPageNumber}`);
    }
  }

  return (
    <main className={styles.container}>
      <form className={styles.searchForm} onSubmit={handleSearch}>
        <input
          className={styles.searchInput}
          type="text"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Søk etter bok..."
        />

        <button className={styles.searchButton} type="submit">
          Søk
        </button>
      </form>

      {loading && <p className={styles.loading}>Loading books...</p>}

      {error && <p className={styles.error}>{error}</p>}

      {!loading && !error && books.length === 0 && (
        <p className={styles.empty}>No books found.</p>
      )}

      {!loading && !error && books.length > 0 && (
        <>
          <div className={styles.books}>
            {books.map((book) => (
              <BookCard key={book.id} book={book} />
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

            <span>Side {pageParam}</span>

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

export default Books;
