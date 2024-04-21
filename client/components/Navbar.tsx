import Link from 'next/link';
import styles from './Navbar.module.css';

interface SideNavProps {
  setWindow: React.Dispatch<React.SetStateAction<number>>;
}

const SideNav: React.FC<SideNavProps> = ({ setWindow }) => {
  return (
    <nav className={styles.sidebar}>
      <ul>
        <li>
          <button onClick={() => setWindow(0)}>Upload</button>
        </li>
        <li>
          <button onClick={() => setWindow(1)}>Visualization</button>
        </li>
        <li>
          <button onClick={() => setWindow(2)}>Insights</button>
        </li>
        <li>
          <Link href="/contact">
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default SideNav;
