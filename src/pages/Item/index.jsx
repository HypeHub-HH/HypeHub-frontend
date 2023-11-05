import { Box, Button, Typography, LinearProgress } from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';
import { ItemApi } from '../../api/ItemApi';
import ImagesGallery from './ImagesGallery';
import Info from './Info';
import { Container } from '@mui/system';
import Grid from '@mui/material/Unstable_Grid2';
import { useNavigate } from 'react-router-dom';

const Item = () => {
  const { itemId } = useParams();
  const [fetchedItem, setFetchedItem] = React.useState(null);
  const navigate = useNavigate();

  const fetchItem = async () => {
    try {
      const response = await ItemApi.getItem(itemId);
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
      const response = await ItemApi.deleteItem(fetchedItem.id);
      navigate(`/myItems`);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Box>
      <Container>
        {fetchedItem !== null ? (
          <>
            <Grid container display={'flex'} justifyContent={'space-around'} mt={'3%'}>
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
            </Box>
          </>
        ) : (
          <Box mt={'20%'}>
            <Typography align="center">Loading your item...</Typography>
            <LinearProgress color="secondary" variant="indeterminate" />
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default Item;
