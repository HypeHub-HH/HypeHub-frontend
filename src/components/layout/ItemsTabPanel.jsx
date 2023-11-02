import React from 'react';
import { Typography } from '@mui/material';
import ImageCarousel from './ImageCarousel';
import Grid from '@mui/material/Unstable_Grid2';
import { useAuth } from '../../context/AuthContext';
import TabPanelInfo from './TabPanelInfo';
import { ItemApi } from '../../api/ItemApi.js';

const TabPanel = ({ items, setOpenLikesPopUp, setLikes }) => {
  const { currentUser } = useAuth();

  return (
    <>
      {items.length !== 0 ? (
        <Grid container spacing={6} mt={'1%'} sx={{ maxWidth: '100%' }}>
          {items.map((item) => {
            return (
              <Grid xs={12} md={4} key={item.id} sx={{ paddingBottom: '8%' }}>
                <TabPanelInfo
                  objectInit={item}
                  setOpenLikesPopUp={setOpenLikesPopUp}
                  setLikes={setLikes}
                  likeFun={ItemApi.likeOrUnlikeItemAsync}
                />
                <ImageCarousel
                  images={item.images}
                  navigateURL={`../account/${currentUser.accountId}/items/${item.id}`}
                  likeFun={ItemApi.likeOrUnlikeItemAsync}
                />
              </Grid>
            );
          })}
        </Grid>
      ) : (
        <Typography
          variant="h4"
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            paddingY: '10%',
            fontWeight: 'light',
          }}
        >
          There are no items in this category.
        </Typography>
      )}
    </>
  );
};

export default TabPanel;
