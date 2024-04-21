import LandingPage from '../components/LandingPage';
import App from './_app'; 
import React from 'react';

const Home = () => {

    const toPortal = () => {
      console.log("shortcut to portal");
      window.location.href = 'http://localhost:3000/portal';
    }

    return (
        <div>
            <LandingPage />
        </div>
    );
};

export default Home;