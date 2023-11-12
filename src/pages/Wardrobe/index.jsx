import * as React from 'react';
import { AccountApi } from '../../api/AccountApi.js';
import { Box, Container } from '@mui/material';
import { useParams } from 'react-router-dom';
import AccountInfo from './AccountInfo.jsx';
import AccountItems from './AccountItems.jsx';
import AccountOutfits from './AccountOutfits.jsx';

const OtherAccount = () => {
  const { accountId } = useParams();
  const [items, setItems] = React.useState(null);
  const [outfits, setOutfits] = React.useState(null);
  const [accountInfo, setAccountInfo] = React.useState(null);

  const axiosItems = async () => {
    try {
      const response = await AccountApi.getItemsFromAccountAsync(accountId);
      setItems(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const axiosOutfits = async () => {
    try {
      const response = await AccountApi.getAccountWithOutfitsAsync(accountId);
      setOutfits(response.data.outfits);
      setAccountInfo({
        id: response.data.id,
        username: response.data.username,
        avatarUrl: response.data.avatarUrl,
      });
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    axiosItems();
    axiosOutfits();
  }, [accountId]);

  return (
    <Box sx={{ width: '100%' }}>
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        {accountInfo && <AccountInfo accountInfo={accountInfo} />}
        {items && <AccountItems items={items} accountId={accountId} />}
        {outfits && <AccountOutfits outfits={outfits} accountId={accountId} />}
      </Container>
    </Box>
  );
};

export default OtherAccount;
