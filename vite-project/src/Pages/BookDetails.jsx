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

  const categories = [
    "Fiction",
    "Mystery",
    "Thriller",
    "Romance",
    "Fantasy",
    "Morality",
    "Society",
    "Power",
    "Justice",
    "Adventure",
    "Tragedy",
    "War",
    "Philosophy",
  ];

  function getLanguageName(languageCode) {
    const languages = {
      en: "Engelsk",
      no: "Norsk",
      nb: "Norsk bokmål",
      nn: "Norsk nynorsk",
      da: "Dansk",
      sv: "Svensk",
      de: "Tysk",
      fr: "Fransk",
      es: "Spansk",
      it: "Italiensk",
      pt: "Portugisisk",
      nl: "Nederlandsk",
      fi: "Finsk",
      is: "Islandsk",
      pl: "Polsk",
      ru: "Russisk",
      uk: "Ukrainsk",
      el: "Gresk",
      la: "Latin",
      ja: "Japansk",
      zh: "Kinesisk",
      ar: "Arabisk",
      he: "Hebraisk",
    };

    return languages[languageCode] || languageCode;
  }

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

  const bookCategories = categories.filter((category) =>
    book.subjects.some((subject) =>
      subject.toLowerCase().includes(category.toLowerCase())
    )
  );

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

          <div className={styles.categoryInfo}>
            <strong>Kategori:</strong>

            <div className={styles.categories}>
              {bookCategories.length > 0 ? (
                bookCategories.map((category) => (
                  <span
                    key={category}
                    className={styles.category}
                  >
                    {category}
                  </span>
                ))
              ) : (
                <span className={styles.noCategory}>
                  Ingen kategori
                </span>
              )}
            </div>
          </div>

          <p>
            <strong>Språk:</strong>{" "}
            {book.languages.length > 0
              ? book.languages
                  .map((language) =>
                    getLanguageName(language)
                  )
                  .join(", ")
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