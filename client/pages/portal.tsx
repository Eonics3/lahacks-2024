import React, { lazy, Suspense, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import SideNav from '../components/Navbar';
import DummyUpload from '../components/UploadPage';
import DummyDashboard from '../components/Dashboard';
import DummySuggestions from '../components/Suggestions';

function Portal(){
    const [screen, setScreen] = useState(0);     // 0, 1, 2 controls which screen is open 
    const router = useRouter();

    useEffect(() => {
        const hash = window.location.hash.substr(1);
        const params = new URLSearchParams(hash);
        const accessToken = params.get('access_token');

        console.log("accessToken: ", accessToken);

        if (accessToken) {
            receiveToken(accessToken);
        } else {
            console.error('No access token found');
        }
    }, []); 

    function receiveToken(token: string) {
        console.log('Received token:', token);
        // Here you could further process the token, send it to your server, or store it in state
    }


    return (
    <div>
        <SideNav setScreen={setScreen} />

        <div className={`${screen==0 ? 'block' : 'hidden'}`}>
            <DummyUpload />
        </div>
        <div className={`${screen==1 ? 'block' : 'hidden'}`}>
            <DummyDashboard />
        </div>
        <div className={`${screen==2 ? 'block' : 'hidden'}`}>
            <DummySuggestions />
        </div>
    </div>);
}

export default Portal;