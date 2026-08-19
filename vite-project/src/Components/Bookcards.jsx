import { Link } from "react-router-dom";

function BookCard({ book }) {
  return (
    <article>
      <Link to={`/books/${book.id}`}>
        <img
          src={book.formats["image/jpeg"]}
          alt={book.title}
        />

        <h2>{book.title}</h2>
      </Link>
    </article>
  );
}

export default BookCard;