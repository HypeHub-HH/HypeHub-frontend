import * as React from 'react';
import { AccountApi } from '../../api/AccountApi.js';
import { ItemApi } from '../../api/ItemApi.js';
import { Box, Container, Divider, Typography } from '@mui/material';
import OutfitTabPanel from '../../components/layout/OutfitTabPanel.jsx';

const AccountOutfits = ({ outfits, setOpenLikesPopUp, setLikes }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        width: '100%',
      }}
    >
      <Divider sx={{ width: '100%' }}>
        <Typography variant="h5" sx={{ alignSelf: 'flex-start', padding: '1%' }}>
          Outfits
        </Typography>
      </Divider>
      <OutfitTabPanel outfits={outfits} setOpenLikesPopUp={setOpenLikesPopUp} setLikes={setLikes} />
    </Box>
  );
};

export default AccountOutfits;
