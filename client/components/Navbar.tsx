import Link from 'next/link';
import styles from './Navbar.module.css';

interface SideNavProps {
  setScreen: React.Dispatch<React.SetStateAction<number>>;
}

const SideNav: React.FC<SideNavProps> = ({ setScreen }) => {
  return (
    <nav className = {styles.sidebar}>
      <ul>
        <li>
          <button onClick={() => setScreen(0)}>Window 0</button>
        </li>
        <li>
          <button onClick={() => setScreen(1)}>Window 1</button>
        </li>
        <li>
          <button onClick={() => setScreen(2)}>Window 2</button>
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