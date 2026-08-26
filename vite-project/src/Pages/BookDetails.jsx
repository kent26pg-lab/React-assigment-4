import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useFavorites } from "../Context/FavoriteContext.jsx";

import styles from "./BookDetails.module.css";

function BookDetails() {
  const { id } = useParams();

  const navigate = useNavigate();

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
      en: "English",
      no: "Norwegian",
      nb: "Norwegian Bokmål",
      nn: "Norwegian Nynorsk",
      da: "Danish",
      sv: "Swedish",
      de: "German",
      fr: "French",
      es: "Spanish",
      it: "Italian",
      pt: "Portuguese",
      nl: "Dutch",
      fi: "Finnish",
      is: "Icelandic",
      pl: "Polish",
      ru: "Russian",
      uk: "Ukrainian",
      el: "Greek",
      la: "Latin",
      ja: "Japanese",
      zh: "Chinese",
      ar: "Arabic",
      he: "Hebrew",
    };

    return languages[languageCode] || languageCode;
  }

  useEffect(() => {
    async function fetchBook() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(`https://gutendex.com/books/${id}`);

        if (!response.ok) {
          throw new Error("Couldnt fetch the book.");
        }

        const data = await response.json();

        setBook(data);
      } catch (error) {
        console.error(error);
        setError("Something went wrong. Couldnt fetch the book.");
      } finally {
        setLoading(false);
      }
    }

    fetchBook();
  }, [id]);

  if (loading) {
    return (
      <main className={styles.container}>
        <p className={styles.loading}>Loading Book...</p>
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
      subject.toLowerCase().includes(category.toLowerCase()),
    ),
  );

  return (
    <main className={styles.container}>
      <button className={styles.backButton} onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className={styles.card}>
        {cover && <img src={cover} alt={book.title} className={styles.cover} />}

        <div className={styles.info}>
          <h1 className={styles.title}>{book.title}</h1>

          <p>
            <strong>Author:</strong>{" "}
            {book.authors.length > 0
              ? book.authors.map((author) => author.name).join(", ")
              : "Unkown Author"}
          </p>

          <p>
            <strong>Downloads:</strong> {book.download_count}
          </p>

          <div className={styles.categoryInfo}>
            <strong>Category:</strong>

            <div className={styles.categories}>
              {bookCategories.length > 0 ? (
                bookCategories.map((category) => (
                  <span key={category} className={styles.category}>
                    {category}
                  </span>
                ))
              ) : (
                <span className={styles.noCategory}>No categories</span>
              )}
            </div>
          </div>

          <p>
            <strong>Språk:</strong>{" "}
            {book.languages.length > 0
              ? book.languages
                  .map((language) => getLanguageName(language))
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
                Read the book digitally
              </a>
            )}

            <button className={styles.favoriteButton} onClick={handleFavorite}>
              {favorite ? "Remove from Favorites" : "Add to Favorites"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default BookDetails;
