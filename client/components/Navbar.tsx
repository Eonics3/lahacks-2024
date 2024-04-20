import Link from 'next/link';
import styles from './Navbar.module.css';

interface SideNavProps {
  setWindow: React.Dispatch<React.SetStateAction<number>>;
}

const SideNav: React.FC<SideNavProps> = ({ setWindow }) => {
  return (
    <nav className = {styles.sidebar}>
      <ul>
        <li>
          <button onClick={() => setWindow(0)}>Window 0</button>
        </li>
        <li>
          <button onClick={() => setWindow(1)}>Window 1</button>
        </li>
        <li>
          <button onClick={() => setWindow(2)}>Window 2</button>
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