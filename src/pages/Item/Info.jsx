import { Box, Typography, List, ListItem, ListItemText, ListItemAvatar, Avatar, styled, Button } from '@mui/material';
import { ItemApi } from '../../api/ItemApi';
import Likes from '../../components/ui/Likes';
import React from 'react';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import Divider from '@mui/material/Divider';
import AbcIcon from '@mui/icons-material/Abc';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';


const Info = ({ item, setFetchedItem }) => {
  const [likes, setLikes] = React.useState(null);

  const likeOrUnlikeItem = async (itemId) => {
    try {
      const response = await ItemApi.likeOrUnlikeItem(itemId);
      item.likes = response.data;
      setFetchedItem({ ...item });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
      <Typography variant="h4">{item.name}</Typography>
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
              <LocalOfferIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={item.brand ? item.brand : "No data"} secondary="Brand" />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <AbcIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={item.model ? item.model : "No data"} secondary="Model" />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <ColorLensIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={item.colorway ? item.colorway : "No data"} secondary="Colorway" />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <AttachMoneyIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={item.price ? `${item.price}€` : "No data"} secondary="Price" />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <CalendarMonthIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={item.purchaseDate ? item.purchaseDate.split('T')[0] : "No data"} secondary="Date of purchase" />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem>
        <Likes likes={item.likes} likeOrUnlikeFunc={likeOrUnlikeItem} id={item.id} setLikes={setLikes}/>
        </ListItem>
      </List>
    </Box>
  );
};

export default Info;
