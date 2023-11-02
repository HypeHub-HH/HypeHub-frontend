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

  const settings = [
    {
      Name: 'Outfits',
      Fun: () => navigate('/{username}/myOutfits'),
    },
    {
      Name: 'Items',
      Fun: () => navigate('/myItems'),
    },
    {
      Name: 'Settings',
      Fun: () => navigate('/{username}/settings'),
    },
    {
      Name: 'Logout',
      Fun: () => {
        logout();
        navigate('/');
      },
    },
  ];

  return (
    <AppBar position="sticky" color="primary">
      <Toolbar sx={{ maxHeight: '100px' }}>
        <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="center" width="100%">
          <Logo />
          <Box display="flex" flexDirection="row" justifyContent="space-around" alignItems="center" sx={{ flexGrow: 0.1 }}>
            <Searchbar />
            <AvatarMenu settings={settings} avatarURL={currentUser?.avatarURL} />
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavbarAuthorized;
