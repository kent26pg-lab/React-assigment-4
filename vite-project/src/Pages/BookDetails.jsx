import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import styles from "./BookDetails.module.css";

function BookDetails() {
  const { id } = useParams();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchBook() {
      try {
        const response = await fetch(
          `https://gutendex.com/books/${id}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        setBook(data);
      } catch (error) {
        console.error("Fetch error:", error);
        setError("Kunne ikke hente boken.");
      } finally {
        setLoading(false);
      }
    }

    fetchBook();
  }, [id]);

  if (loading) {
    return <p className={styles.loading}>Loading...</p>;
  }

  if (error) {
    return <p className={styles.error}>{error}</p>;
  }

  if (!book) {
    return <p className={styles.error}>Fant ikke boken.</p>;
  }

  const cover = book.formats["image/jpeg"];

  const author =
    book.authors.length > 0
      ? book.authors[0].name
      : "Ukjent forfatter";

  const categories =
    book.subjects.length > 0
      ? book.subjects.join(", ")
      : "Ingen kategori";

  const languages =
    book.languages.length > 0
      ? book.languages.join(", ")
      : "Ukjent språk";

  const bookLink =
    book.formats["text/html"] ||
    book.formats["application/epub+zip"] ||
    book.formats["text/plain"];

  return (
    <main className={styles.container}>
      <div className={styles.card}>
        {cover && (
          <img
            className={styles.cover}
            src={cover}
            alt={`Cover av ${book.title}`}
          />
        )}

        <div className={styles.info}>
          <h1 className={styles.title}>{book.title}</h1>

          <p>
            <strong>Forfatter:</strong> {author}
          </p>

          <p>
            <strong>Nedlastninger:</strong> {book.download_count}
          </p>

          <p>
            <strong>Kategori:</strong> {categories}
          </p>

          <p>
            <strong>Språk:</strong> {languages}
          </p>

          {bookLink && (
            <a
              className={styles.link}
              href={bookLink}
              target="_blank"
              rel="noreferrer"
            >
              Les boka digitalt
            </a>
          )}
        </div>
      </div>
    </main>
  );
}

export default BookDetails;