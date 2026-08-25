import { Link } from "react-router-dom";
import styles from "./Home.module.css";

function Home() {
  return (
    <section className={styles.home}>
      <div className={styles.cover}>
        <div className={styles.decorativeLine}></div>

        <p className={styles.smallText}>THE BOOKSHELF</p>

        <h1>Discover Your<br />Next Book</h1>

        <p className={styles.description}>
          Explore thousands of free books from Project Gutenberg.
          Search, discover and save your favorites.
        </p>

        <Link to="/books" className={styles.button}>
          Explore Books
        </Link>

        <div className={styles.decorativeLine}></div>

        <p className={styles.footerText}>
          READ • DISCOVER • ENJOY
        </p>
      </div>
    </section>
  );
}

export default Home;