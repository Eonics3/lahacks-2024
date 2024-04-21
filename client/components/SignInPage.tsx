// pages/signin.tsx
import React, { useState, createContext, ReactNode, useContext } from 'react';
import styles from './signin.module.css'; 

const SignIn: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    // const { user, updateUser } = useContext(UserContext);


    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      // Here you can handle the submission, e.g., login logic
      console.log(username, password);
      try {
        const response = await fetch('http://127.0.0.1:8080/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password })
        });
        const data = await response.json();
        if (data.success) {
            window.location.href = data.redirectUrl;  // Perform redirection on client side
        } else {
            console.error('Login failed:', data.message);
        }
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
  };

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <input
                    type="text"
                    value={username}
                    onChange={handleUsernameChange}
                    placeholder="Username"
                    className={styles.input}
                />
                <input
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                    placeholder="Password"
                    className={styles.input}
                />
                <button type="submit" className={styles.button}>Sign In</button>
            </form>
        </div>
    );
};

export default SignIn;
