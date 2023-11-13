import * as React from 'react';
import Logo from './Logo';
import Searchbar from './Searchbar';
import AvatarMenu from './AvatarMenu';
import { useAuth } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Box, Toolbar, AppBar, Stack } from '@mui/material';

const NavbarAuthorized = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const settings = [
    {
      Name: 'Profile',
      Fun: () => navigate(`../account/${currentUser.accountId}`),
    },
    {
      Name: 'Outfits',
      Fun: () => navigate(`/account/${currentUser.accountId}/outfits`),
    },
    {
      Name: 'Items',
      Fun: () => navigate(`/account/${currentUser.accountId}/items`),
    },
    {
      Name: 'Settings',
      Fun: () => navigate(`/account/${currentUser.accountId}/settings`),
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
          <Stack
            spacing={1}
            direction="row"
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
              flexGrow: 0.15,
            }}
          >
            <Searchbar />
            <AvatarMenu settings={settings} avatarURL={currentUser?.avatarURL} />
          </Stack>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavbarAuthorized;
