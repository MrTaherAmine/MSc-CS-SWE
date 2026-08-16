import Link from "next/link";
import styles from "../styles/Layout.module.css";

export default function Layout({ children }) {
  return (
    <div className={styles.site}>
      <header className={styles.header}>
        <div className={styles.navbar}>
          <Link href="/" className={styles.brand}>
            TAE.
          </Link>

          <nav>
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <Link href="/projects">Projects</Link>
            <Link href="/contact">Contact</Link>
          </nav>
        </div>
      </header>

      <main className={styles.main}>{children}</main>

      <footer className={styles.footer}>
        <p>© 2026 Taher Amine ELHOUARI — Next.js Portfolio Checkpoint</p>
      </footer>
    </div>
  );
}
