import { Box} from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';
import { ItemApi } from '../../api/ItemApi';
import ImagesGallery from './ImagesGallery';
import Info from './Info';
import { Container } from '@mui/system';
import Grid from '@mui/material/Unstable_Grid2';


const Item = () => {
  const { itemId } = useParams();
  const [fetchedItem, setFetchedItem] = React.useState(null);

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

  return (
    <>
      {fetchedItem !== null ? (
        <Box>
          <Container>
            <Grid container display={'flex'} justifyContent={'space-around'} mt={"3%"}>
              <Grid xs={12} md={6}>
              <ImagesGallery images={fetchedItem.images} />
              </Grid>
              <Grid xs={12} md={6}>
              <Info item={fetchedItem} setFetchedItem={setFetchedItem}/>
              </Grid>
            </Grid>
          </Container>
        </Box>
      ) : (
        <div>loading</div>
      )}
    </>
  );
};

export default Item;
