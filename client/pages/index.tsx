import SignInPage from '../components/SignInPage';

const Home = () => {

    const toPortal = () => {
      console.log("shortcut to portal");
      window.location.href = 'http://localhost:3000/portal';
    }

    return (
        <div>
            <SignInPage />
        </div>
    );
};

export default Home;