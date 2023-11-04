import React, { useEffect } from 'react';
import { Box, Container, Tab, Tabs } from '@mui/material';
import TabPanel from './TabPanel';
import { ItemApi } from '../../api/ItemApi';
import { useAuth } from '../../context/AuthContext';

const Items = () => {
  const [selectedTab, setSelectedTab] = React.useState(0);
  const [fetchedItems, setFetchedItems] = React.useState([]);
  const { currentUser } = useAuth();

  const fetchItems = async () => {
    try {
      const response = await ItemApi.getItems(currentUser.accountId);
      setFetchedItems(response.data);
      console.log(response.data)
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);


  return (
    <Box>
      <Container>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={selectedTab} onChange={(event, newValue)=>setSelectedTab(newValue)}>
            <Tab label="Torso" sx={{ fontSize: '1.5rem' }}></Tab>
            <Tab label="Legs" sx={{ fontSize: '1.5rem' }}></Tab>
            <Tab label="Footwear" sx={{ fontSize: '1.5rem' }}></Tab>
            <Tab label="Accesories" sx={{ fontSize: '1.5rem' }}></Tab>
          </Tabs>
          {selectedTab === 0 && <TabPanel items={fetchedItems.filter((data) => data.cloathingType === 0)} />}
          {selectedTab === 1 && <TabPanel items={fetchedItems.filter((data) => data.cloathingType === 1)} />}
          {selectedTab === 2 && <TabPanel items={fetchedItems.filter((data) => data.cloathingType === 2)} />}
          {selectedTab === 3 && (
            <TabPanel items={fetchedItems.filter((data) => data.cloathingType === 3)} />
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default Items;
