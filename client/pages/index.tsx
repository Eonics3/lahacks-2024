// pages/index.tsx
import { useState } from 'react';
import SignInPage from '../components/SignInPage';

const Home = () => {

    const toPortal = () => {
      console.log("shortcut to portal");
      window.location.href = 'http://localhost:3000/portal';
    }

    return (
        <div>
            <button onClick={toPortal}>To Portal</button>
            <SignInPage />
        </div>
    );
};

export default Home;