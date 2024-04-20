import React, { lazy, Suspense, useState } from 'react';
import SideNav from '../components/Navbar';
import DummyUpload from '../components/UploadPage';
import DummyDashboard from '../components/Dashboard';
import DummySuggestions from '../components/Suggestions';

function Portal(){
    const [window, setWindow] = useState(0);     // 0, 1, 2 controls which window is open 

    return (
    <div>
        <SideNav setWindow={setWindow} />

        <div className={`${window==0 ? 'block' : 'hidden'}`}>
            <DummyUpload />
        </div>
        <div className={`${window==1 ? 'block' : 'hidden'}`}>
            <DummyDashboard />
        </div>
        <div className={`${window==2 ? 'block' : 'hidden'}`}>
            <DummySuggestions />
        </div>
    </div>);
}

export default Portal;