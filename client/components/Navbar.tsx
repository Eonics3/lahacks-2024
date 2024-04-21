import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import styles from './Navbar.module.css';

const NavBar = styled(AppBar)({
  backgroundColor: '#537551', // A shade of green
});

const MenuButton = styled(IconButton)({
  marginRight: 20, // Adjust spacing to the right of the menu button
});

interface TopNavProps {
  setScreen: React.Dispatch<React.SetStateAction<number>>;
}

const TopNav: React.FC<TopNavProps> = ({ setScreen }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const titles = ["Upload", "Dashboard"];

  return (
    <>
      <NavBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            <img src="logo.png" alt="Logo" className={styles.logonav} />
            <h1 className={styles.brandName2}>SUSTAINALYTICS</h1>
          </Typography>
          {titles.map((title, index) => (
            <Button
              key={index}
              color="inherit"
              onClick={() => {
                setScreen(index);
              }}
            >
              {title}
            </Button>
          ))}
        </Toolbar>
      </NavBar>
      {/* Optional: Include a Drawer or Popover for the menu if it should still be collapsible */}
    </>
  );
};

export default TopNav;
