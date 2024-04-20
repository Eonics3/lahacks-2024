import SignInPage from '../components/SignInPage';

const Home = () => {

    const toPortal = () => {
      console.log("shortcut to portal");
      window.location.href = 'http://localhost:3000/portal';
    }

    return (
        <div>
            <button onClick={toPortal}>To Portal</button>
            <h1>Welcome to My App</h1>
            <SignInPage />
        </div>
    );
};

export default Home;