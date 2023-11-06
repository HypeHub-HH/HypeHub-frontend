import * as React from 'react';
import { Box, Divider, Typography, Tab, Tabs, styled } from '@mui/material';
import ItemsTabPanel from '../../components/layout/ItemsTabPanel.jsx';

const AccountItems = ({ items }) => {
  const [selectedTab, setSelectedTab] = React.useState(0);

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
        <Typography variant="h5" sx={{ alignSelf: 'flex-start', padding: '1%' }}>
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
        {selectedTab === 0 && <ItemsTabPanel items={items} />}
        {selectedTab === 1 && <ItemsTabPanel items={items.filter((data) => data.cloathingType === 0)} />}
        {selectedTab === 2 && <ItemsTabPanel items={items.filter((data) => data.cloathingType === 1)} />}
        {selectedTab === 3 && <ItemsTabPanel items={items.filter((data) => data.cloathingType === 2)} />}
        {selectedTab === 4 && <ItemsTabPanel items={items.filter((data) => data.cloathingType === 3)} />}
      </Box>
    </Box>
  );
};

export default AccountItems;
