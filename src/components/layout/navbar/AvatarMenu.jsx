import * as React from 'react';
import { Typography, Tooltip, IconButton, Avatar, Menu, MenuItem, styled } from '@mui/material';
import defaultIcon from '../../../assets/defaultAccountIcon.png';

const AvatarMenu = ({ settings, avatarURL }) => {
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const CustomAvatar = styled(Avatar)(({ theme }) => ({
    width: 95,
    height: 95,
    [theme.breakpoints.down('md')]: {
      width: 70,
      height: 70,
    },
  }));

  return (
    <>
      <Tooltip title="Open settings">
        <IconButton onClick={(e) => setAnchorElUser(e.currentTarget)}>
          <CustomAvatar alt="Avatar image." src={avatarURL ? avatarURL : defaultIcon} />
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
        onClose={() => setAnchorElUser(null)}
      >
        {settings.map((setting) => (
          <MenuItem
            key={setting.Name}
            onClick={() => {
              setting.Fun();
              setAnchorElUser(null);
            }}
          >
            <Typography textAlign="center">{setting.Name}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default AvatarMenu;
