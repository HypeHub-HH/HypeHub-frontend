import { Box, Button, Typography, LinearProgress, Dialog, DialogContent, Stack } from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';
import { ItemApi } from '../../api/ItemApi';
import ImagesGallery from '../../components/ui/ImagesGallery';
import Info from './Info';
import { Container } from '@mui/system';
import Grid from '@mui/material/Unstable_Grid2';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Item = () => {
  const { accountId, itemId } = useParams();
  const [fetchedItem, setFetchedItem] = React.useState(null);
  const [popUpDeleteItem, setPopUpDeleteItem] = React.useState(false);
  const [popUpDeleteItemError, setPopUpDeleteItemError] = React.useState(false);
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const fetchItem = async () => {
    try {
      const response = await ItemApi.getItemAsync(itemId);
      setFetchedItem(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    fetchItem();
  }, []);

  const handleDelete = async () => {
    try {
      if((await ItemApi.CheckIfItemIsInAnyOutfitAsync(fetchedItem.id)).data){
        setPopUpDeleteItemError(true)
        setPopUpDeleteItem(false)
      }
      else{
        const response = await ItemApi.deleteItemAsync(fetchedItem.id);
        navigate(`/account/${currentUser.accountId}/items`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box>
      <Container>
        {fetchedItem ? (
          <>
            <Grid container display={'flex'} justifyContent={'space-around'} mt={'4%'}>
              <Grid xs={12} md={6}>
                <ImagesGallery images={fetchedItem.images} />
              </Grid>
              <Grid xs={12} md={6}>
                <Info item={fetchedItem} setFetchedItem={setFetchedItem} />
              </Grid>
            </Grid>
            {currentUser && currentUser.accountId === accountId && (
              <Box display={'flex'} justifyContent={'flex-end'}>
                <Button variant="contained" onClick={() => setPopUpDeleteItem(true)}>
                  Delete item
                </Button>
                <Button
                  variant="contained"
                  onClick={() => navigate(`/account/${currentUser.accountId}/items/${fetchedItem.id}/edit`)}
                  sx={{ backgroundColor: '#0EA5E9', marginLeft: 1 }}
                >
                  Edit item
                </Button>
              </Box>
            )}
          </>
        ) : (
          <Box mt={'20%'}>
            <Typography align="center">Loading your item...</Typography>
            <LinearProgress color="secondary" variant="indeterminate" />
          </Box>
        )}
        <Dialog open={popUpDeleteItem} onClose={() => setPopUpDeleteItem(false)}>
          <DialogContent>
            <Typography variant="h5">Are you sure you want to delete your item?</Typography>
            <Stack spacing={7} mt={'7%'} direction="row" display="flex" justifyContent="center" alignItems="center">
              <Button variant="contained" color="primary" onClick={() => setPopUpDeleteItem(false)}>
                Cancel
              </Button>
              <Button variant="contained" color="secondary" onClick={() => handleDelete()}>
                Yes
              </Button>
            </Stack>
          </DialogContent>
        </Dialog>
        <Dialog open={popUpDeleteItemError} onClose={() => setPopUpDeleteItemError(false)}>
          <DialogContent>
            <Typography variant="h5">You can't delete an item which is used in your outfit.</Typography>
          </DialogContent>
        </Dialog>
      </Container>
    </Box>
  );
};

export default Item;
