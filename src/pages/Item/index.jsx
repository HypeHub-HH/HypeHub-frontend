import { Box } from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';
import { ItemApi } from '../../api/ItemApi';

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

  return (<Box>
    
  </Box>);
};

export default Item;
