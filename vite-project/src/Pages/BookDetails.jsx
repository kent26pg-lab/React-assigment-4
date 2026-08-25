import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useFavorites } from "../Context/FavoriteContext.jsx";

import styles from "./BookDetails.module.css";

function BookDetails() {
  const { id } = useParams();

  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchBook() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `https://gutendex.com/books/${id}`
        );

        if (!response.ok) {
          throw new Error("Kunne ikke hente boken.");
        }

        const data = await response.json();

        setBook(data);
      } catch (error) {
        console.error(error);
        setError("Noe gikk galt. Klarte ikke å hente boken.");
      } finally {
        setLoading(false);
      }
    }

    fetchBook();
  }, [id]);

  if (loading) {
    return (
      <main className={styles.container}>
        <p className={styles.loading}>Laster bok...</p>
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

  if (!book) {
    return null;
  }

  const favorite = isFavorite(book.id);

  function handleFavorite() {
    if (favorite) {
      removeFavorite(book.id);
    } else {
      addFavorite(book);
    }
  }

  const cover = book.formats["image/jpeg"];

  const digitalFormat =
    book.formats["text/html"] ||
    book.formats["application/epub+zip"] ||
    book.formats["application/pdf"];

  return (
    <main className={styles.container}>
      <div className={styles.card}>
        {cover && (
          <img
            src={cover}
            alt={book.title}
            className={styles.cover}
          />
        )}

        <div className={styles.info}>
          <h1 className={styles.title}>{book.title}</h1>

          <p>
            <strong>Forfatter:</strong>{" "}
            {book.authors.length > 0
              ? book.authors.map((author) => author.name).join(", ")
              : "Ukjent forfatter"}
          </p>

          <p>
            <strong>Nedlastninger:</strong>{" "}
            {book.download_count}
          </p>

          <p>
            <strong>Kategori:</strong>{" "}
            {book.subjects.length > 0
              ? book.subjects.join(", ")
              : "Ingen kategori"}
          </p>

          <p>
            <strong>Språk:</strong>{" "}
            {book.languages.length > 0
              ? book.languages.join(", ")
              : "Ukjent"}
          </p>

          <div className={styles.actions}>
            {digitalFormat && (
              <a
                href={digitalFormat}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                Les boka digitalt
              </a>
            )}

            <button
              className={styles.favoriteButton}
              onClick={handleFavorite}
            >
              {favorite
                ? "Fjern fra Favoritter"
                : "Legg til i Favoritter"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default BookDetails;