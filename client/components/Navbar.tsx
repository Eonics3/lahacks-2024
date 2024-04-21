import React, { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton'; 
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { styled } from '@mui/material/styles';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'; // Import the icon for closing the drawer

const drawerWidth = 250;

const DrawerPaper = styled(Drawer)({
  width: drawerWidth,
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    boxSizing: 'border-box',
  },
});

const MenuButton = styled(IconButton)({
  color: 'inherit',
  marginLeft: 12,
  marginTop: 8,
});

const CloseButton = styled(IconButton)({
  color: 'inherit',
  position: 'absolute',
  bottom: 5,
  top: 0,
  right: 0,
});

interface SideNavProps {
  setScreen: React.Dispatch<React.SetStateAction<number>>;
}

const SideNav: React.FC<SideNavProps> = ({ setScreen }) => {
  // State to manage drawer open/close
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const titles = ["Upload", "Dashboard"];

  return (
    <>
      <MenuButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={handleDrawerOpen} // Toggle the drawer open
      >
        <MenuIcon />
      </MenuButton>
      <DrawerPaper
        variant="temporary" // Changed to temporary to allow closing
        open={isDrawerOpen} // Controlled by the isDrawerOpen state
        onClose={handleDrawerClose} // Handle closing the drawer
      >
        <CloseButton onClick={handleDrawerClose}>
          <ChevronLeftIcon />
        </CloseButton>
        <List>
          {titles.map((title, index) => (
            <ListItemButton 
              key={index}
              onClick={() => {
                setScreen(index);
                handleDrawerClose(); // Close the drawer upon clicking a menu item
              }}
              sx={{
                '&:hover': {
                  background: 'gray',
                },
              }}
            >
              <ListItemText primary={title} />
            </ListItemButton>
          ))}
        </List>
      </DrawerPaper>
    </>
  );
};

export default SideNav;
