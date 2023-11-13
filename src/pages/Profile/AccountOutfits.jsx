import * as React from 'react';
import OutfitTabPanel from '../../components/layout/OutfitTabPanel.jsx';
import { Box, Divider, Typography } from '@mui/material';

const AccountOutfits = ({ outfits, accountId }) => {
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
        <Typography variant="h5" padding="1%">
          Outfits
        </Typography>
      </Divider>
      <OutfitTabPanel outfits={outfits} accountId={accountId}/>
    </Box>
  );
};

export default AccountOutfits;
