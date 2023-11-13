import * as React from 'react';
import { OutfitApi } from '../../api/OutfitApi';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Likes from '../../components/ui/Likes';
import defaultIcon from '../../assets/defaultAccountIcon.png';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import {
  Box,
  Typography,
  Avatar,
  styled,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Button,
  Dialog,
  DialogContent,
  Stack,
  Divider
} from '@mui/material';

const Info = ({ outfitInit, accountId }) => {
  const [outfit, setOutfit] = React.useState(outfitInit);
  const navigate = useNavigate();
  const [likes, setLikes] = React.useState(null);
  const [popUpDeleteOutfit, setPopUpDeleteOutfit] = React.useState(false);
  const { currentUser } = useAuth();

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
  const deleteOutfit = async () => {
    try {
      await OutfitApi.deleteOutfitAsync(outfit.id);
      navigate(-1);
    } catch (error) {
      console.error(error);
    }
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
        {currentUser && currentUser.accountId === accountId && (
          <Box display={'flex'} justifyContent={'flex-end'}>
            <Button variant="contained" onClick={() => setPopUpDeleteOutfit(true)}>
              Delete outfit
            </Button>
            <Button
              variant="contained"
              onClick={() =>
                navigate(`../account/${accountId}/outfits/${outfit.id}/edit`, {
                  state: { name: outfit.name, items: outfit.items, images: outfit.images },
                })
              }
              sx={{ backgroundColor: '#0EA5E9', marginLeft: 1 }}
            >
              Edit outfit
            </Button>
          </Box>
        )}
      </List>

      <Dialog open={popUpDeleteOutfit} onClose={() => setPopUpDeleteOutfit(false)}>
        <DialogContent>
          <Typography variant="h5">Are you sure you want to delete the outfit?</Typography>
          <Stack spacing={7} mt={'7%'} direction="row" display="flex" justifyContent="center" alignItems="center">
            <Button variant="contained" color="primary" onClick={() => setPopUpDeleteOutfit(false)}>
              Cancel
            </Button>
            <Button variant="contained" color="secondary" onClick={() => deleteOutfit()}>
              Yes
            </Button>
          </Stack>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Info;
