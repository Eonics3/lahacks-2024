import React from "react";
import styled from "styled-components";
import { useState } from "react";

const PageContainer = styled.div`
  display: flex;
  justify-content: flex-end; // Align children to the right
  align-items: flex-start; // Align children to the top
  height: 100vh;
  width: 100vw;
  background: url("backgrnd.svg") no-repeat center center fixed;
  background-size: cover;
  padding: 20px; // Padding to ensure button is not stuck to edges
`;

const SideNav = styled.nav`
  width: 250px;
  background-color: #fff;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  padding: 20px;
`;

const NavItem = styled.div`
  margin-top: 20px;
  font-size: 18px;
`;

const Logo = styled.img`
  width: 100%;
  max-width: 150px;
  margin-bottom: 40px;
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
  //   const handleGoogleSignIn = () => {
  //     console.log("handling google sign in");
  //     window.location.href = "http://localhost:8080/login";
  //   };
  const [loading, setLoading] = useState(false);

  return (
    <PageContainer>
      <SignInButton disabled={loading}>
        {loading ? "Signing in..." : "Get Started"}
      </SignInButton>
    </PageContainer>
  );
};

export default LandingPage;
