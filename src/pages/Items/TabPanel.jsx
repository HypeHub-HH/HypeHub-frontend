import React from 'react';
import { Box, Typography, Button,Link } from '@mui/material';
import ImageCarousel from '../../components/layout/ImageCarousel'
import NoItemsCard from './NoItemsCard';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Grid from '@mui/material/Unstable_Grid2';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ItemApi } from '../../api/ItemApi';

const TabPanel = (props) => {
  const { value, index, items, ...other } = props;
  const { currentUser } = useAuth();

  const navigate = useNavigate();

  const likeOrUnlikeItem = async (itemId) => {
    try {
      const response = await ItemApi.likeOrUnlikeItem(itemId);
    } catch (error) {
      console.error(error);
    }
  };

  const checkIfLiked = (accounts) => accounts.some((account) => account.accountId === currentUser.accountId);

  return items.length !== 0 ? (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} {...other}>
      <Box display={'flex'} justifyContent={'flex-end'}>
        <Button sx={{ backgroundColor: '#00FF00' }} onClick={() => navigate(`/myItems/addNewItem`)}>
          Add Item
        </Button>
      </Box>
      {value === index && (
        <>
          <Grid container spacing={9} mt={'3dvh'}>
            {items.map((item, index) => {
              return (
                <Grid xs={12} md={4} key={`itemGrid${index}`}>
                  <ImageCarousel images={item.images}/>
                  <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                    <Typography>Likes: {item.likes.length}</Typography>
                    {checkIfLiked(item.likes) ? (
                      <Button onClick={()=>likeOrUnlikeItem(item.id)}>
                        <FavoriteIcon />
                      </Button>
                    ) : (
                      <Button onClick={()=>likeOrUnlikeItem(item.id)}>
                        <FavoriteBorderIcon />
                      </Button>
                    )}
                  </Box>
                  <Link href={`/myItems/${item.id}`}>
                  <Typography variant="h6">{item.name}</Typography>
                  </Link>
                </Grid>
              );
            })}
          </Grid>
        </>
      )}
    </div>
  ) : (
      <NoItemsCard/>
  );
};

export default TabPanel;
