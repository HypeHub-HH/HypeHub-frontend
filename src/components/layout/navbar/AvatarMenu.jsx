import * as React from 'react';
import defaultIcon from '../../../assets/defaultAccountIcon.png';
import { Typography, Tooltip, IconButton, Avatar, Menu, MenuItem, styled } from '@mui/material';

const AvatarMenu = ({ settings, avatarURL }) => {
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const CustomAvatar = styled(Avatar)(({ theme }) => ({
    width: 75,
    height: 75,
    [theme.breakpoints.down('md')]: {
      width: 60,
      height: 60,
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
