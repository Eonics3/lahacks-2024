import React from "react";
import styled from "styled-components";
import { useState } from "react";

const PageContainer = styled.div`
  display: flex;
  height: 100vh;
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
  background-color: gray;
  color: white;
  border: none;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 20px;
  margin: auto;
  cursor: pointer;
  border-radius: 8px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #45a049;
  }
`;

const SignInPage: React.FC = () => {
  const handleGoogleSignIn = () => {
    console.log("handling google sign in");
    window.location.href = "http://localhost:8080/login";
  };
  const [loading, setLoading] = useState(false);

  return (
    <PageContainer>
      <SignInButton onClick={handleGoogleSignIn} disabled={loading}>
        {loading ? "Signing in..." : "Sign in with Google"}
      </SignInButton>
    </PageContainer>
  );
};

export default SignInPage;
