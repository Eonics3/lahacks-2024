import React, { useState } from 'react';

const SignIn = () => {

    const [loading, setLoading] = useState(false);

    const handleGoogleSignIn = () => {
        console.log("handling google sign in");
        window.location.href = 'http://localhost:8080/login';
    }

    return (
    <div>
        <button onClick={handleGoogleSignIn} disabled={loading}>
        {loading ? 'Signing in...' : 'Sign in with Google'}
        </button>
    </div>)
}

export default SignIn;