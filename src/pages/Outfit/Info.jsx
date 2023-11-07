import * as React from 'react';
import Likes from '../../components/ui/Likes';
import defaultIcon from '../../assets/defaultAccountIcon.png';
import { OutfitApi } from '../../api/OutfitApi';
import { useNavigate } from 'react-router-dom';
import Divider from '@mui/material/Divider';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { Box, Typography, Avatar, styled, List, ListItem, ListItemText, ListItemAvatar } from '@mui/material';

const Info = ({ outfitInit }) => {
  const [outfit, setOutfit] = React.useState(outfitInit);
  const navigate = useNavigate();
  const [likes, setLikes] = React.useState(null);

  const axiosLikeOrUnlikeOutfitAsync = async (outfitId) => {
    try {
      const response = await OutfitApi.likeOrUnlikeOutfitAsync(outfitId);
      outfit.likes = response.data;
      setOutfit({ ...outfit });
    } catch (error) {
      console.error(error);
    }
  };
  const getDate = (inputDate) => {
    const date = new Date(inputDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
  };

  const CustomListItemText = styled(ListItemText)(({ theme }) => ({
    cursor: 'pointer',
    '&:hover': {
      opacity: '0.5',
    },
  }));

  return (
    <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
      <Typography variant="h4">{outfit.name}</Typography>
      <List
        sx={{
          width: '100%',
          maxWidth: 400,
          bgcolor: 'background.paper',
        }}
      >
        <ListItem>
          <ListItemAvatar>
            <Avatar alt="Avatar image." src={outfit.account.avatarUrl ? outfit.account.avatarUrl : defaultIcon} />
          </ListItemAvatar>
          <CustomListItemText
            primary={outfit.account.username}
            secondary="Owner"
            onClick={() => navigate(`../account/${outfit.account.id}`)}
          />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <CalendarMonthIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={getDate(outfit.creationDate)} secondary="Date of creation" />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem>
          <Likes likes={outfit.likes} setLikes={setLikes} likeOrUnlikeFunc={axiosLikeOrUnlikeOutfitAsync} id={outfit.id} />
        </ListItem>
      </List>
    </Box>
  );
};

export default Info;
