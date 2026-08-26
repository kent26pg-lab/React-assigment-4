import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import BookCard from "../Components/BookCard.jsx";
import styles from "./Books.module.css";

function Books() {
  const [searchParams] = useSearchParams();

  const searchParam = searchParams.get("search") || "";
  const pageParam = searchParams.get("page") || "1";

  const [books, setBooks] = useState([]);
  const [nextPage, setNextPage] = useState(null);
  const [previousPage, setPreviousPage] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
          throw new Error(
            `HTTP error! status: ${response.status}`,
          );
        }

        const data = await response.json();

        setBooks(data.results);
        setNextPage(data.next);
        setPreviousPage(data.previous);
      } catch (error) {
        console.error("Fetch error:", error);

        setError("Couldn't fetch the books.");
        setBooks([]);
        setNextPage(null);
        setPreviousPage(null);
      } finally {
        setLoading(false);
      }
    }

    loadBooks();
  }, [searchParam, pageParam]);

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
      {books.length === 0 ? (
        <p className={styles.empty}>No books found.</p>
      ) : (
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
              onClick={() => {
                if (previousPage) {
                  const url = new URL(previousPage);
                  const page =
                    url.searchParams.get("page");

                  const search =
                    url.searchParams.get("search");

                  if (search) {
                    window.history.pushState(
                      {},
                      "",
                      `/books?search=${encodeURIComponent(
                        search,
                      )}&page=${page || 1}`,
                    );

                    window.dispatchEvent(
                      new PopStateEvent("popstate"),
                    );
                  }
                }
              }}
              disabled={!previousPage}
            >
              ← Previous
            </button>

            <span className={styles.pageNumber}>
              Page {pageParam}
            </span>

            <button
              className={styles.pageButton}
              onClick={() => {
                if (nextPage) {
                  const url = new URL(nextPage);
                  const page =
                    url.searchParams.get("page");

                  const search =
                    url.searchParams.get("search");

                  if (search) {
                    window.history.pushState(
                      {},
                      "",
                      `/books?search=${encodeURIComponent(
                        search,
                      )}&page=${page || 1}`,
                    );

                    window.dispatchEvent(
                      new PopStateEvent("popstate"),
                    );
                  }
                }
              }}
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