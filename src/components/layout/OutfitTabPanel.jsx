import React from 'react';
import ImageCarousel from './ImageCarousel';
import Grid from '@mui/material/Unstable_Grid2';
import { useAuth } from '../../context/AuthContext';
import TabPanelInfo from './TabPanelInfo';
import { OutfitApi } from '../../api/OutfitApi';

const OutfitTabPanel = ({ outfits, setOpenLikesPopUp, setLikes }) => {
  const { currentUser } = useAuth();

  return (
    <Grid container spacing={6} mt={'1%'} sx={{ maxWidth: '100%' }}>
      {outfits.map((outfit) => {
        return (
          <Grid xs={12} md={4} key={outfit.id} sx={{ paddingBottom: '8%' }}>
            <TabPanelInfo
              objectInit={outfit}
              setOpenLikesPopUp={setOpenLikesPopUp}
              setLikes={setLikes}
              likeFun={OutfitApi.likeOrUnlikeOutfitAsync}
            />
            {currentUser && (
              <ImageCarousel
                images={outfit.images}
                navigateURL={`../account/${currentUser.accountId}/outfits/${outfit.id}`}
                likeFun={OutfitApi.likeOrUnlikeOutfitAsync}
              />
            )}
          </Grid>
        );
      })}
    </Grid>
  );
};

export default OutfitTabPanel;
