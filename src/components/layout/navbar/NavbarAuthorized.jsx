import * as React from 'react';
import { Box, Toolbar, AppBar } from '@mui/material';
import Logo from './Logo';
import Searchbar from './Searchbar';
import AvatarMenu from './AvatarMenu';
import { useAuth } from '../../../context/AuthContext.js';
import { useNavigate } from 'react-router-dom';

const NavbarAuthorized = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleOutfitsButton = () => {
    navigate('/{username}/myOutfits');
  };
  const handleItemsButton = () => {
    navigate('/{username}/myItems');
  };
  const handleSettingsButton = () => {
    navigate('/{username}/settings');
  };
  const handleLogoutButton = () => {
    logout();
    navigate('/');
  };
  const settings = [
    { Name: 'Outfits', Fun: handleOutfitsButton },
    { Name: 'Items', Fun: handleItemsButton },
    { Name: 'Settings', Fun: handleSettingsButton },
    { Name: 'Logout', Fun: handleLogoutButton },
  ];

  return (
    <AppBar position="sticky" color="primary">
      <Toolbar>
        <Logo />
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-around"
          alignItems="center"
          sx={{ flexGrow: 0.1 }}
        >
          <Searchbar />
          <AvatarMenu settings={settings} avatarURL={currentUser?.avatarURL} />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavbarAuthorized;
