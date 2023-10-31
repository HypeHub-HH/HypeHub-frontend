import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import ImageCarousel from '../../components/layout/ImageCarousel.jsx';
import NoItemsCard from './NoItemsCard';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Grid from '@mui/material/Unstable_Grid2';
import AddItemPopout from './AddItemPopout';
import Alerts from './Alerts';

const ItemsCategoryTabPanel = (props) => {
  const { value, index, items, ...other } = props;
  const [openAddItem, setOpenAddItem] = React.useState(false);
  const [openSuccessAlert, setOpenSuccessAlert] = React.useState(false);
  const [openFailedAlert, setOpenFailedAlert] = React.useState(false);

  const checkIfLiked = (accounts) => accounts.includes('TBD');

  return items.length !== 0 ? (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} {...other}>
      {value === index && (
        <>
          <Grid container spacing={9} mt={'3dvh'}>
            <Grid xs={6} md={3} display={'flex'} justifyContent={'center'} alignItems={'center'}>
              <Button onClick={() => setOpenAddItem(true)} sx={{ fontSize: '1rem', width: '10dvw', height: '10dvw', backgroundColor: '#E6ECF3' }}>
                + add item
              </Button>
            </Grid>
            {items.map((item, index) => {
              return (
                <Grid xs={6} md={3} key={`itemGrid${index}`}>
                  <ImageCarousel images={item.Images} imagesIndex={index}></ImageCarousel>
                  <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                    <Typography>Likes: {item.Likes.length}</Typography>
                    {checkIfLiked(item.Likes) ? (
                      <Button>
                        <FavoriteIcon />
                      </Button>
                    ) : (
                      <Button>
                        <FavoriteBorderIcon />
                      </Button>
                    )}
                  </Box>
                  <Typography variant="h6">{item.Name}</Typography>
                </Grid>
              );
            })}
            {openAddItem && <AddItemPopout openAddItem={openAddItem} setOpenAddItem={setOpenAddItem} />}
          </Grid>
          <Alerts
            openSuccessAlert={openSuccessAlert}
            openFailedAlert={openFailedAlert}
            setOpenSuccessAlert={setOpenSuccessAlert}
            setOpenFailedAlert={setOpenFailedAlert}
          />
        </>
      )}
    </div>
  ) : (
    <>
      <NoItemsCard setOpenAddItem={setOpenAddItem} />
      {openAddItem && <AddItemPopout openAddItem={openAddItem} setOpenAddItem={setOpenAddItem} />}
    </>
  );
};

export default ItemsCategoryTabPanel;
