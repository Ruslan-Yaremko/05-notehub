import Link from "next/link";
import styles from "./Home.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <h1 className={styles.title}>Welcome to NoteHub</h1>
        <p className={styles.description}>
          Keep your thoughts, ideas, and tasks organized in one place.
        </p>
        <Link href="/notes" className={styles.button}>
          View notes
        </Link>
      </section>
    </main>
  );
}