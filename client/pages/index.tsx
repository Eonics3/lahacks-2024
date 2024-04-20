// pages/index.tsx
import { useState, Button } from 'react';
import SignInPage from '../components/SignInPage';

const Home = () => {
    // const [file, setFile] = useState<File | null>(null);
    // const [message, setMessage] = useState<string>('');
    // const [loading, setLoading] = useState(false);

    // const handleGoogleSignIn = () => {
    //   console.log("handling google sign in");
    //   window.location.href = 'http://localhost:8080/login';
    // };

    const toPortal = () => {
      console.log("shortcut to portal");
      window.location.href = 'http://localhost:3000/portal';
    }

    // const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     const files = event.target.files;
    //     if (files && files[0]) {
    //         setFile(files[0]);
    //     }
    // };

    // const handleSubmit = async (event: React.FormEvent) => {
    //     event.preventDefault();
    //     if (file) {
    //         const formData = new FormData();
    //         formData.append('file', file);

    //         try {
    //             const response = await fetch('/api/upload', {
    //                 method: 'POST',
    //                 body: formData,
    //             });
    //             const data = await response.json();
    //             setMessage(data.message);
    //         } catch (error) {
    //             console.error('Error:', error);
    //             setMessage('Failed to upload file.');
    //         }
    //     } else {
    //         setMessage('Please select a file to upload.');
    //     }
    // };

    return (
        <div>
            <button onClick={toPortal}>To Portal</button>
            <h1>Welcome to My App</h1>

            <SignInPage />
            {/* <h1>Upload a CSV or XLSX File</h1>
            <form onSubmit={handleSubmit}>
                <input type="file" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" onChange={handleFileChange} />
                <button type="submit">Upload File</button>
            </form>
            {message && <p>{message}</p>} */}
        </div>
    );
};

export default Home;


// // pages/index.tsx
// import { useState } from 'react';

// const Home = () => {
//     const [file, setFile] = useState<File | null>(null);
//     const [message, setMessage] = useState<string>('');
//     const [loading, setLoading] = useState(false);

//     const handleGoogleSignIn = () => {
//       console.log("handling google sign in");
//       window.location.href = 'http://localhost:8080/login';
//     };

//     const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         const files = event.target.files;
//         if (files && files[0]) {
//             setFile(files[0]);
//         }
//     };

//     const handleSubmit = async (event: React.FormEvent) => {
//         event.preventDefault();
//         if (file) {
//             const formData = new FormData();
//             formData.append('file', file);

//             try {
//                 const response = await fetch('/api/upload', {
//                     method: 'POST',
//                     body: formData,
//                 });
//                 const data = await response.json();
//                 setMessage(data.message);
//             } catch (error) {
//                 console.error('Error:', error);
//                 setMessage('Failed to upload file.');
//             }
//         } else {
//             setMessage('Please select a file to upload.');
//         }
//     };

//     return (
//         <div>
//             <h1>Welcome to My App</h1>
//             <button onClick={handleGoogleSignIn} disabled={loading}>
//               {loading ? 'Signing in...' : 'Sign in with Google'}
//             </button>
//             <h1>Upload a CSV or XLSX File</h1>
//             <form onSubmit={handleSubmit}>
//                 <input type="file" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" onChange={handleFileChange} />
//                 <button type="submit">Upload File</button>
//             </form>
//             {message && <p>{message}</p>}
//         </div>
//     );
// };

// export default Home;
