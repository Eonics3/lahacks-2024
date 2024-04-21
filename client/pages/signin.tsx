import React, { useState } from "react";
import styles from "./signin.module.css";
import styled from 'styled-components';

const SignIn: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(username, password);
    try {
      const response = await fetch("http://127.0.0.1:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
        mode: "cors",
      });
      const data = await response.json();
      if (data.success) {
        window.location.href = data.redirectUrl; // Perform redirection on client side
      } else {
        console.error("Login failed:", data.message);
      }
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  const pageStyles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100vw',
    backgroundImage: 'url(/vivid-blurred-colorful-wallpaper-background.jpg)', 
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  };

  const formContainerStyles = {
    background: '#FFFFFF',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    padding: '40px',
    maxWidth: '400px',
    width: '100%',
    boxSizing: 'border-box', // Ensures padding doesn't affect width
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  };

  return (
    <div style = {pageStyles}>
      <div className={styles.container}>
        <h1 className={styles.title}>Welcome</h1>
        <img
          src='/sustain_color.jpg' // Replace with your image path
          alt="Profile"
          className={styles.profileImage}
        />
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            value={username}
            onChange={handleUsernameChange}
            placeholder="Type your username"
            className={styles.input}
          />
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Type your password"
            className={styles.input}
          />
          <div className={styles.socialButtons}>
            {/* Implement social buttons here */}
          </div>
          <button type="submit" className={styles.button}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
