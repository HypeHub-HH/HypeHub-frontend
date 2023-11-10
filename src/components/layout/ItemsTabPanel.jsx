import * as React from 'react';
import { ItemApi } from '../../api/ItemApi';
import { useAuth } from '../../context/AuthContext';
import ImageCarousel from './ImageCarousel';
import TabPanelInfo from './TabPanelInfo';
import { Typography, Grid } from '@mui/material';

const TabPanel = ({ items }) => {
  const { currentUser } = useAuth();

  return (
    <>
      {items.length !== 0 ? (
        <Grid container spacing={6} mt={'1%'} sx={{ maxWidth: '100%' }}>
          {items.map((item) => {
            return (
              <Grid item xs={12} md={4} key={item.id} sx={{ paddingBottom: '8%' }}>
                <TabPanelInfo objectInit={item} likeFun={ItemApi.likeOrUnlikeItemAsync} />
                {currentUser && (
                  <ImageCarousel images={item.images} navigateURL={`../account/${currentUser.accountId}/items/${item.id}`} />
                )}
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
