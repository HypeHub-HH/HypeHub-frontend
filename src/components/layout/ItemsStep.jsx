import * as React from 'react';
import { Container, styled, Tab, Tabs, Typography, Button, Divider } from '@mui/material';
import ItemsToAdd from './ItemsToAdd';
import AddedItems from './AddedItems';

const SelectItems = ({ items, setItems, selectedItems, setSelectedItems }) => {
  const [selectedTab, setSelectedTab] = React.useState(0);
  const [showItems, setShowItems] = React.useState(true);

  const CustomTab = styled(Tab)(({ theme }) => ({
    fontSize: '1.5rem',
    [theme.breakpoints.down('md')]: {
      fontSize: '1rem',
    },
  }));

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Divider sx={{ width: '100%' }}>
        <Typography variant="h5" padding="1%">
          Items to add
        </Typography>
      </Divider>
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
      <Button sx={{ backgroundColor: 'grey', alignSelf: 'flex-end' }} onClick={() => setShowItems(!showItems)}>
        {showItems ? 'Hide Items' : 'Show Items'}
      </Button>
      {showItems && items && (
        <ItemsToAdd
          items={items}
          setItems={setItems}
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
          filteredItems={selectedTab === 0 ? items : items.filter((data) => data.cloathingType === selectedTab - 1)}
        />
      )}
      <Divider sx={{ width: '100%' }}>
        <Typography variant="h5" padding="1%">
          Added items
        </Typography>
      </Divider>
      <AddedItems
        items={items}
        setItems={setItems}
        selectedItems={selectedItems}
        setSelectedItems={setSelectedItems}
        filteredItems={{
          Torso: selectedItems.filter((data) => data.cloathingType === 0),
          Legs: selectedItems.filter((data) => data.cloathingType === 1),
          Footwear: selectedItems.filter((data) => data.cloathingType === 2),
          Accesories: selectedItems.filter((data) => data.cloathingType === 3),
        }}
      />
    </Container>
  );
};

export default SelectItems;
