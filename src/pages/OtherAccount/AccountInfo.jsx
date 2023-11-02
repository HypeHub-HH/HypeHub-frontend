import * as React from 'react';
import { AccountApi } from '../../api/AccountApi.js';
import { ItemApi } from '../../api/ItemApi.js';
import { Box, Container, Avatar, Typography, Stack } from '@mui/material';
import { useParams } from 'react-router-dom';
import defaultIcon from '../../assets/defaultAccountIcon.png';

const AccountInfo = ({ accountInfo }) => {
  //   const { accountId } = useParams();
  //   const [items, setItems] = React.useState(null);
  //   const [outfits, setOutfits] = React.useState(null);
  //   const [accountInfo, setAccountInfo] = React.useState(null);

  return (
    <Stack
        spacing={2}
        direction="row"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
		  padding:"2%",
        }}
      >
		<Typography variant="h4" >
          {accountInfo.username}
        </Typography>
      <Avatar
          alt="Avatar image."
          src={accountInfo.avatarUrl ? accountInfo.avatarUrl : defaultIcon}
          sx={{ width: 75, height: 75 }}
        />
    </Stack>
  );
};

export default AccountInfo;
