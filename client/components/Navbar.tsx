import React from 'react';
import styled from 'styled-components';

const Nav = styled.nav`
  height: 100vh;
  width: 200px;
  position: fixed;
  background-color: #f0f0f0;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const Logo = styled.img`
  width: 100px;
  margin-bottom: 40px;
`;

const NavLink = styled.a`
  margin: 10px 0;
  color: #333;
  text-decoration: none;
`;

const SideNav: React.FC = () => {
  return (
    <Nav>
      <Logo src="logo1.png" alt="App Logo" />
      <NavLink href="#">Upload</NavLink>
      <NavLink href="#">Graphs</NavLink>
      <NavLink href="#">Takeaways</NavLink>
    </Nav>
  );
};

export default SideNav;
