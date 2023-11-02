import * as React from 'react';
import { AccountApi } from '../../api/AccountApi.js';
import { Box, Container } from '@mui/material';
import { useParams } from 'react-router-dom';
import AccountInfo from './AccountInfo.jsx';
import AccountItems from './AccountItems.jsx';
import AccountOutfits from './AccountOutfits.jsx';
import LikesPopUp from '../../components/layout/LikesPopUp.jsx';

const OtherAccount = () => {
  const { accountId } = useParams();
  const [items, setItems] = React.useState(null);
  const [outfits, setOutfits] = React.useState(null);
  const [accountInfo, setAccountInfo] = React.useState(null);
  const [openLikesPopUp, setOpenLikesPopUp] = React.useState(false);
  const [likes, setLikes] = React.useState(null);
  const axiosItems = async () => {
    try {
      const response = await AccountApi.getItemsFromAccountAsync(accountId);
      console.log(response.data);
      setItems(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const axiosOutfits = async () => {
    try {
      const response = await AccountApi.getAccountWithOutfitsAsync(accountId);
      console.log(response.data);
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
  }, []);

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
        {likes && (
          <LikesPopUp openLikesPopUp={openLikesPopUp} setOpenLikesPopUp={setOpenLikesPopUp} likes={likes} setLikes={setLikes} />
        )}
        {accountInfo && <AccountInfo accountInfo={accountInfo} />}
        {items && <AccountItems items={items} setOpenLikesPopUp={setOpenLikesPopUp} setLikes={setLikes} />}
        {outfits && <AccountOutfits outfits={outfits} setOpenLikesPopUp={setOpenLikesPopUp} setLikes={setLikes} />}
      </Container>
    </Box>
  );
};

export default OtherAccount;
