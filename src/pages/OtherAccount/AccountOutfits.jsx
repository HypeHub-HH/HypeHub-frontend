import * as React from 'react';
import { Box, Divider, Typography } from '@mui/material';
import OutfitTabPanel from '../../components/layout/OutfitTabPanel.jsx';

const AccountOutfits = ({ outfits }) => {
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
      <OutfitTabPanel outfits={outfits} />
    </Box>
  );
};

export default AccountOutfits;
