import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { UserProvider } from '../components/UserContext';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const showNavbar = !['/login', '/special'].includes(router.pathname);

  return (
    <>
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </>
  );
}

export default MyApp;
