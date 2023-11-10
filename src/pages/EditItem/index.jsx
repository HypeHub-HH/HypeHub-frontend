import React from 'react';
import { useParams } from 'react-router-dom';
import ItemDetails from './ItemDetails';
import { ItemApi } from '../../api/ItemApi';
import { Box, Container } from '@mui/material';

const EditItem = () => {
  const { itemId } = useParams();
  const [fetchedItem, setFetchedItem] = React.useState(null);
  const fetchItem = async () => {
    try {
      const response = await ItemApi.getItemAsync(itemId);
      console.log(response.data);
      setFetchedItem(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    fetchItem();
  }, []);

  return (
    <Box>
      <Container>
        {fetchedItem&&(<ItemDetails fetchedItem={fetchedItem}/>)}
        
      </Container>
    </Box>
  );
};

export default EditItem;
