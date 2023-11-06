import * as React from 'react';
import { Box, Container, Tab, Tabs, Button, styled } from '@mui/material';
import ItemsTabPanel from '../../components/layout/ItemsTabPanel';
import { AccountApi } from '../../api/AccountApi';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const Items = () => {
  const navigate = useNavigate();
  const { accountId } = useParams();
  const { currentUser } = useAuth();
  const [selectedTab, setSelectedTab] = React.useState(0);
  const [items, setItems] = React.useState(null);

  const fetchItems = async () => {
    try {
      const response = await AccountApi.getItemsFromAccountAsync(accountId);
      setItems(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    fetchItems();
  }, [accountId]);

  const CustomTab = styled(Tab)(({ theme }) => ({
    fontSize: '1.5rem',
    [theme.breakpoints.down('md')]: {
      fontSize: '1rem',
    },
  }));

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
        <Tabs
          sx={{ padding: '1%', maxWidth: '90%' }}
          value={selectedTab}
          onChange={(event, newValue) => setSelectedTab(newValue)}
          variant="scrollable"
          scrollButtons={false}
        >
          <CustomTab label="All"></CustomTab>
          <CustomTab label="Torso"></CustomTab>
          <CustomTab label="Legs"></CustomTab>
          <CustomTab label="Footwear"></CustomTab>
          <CustomTab label="Accesories"></CustomTab>
        </Tabs>
        {currentUser && currentUser.accountId === accountId && (
          <Button
            sx={{ backgroundColor: '#00FF00', alignSelf: 'flex-end' }}
            onClick={() => navigate(`../account/${currentUser.accountId}/items/addNewItem`)}
          >
            Add Item
          </Button>
        )}
        {items && selectedTab === 0 && <ItemsTabPanel items={items} />}
        {items && selectedTab === 1 && <ItemsTabPanel items={items.filter((data) => data.cloathingType === 0)} />}
        {items && selectedTab === 2 && <ItemsTabPanel items={items.filter((data) => data.cloathingType === 1)} />}
        {items && selectedTab === 3 && <ItemsTabPanel items={items.filter((data) => data.cloathingType === 2)} />}
        {items && selectedTab === 4 && <ItemsTabPanel items={items.filter((data) => data.cloathingType === 3)} />}
      </Container>
    </Box>
  );
};

export default Items;
