import React from "react";
import styled from "styled-components";
import { useState } from "react";
import styles from './LandingPage.module.css';

const PageContainer = styled.div`
  position: relative;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
`;

const SignInButton = styled.button`
  background-color: white;
  color: #273b29;
  border: none;
  padding: 12px 30px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 20px;
  cursor: pointer;
  border-radius: 8px;
  transition: background-color 0.3s;
  margin-top: 10px;

  &:hover {
    background-color: #d5e3d7;
  }
`;

const LandingPage: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const handleGetStartedClick = async () => {
    const response = await fetch("http://127.0.0.1:8080/enter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (data.success) {
      window.location.href = data.redirectUrl; // Perform redirection on client side
    } else {
      console.error("Login failed:", data.message);
    }
  };

  return (
    <div className={styles.videoContainer}>
      <video className={styles.video} autoPlay loop muted>
        <source src="videoplayback.mp4" type="video/mp4" />
      </video>
      <img src="logo.png" alt="Logo" className={styles.logo} />
      <h1 className={styles.brandName}>SUSTAINALYTICS</h1>
      <div className={styles.overlay}>
        <div className={styles.container}>
          <h1 className={styles.largeText}>Your AI Partner </h1>
          <h1 className={styles.largeText}>for Sustainability Excellence</h1>
          <h2>
            <SignInButton onClick={handleGetStartedClick}>Get Started</SignInButton>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;