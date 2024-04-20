import { useState } from 'react';

export default function Home() {
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = () => {
    console.log("handling google sign in");
    window.location.href = 'http://localhost:8080/login';
  };

  return (
    <div>
      <h1>Welcome to My App</h1>
      <button onClick={handleGoogleSignIn} disabled={loading}>
        {loading ? 'Signing in...' : 'Sign in with Google'}
      </button>
    </div>
  );
}
