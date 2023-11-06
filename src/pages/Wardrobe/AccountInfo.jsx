import * as React from 'react';
import {  Avatar, Typography, Stack } from '@mui/material';
import defaultIcon from '../../assets/defaultAccountIcon.png';

const AccountInfo = ({ accountInfo }) => {
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
