import React, { useEffect } from 'react';
import { Box, Container, Tab, Tabs, Button, styled } from '@mui/material';
import ItemsTabPanel from '../../components/layout/ItemsTabPanel';
import { AccountApi } from '../../api/AccountApi.js';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import LikesPopUp from '../../components/layout/LikesPopUp.jsx';

const Items = () => {
  const navigate = useNavigate();
  const { accountId } = useParams();
  const { currentUser } = useAuth();
  const [selectedTab, setSelectedTab] = React.useState(0);
  const [items, setItems] = React.useState(null);
  const [openLikesPopUp, setOpenLikesPopUp] = React.useState(false);
  const [likes, setLikes] = React.useState(null);

  const fetchItems = async () => {
    try {
      const response = await AccountApi.getItemsFromAccountAsync(currentUser.accountId);
      setItems(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

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
        {likes && (
          <LikesPopUp openLikesPopUp={openLikesPopUp} setOpenLikesPopUp={setOpenLikesPopUp} likes={likes} setLikes={setLikes} />
        )}
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
        {currentUser.accountId === accountId && (
          <Button
            sx={{ backgroundColor: '#00FF00', alignSelf: 'flex-end' }}
            onClick={() => navigate(`../account/${currentUser.accountId}/items/addNewItem`)}
          >
            Add Item
          </Button>
        )}
        {items && selectedTab === 0 && <ItemsTabPanel items={items} setOpenLikesPopUp={setOpenLikesPopUp} setLikes={setLikes} />}
        {items && selectedTab === 1 && (
          <ItemsTabPanel
            items={items.filter((data) => data.cloathingType === 0)}
            setOpenLikesPopUp={setOpenLikesPopUp}
            setLikes={setLikes}
          />
        )}
        {items && selectedTab === 2 && (
          <ItemsTabPanel
            items={items.filter((data) => data.cloathingType === 1)}
            setOpenLikesPopUp={setOpenLikesPopUp}
            setLikes={setLikes}
          />
        )}
        {items && selectedTab === 3 && (
          <ItemsTabPanel
            items={items.filter((data) => data.cloathingType === 2)}
            setOpenLikesPopUp={setOpenLikesPopUp}
            setLikes={setLikes}
          />
        )}
        {items && selectedTab === 4 && (
          <ItemsTabPanel
            items={items.filter((data) => data.cloathingType === 3)}
            setOpenLikesPopUp={setOpenLikesPopUp}
            setLikes={setLikes}
          />
        )}
      </Container>
    </Box>
  );
};

export default Items;
