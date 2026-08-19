import { Link } from "react-router-dom";

import styles from "./BookCard.module.css";

function BookCard({ book }) {
  return (
    <article className={styles.card}>
      <Link
        className={styles.link}
        to={`/books/${book.id}`}
      >
        <img
          className={styles.cover}
          src={book.formats["image/jpeg"]}
          alt={`Cover av ${book.title}`}
        />

        <h2 className={styles.title}>{book.title}</h2>
      </Link>
    </article>
  );
}

export default BookCard;