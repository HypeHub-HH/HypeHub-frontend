import * as React from 'react';
import { Box, Container, Tab, Tabs, Button, styled } from '@mui/material';
import OutfitTabPanel from '../../components/layout/OutfitTabPanel';
import { AccountApi } from '../../api/AccountApi';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const Outfits = () => {
  const navigate = useNavigate();
  const { accountId } = useParams();
  const { currentUser } = useAuth();
  const [outfits, setOutfits] = React.useState(null);

  const axiosOutfits = async () => {
    try {
      const response = await AccountApi.getAccountWithOutfitsAsync(accountId);
      setOutfits(response.data.outfits);
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    axiosOutfits();
  }, [accountId]);

  return (
    <Box>
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        {currentUser && currentUser.accountId === accountId && (
          <Button
            sx={{ backgroundColor: '#00FF00', alignSelf: 'flex-end', marginTop: '3%' }}
            onClick={() => navigate(`../account/${currentUser.accountId}/outfits/addNewOutfit`)}
          >
            Add Outfit
          </Button>
        )}
        {outfits && <OutfitTabPanel outfits={outfits} accountId={accountId} />}
      </Container>
    </Box>
  );
};

export default Outfits;
