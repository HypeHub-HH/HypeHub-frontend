import * as React from 'react';
import { Avatar, Typography, Stack, List, ListItem, ListItemAvatar, ListItemText, Divider } from '@mui/material';
import defaultIcon from '../../assets/defaultAccountIcon.png';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import FavoriteIcon from '@mui/icons-material/Favorite';

const AccountInfo = ({ accountInfo, numberOfItems, numberOfItemsLikes, numberOfOutfits, numberOfOutfitsLikes }) => {
  return (
    <>
      <Stack
        spacing={2}
        direction="row"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '2%',
        }}
      >
        <Typography variant="h4">{accountInfo.username}</Typography>
        <Avatar
          alt="Avatar image."
          src={accountInfo.avatarUrl ? accountInfo.avatarUrl : defaultIcon}
          sx={{ width: 75, height: 75 }}
        />
      </Stack>
      <List
        sx={{
          width: '100%',
          maxWidth: 400,
          bgcolor: 'background.paper',
        }}
      >
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <CheckroomIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={numberOfItems} secondary="Owned items" />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <AccessibilityIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={numberOfOutfits} secondary="Created outfits" />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <FavoriteIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={numberOfItemsLikes} secondary="Item likes" />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <FavoriteIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={numberOfOutfitsLikes} secondary="Outfit likes" />
        </ListItem>
      </List>
    </>
  );
};

export default AccountInfo;
