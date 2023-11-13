import { Box, Button, Typography, LinearProgress, Dialog, DialogContent } from '@mui/material';
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
  const { itemId } = useParams();
  const [fetchedItem, setFetchedItem] = React.useState(null);
  const [openSuccesDeleteDialog, setOpenSuccesDeleteDialog] = React.useState(false);
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
      await ItemApi.deleteItemAsync(fetchedItem.id);
      setOpenSuccesDeleteDialog(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDialogClose = () => {
    setOpenSuccesDeleteDialog(false);
    navigate(`/account/${currentUser.accountId}/items`);
  };

  return (
    <Box>
      <Container>
        {fetchedItem !== null ? (
          <>
            <Grid container display={'flex'} justifyContent={'space-around'} mt={'4%'}>
              <Grid xs={12} md={6}>
                <ImagesGallery images={fetchedItem.images} />
              </Grid>
              <Grid xs={12} md={6}>
                <Info item={fetchedItem} setFetchedItem={setFetchedItem} />
              </Grid>
            </Grid>
            <Box display={'flex'} justifyContent={'flex-end'}>
              <Button variant="contained" onClick={() => handleDelete()}>
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
          </>
        ) : (
          <Box mt={'20%'}>
            <Typography align="center">Loading your item...</Typography>
            <LinearProgress color="secondary" variant="indeterminate" />
          </Box>
        )}
        <Dialog open={openSuccesDeleteDialog} onClose={() => handleDialogClose()}>
          <DialogContent
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            <Typography component="h1" variant="h4" align="center" color={'green'}>
              Successfully deleted!
            </Typography>
            <Button variant="contained" color="success" onClick={() => handleDialogClose()}>
              Go to items
            </Button>
          </DialogContent>
        </Dialog>
      </Container>
    </Box>
  );
};

export default Item;
