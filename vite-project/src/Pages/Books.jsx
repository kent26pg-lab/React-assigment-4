import { useEffect, useState } from "react";

import BookCard from "../Components/BookCard.jsx";
import styles from "./Books.module.css";

function Books() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("https://gutendex.com/books");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        setBooks(data.results);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return <p className={styles.loading}>Loading...</p>;
  }

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Books</h1>

      <div className={styles.books}>
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </main>
  );
}

export default Books;