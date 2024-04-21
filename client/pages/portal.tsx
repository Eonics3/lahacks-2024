import React, { lazy, Suspense, useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import SideNav from '../components/Navbar';
import DummyUpload from '../components/UploadPage';
import DummyDashboard from '../components/Dashboard';
import DummySuggestions from '../components/Suggestions';
import { access } from 'fs';

function Portal(){
    const [screen, setScreen] = useState(0);     // 0, 1, 2 controls which screen is open 
    const router = useRouter();

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