import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!book) {
    return <p>Fant ikke boken.</p>;
  }

  const cover = book.formats["image/jpeg"];

  const author = book.authors.length > 0
    ? book.authors[0].name
    : "Ukjent forfatter";

  const categories = book.subjects.length > 0
    ? book.subjects.join(", ")
    : "Ingen kategori";

  const languages = book.languages.length > 0
    ? book.languages.join(", ")
    : "Ukjent språk";

  const bookLink =
    book.formats["text/html"] ||
    book.formats["application/epub+zip"] ||
    book.formats["text/plain"];

  return (
    <div>
      <h1>{book.title}</h1>

      {cover && (
        <img
          src={cover}
          alt={`Cover av ${book.title}`}
        />
      )}

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
          href={bookLink}
          target="_blank"
          rel="noreferrer"
        >
          Les boka digitalt
        </a>
      )}
    </div>
  );
}

export default BookDetails;