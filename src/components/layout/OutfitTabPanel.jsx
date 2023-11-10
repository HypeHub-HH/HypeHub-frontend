import * as React from 'react';
import TabPanelInfo from './TabPanelInfo';
import ImageCarousel from './ImageCarousel';
import { OutfitApi } from '../../api/OutfitApi';
import Grid from '@mui/material/Unstable_Grid2';
import { useAuth } from '../../context/AuthContext';

const OutfitTabPanel = ({ outfits, accountId }) => {
  const { currentUser } = useAuth();

  return (
    <Grid container spacing={6} mt={'1%'} sx={{ maxWidth: '100%' }}>
      {outfits.map((outfit) => {
        return (
          <Grid xs={12} md={4} key={outfit.id} sx={{ paddingBottom: '8%' }}>
            <TabPanelInfo objectInit={outfit} likeFun={OutfitApi.likeOrUnlikeOutfitAsync} />
            {currentUser && (
              <ImageCarousel images={outfit.images} navigateURL={`../account/${accountId}/outfits/${outfit.id}`} />
            )}
          </Grid>
        );
      })}
    </Grid>
  );
};

export default OutfitTabPanel;
