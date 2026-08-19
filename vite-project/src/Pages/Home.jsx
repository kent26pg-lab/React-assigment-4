import styles from "./Home.module.css";

function Home() {
  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Welcome to the Bookstore</h1>

      <p className={styles.text}>
        Her kan du utforske bøker fra Gutendex.
      </p>
    </main>
  );
}

export default Home;