import * as React from 'react';
import { Typography, Tooltip, IconButton, Avatar, Menu, MenuItem } from '@mui/material';
import { OutfitApi } from '../../../api//OutfitApi.js';

const AvatarMenu = ({ settings }) => {
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu}>
          <Avatar
            alt="Avatar image."
            src="https://img.wprost.pl/img/joe-biden/f8/ec/45cbff5cf911c1f11165ae3b135e.jpeg"
            sx={{ width: 95, height: 95 }}
          />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '95px' }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {settings.map((setting) => (
          <MenuItem key={setting.Name} onClick={setting.Fun}>
            <Typography textAlign="center">{setting.Name}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default AvatarMenu;
