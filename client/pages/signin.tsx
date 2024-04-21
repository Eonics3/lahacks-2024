import React, { useState } from "react";
import styles from "./signin.module.css";
import styled from 'styled-components';

const PageContainer = styled.div`
  display: flex;
  justify-content: center; // Center children horizontally
  align-items: center; // Center children vertically
  height: 100vh;
  width: 100vw;
  background: url("signinn.png") no-repeat center center fixed;
  background-size: cover;
`;

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

  return (
    <PageContainer>
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
        <button type="submit" className={styles.button}>
          Sign In
        </button>
      </form>
    </div>
    </PageContainer>
  );
};

export default SignIn;
