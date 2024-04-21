import React from "react";
import styled from "styled-components";
import { useState } from "react";

const PageContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  height: 100vh;
  width: 100vw;
  background: url("landing.png") no-repeat center center fixed;
  background-size: cover;
  padding: 20px;
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
  margin-right: 640px;
  margin-top: 400px;
  border-radius: 8px;
  transition: background-color 0.3s;

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
    <PageContainer>
      <SignInButton onClick={handleGetStartedClick}>Get Started</SignInButton>
    </PageContainer>
  );
};

export default LandingPage;
