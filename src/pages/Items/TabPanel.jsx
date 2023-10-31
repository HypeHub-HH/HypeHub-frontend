import React from 'react';
import { Box, Typography, Button} from '@mui/material';
import ImageCarousel from './ImageCarousel';
import NoItemsCard from './NoItemsCard';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Grid from '@mui/material/Unstable_Grid2';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';


const ItemsCategoryTabPanel = (props) => {
  const { value, index, items, ...other } = props;
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const checkIfLiked = (accounts) => accounts.some((account) => account.accountId === currentUser.accountId);
  
  return items.length !== 0 ? (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} {...other}>
      <Box display={'flex'} justifyContent={"flex-end"} >
      <Button  sx={{backgroundColor:"#00FF00"}} onClick={()=>navigate(`/myItems/addNewItem`)}>Add Item</Button>
      </Box>
      {value === index && (
        <>
          <Grid container spacing={9} mt={'3dvh'}>
            {items.map((item, index) => {
              return (
                <Grid xs={12} md={4} key={`itemGrid${index}`}>
                  <ImageCarousel imagesForItem={item.images} imagesIndex={index} />
                  <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                    <Typography>Likes: {item.likes.length}</Typography>
                    {checkIfLiked(item.likes) ? (
                      <Button>
                        <FavoriteIcon />
                      </Button>
                    ) : (
                      <Button>
                        <FavoriteBorderIcon />
                      </Button>
                    )}
                  </Box>
                  <Typography variant="h6">{item.name}</Typography>
                </Grid>
              );
            })}
          </Grid>
        </>
      )}
    </div>
  ) : (
    <>
      <NoItemsCard/>
    </>
  );
};

export default ItemsCategoryTabPanel;
