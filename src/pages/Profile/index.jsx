import * as React from 'react';
import { AccountApi } from '../../api/AccountApi.js';
import { Box, Container,LinearProgress,Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import AccountInfo from './AccountInfo.jsx';
import AccountItems from './AccountItems.jsx';
import AccountOutfits from './AccountOutfits.jsx';

const Profile = () => {
  const { accountId } = useParams();
  const [items, setItems] = React.useState(null);
  const [outfits, setOutfits] = React.useState(null);
  const [accountInfo, setAccountInfo] = React.useState(null);
  const [numberOfItems, setNumberOfItems] = React.useState(null);
  const [numberOfOutfits, setNumberOfOutfits] = React.useState(null);
  const [numberOfItemsLikes, setNumberOfItemsLikes] = React.useState(null);
  const [numberOfOutfitsLikes, setNumberOfOutfitsLikes] = React.useState(null);

  const axiosItems = async () => {
    try {
      const response = await AccountApi.getItemsFromAccountAsync(accountId);
      setItems(response.data);
      setNumberOfItems(response.data.length)
      setNumberOfItemsLikes(response.data.reduce((sum, obj) => sum + obj.likes.length, 0))
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
      setNumberOfOutfits(response.data.outfits.length)
      setNumberOfOutfitsLikes(response.data.outfits.reduce((sum, obj) => sum + obj.likes.length, 0))
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
        {accountInfo && items && outfits ? (
          <>
          <AccountInfo accountInfo={accountInfo} numberOfItems={numberOfItems} numberOfItemsLikes={numberOfItemsLikes} numberOfOutfits={numberOfOutfits} numberOfOutfitsLikes={numberOfOutfitsLikes}/>
          <AccountItems items={items} accountId={accountId} />
          <AccountOutfits outfits={outfits} accountId={accountId} />
          </>
        ) : (
          <Box mt={'20%'}>
            <Typography align="center">Loading account...</Typography>
            <LinearProgress color="secondary" variant="indeterminate" />
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default Profile;
