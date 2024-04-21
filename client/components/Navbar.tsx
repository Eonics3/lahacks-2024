import React from 'react';
import { useRouter } from 'next/router';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import styles from './Navbar.module.css';

const NavBar = styled(AppBar)({
  backgroundColor: '#537551', // A shade of green
});

const TopNav: React.FC = () => {
  const router = useRouter();

  const handleNavigation = (url: string) => {
    router.push(url);
  };

  return (
    <>
      <NavBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" style={{ flexGrow: 1 }} onClick={() => handleNavigation('/')}>
            <a className={styles.logonav}>
              <img src="logo.png" alt="Logo" />
              <span className={styles.brandName2}>SUSTAINALYTICS</span>
            </a>
          </Typography>
          <Button color="inherit" onClick={() => handleNavigation('/uploadpage')}>Upload</Button>
          <Button color="inherit" onClick={() => handleNavigation('/dashboard')}>Dashboard</Button>
        </Toolbar>
      </NavBar>
    </>
  );
};

export default TopNav;
