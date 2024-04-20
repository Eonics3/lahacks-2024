import Link from 'next/link';

const Navbar = () => {
    return (
        <nav style={{ background: '#333', padding: '10px 0', display: 'flex', justifyContent: 'space-around' }}>
            <Link href="/" style={{ color: 'white', textDecoration: 'none' }}>Home</Link>
            <Link href="/about" style={{ color: 'white', textDecoration: 'none' }}>About</Link>
            <Link href="/contact" style={{ color: 'white', textDecoration: 'none' }}>Contact</Link>
        </nav>
    );
};

export default Navbar;
