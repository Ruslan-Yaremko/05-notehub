import Link from "next/link";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          NoteHub
        </Link>

        <nav className={styles.navigation}>
          <Link href="/" className={styles.link}>
            Home
          </Link>
          <Link href="/notes" className={styles.link}>
            Notes
          </Link>
        </nav>
      </div>
    </header>
  );
}