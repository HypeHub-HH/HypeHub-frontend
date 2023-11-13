import * as React from 'react';
import ItemsTabPanel from '../../components/layout/ItemsTabPanel.jsx';
import { Box, Divider, Typography, Tab, Tabs, styled, Button } from '@mui/material';

const AccountItems = ({ items, accountId }) => {
  const [selectedTab, setSelectedTab] = React.useState(0);
  const [showItems, setShowItems] = React.useState(true);

  const CustomTab = styled(Tab)(({ theme }) => ({
    fontSize: '1.5rem',
    [theme.breakpoints.down('md')]: {
      fontSize: '1rem',
    },
  }));

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        width: '100%',
      }}
    >
      <Divider sx={{ width: '100%' }}>
        <Typography variant="h5" padding="1%">
          Items
        </Typography>
      </Divider>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          width: '100%',
        }}
      >
        <Tabs
          sx={{ padding: '1%', maxWidth: '90%' }}
          value={selectedTab}
          onChange={(event, newValue) => setSelectedTab(newValue)}
          variant="scrollable"
          scrollButtons={false}
        >
          <CustomTab label="All" sx={{ fontSize: '1.5rem' }}></CustomTab>
          <CustomTab label="Torso" sx={{ fontSize: '1.5rem' }}></CustomTab>
          <CustomTab label="Legs" sx={{ fontSize: '1.5rem' }}></CustomTab>
          <CustomTab label="Footwear" sx={{ fontSize: '1.5rem' }}></CustomTab>
          <CustomTab label="Accesories" sx={{ fontSize: '1.5rem' }}></CustomTab>
        </Tabs>
        <Button sx={{ backgroundColor: 'grey', alignSelf: 'flex-end' }} onClick={() => setShowItems(!showItems)}>
          {showItems ? 'Hide Items' : 'Show Items'}
        </Button>
        {showItems && selectedTab === 0 && <ItemsTabPanel items={items} accountId={accountId} />}
        {showItems && selectedTab === 1 && (
          <ItemsTabPanel items={items.filter((data) => data.cloathingType === 0)} accountId={accountId} />
        )}
        {showItems && selectedTab === 2 && (
          <ItemsTabPanel items={items.filter((data) => data.cloathingType === 1)} accountId={accountId} />
        )}
        {showItems && selectedTab === 3 && (
          <ItemsTabPanel items={items.filter((data) => data.cloathingType === 2)} accountId={accountId} />
        )}
        {showItems && selectedTab === 4 && (
          <ItemsTabPanel items={items.filter((data) => data.cloathingType === 3)} accountId={accountId} />
        )}
      </Box>
    </Box>
  );
};

export default AccountItems;
