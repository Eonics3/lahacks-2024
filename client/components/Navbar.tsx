// components/Navbar.tsx
import Link from 'next/link';
import styles from './Navbar.module.css';

const Navbar = () => {
  return (
    <div className={styles.navContainer}>
      <nav className={styles.logoSection}>
        <Link href="/" className={styles.link}>Logo</Link>
      </nav>
      <nav className={styles.navigation}>
        <Link href="/upload" className={styles.link}>Upload</Link>
        <Link href="/dashboard" className={styles.link}>Dashboard</Link>
        <Link href="/feedback" className={styles.link}>Feedback</Link>
      </nav>
      <nav className={styles.loginSection}>
        <Link href="/login" className={styles.link}>Login</Link>
      </nav>
    </div>
  );
};

export default Navbar;
