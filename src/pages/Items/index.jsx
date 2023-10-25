import React from 'react';
import { Box, Container, Tab, Tabs } from '@mui/material';
import ItemsCategoryTabPanel from './ItemsCategoryTabPanel';

const Items = () => {
  const [selectedTab, setSelectedTab] = React.useState(0);
  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const data = [
    {
      Id: 1,
      Name: 'bluza1',
      Likes: ["TBD", 13, 14, 32],
      CloathingType: 1,
      Brand: 'Nike',
      Model: 'SuperModel',
      ColorWay: 'Red',
      Price: 100.2,
      PurchaseDate: null,
      Images: ['https://picsum.photos/id/237/200/300'],
    },
    {
      Id: 2,
      Name: 'bluza2',
      Likes: [12, 13, 14, 32],
      CloathingType: 1,
      Brand: 'Nike',
      Model: 'SuperModel',
      ColorWay: 'Red',
      Price: 100.2,
      PurchaseDate: "10-10-2023",
      Images: [
        'https://picsum.photos/id/237/200/300',
        'https://picsum.photos/seed/picsum/200/300',
        'https://picsum.photos/id/237/200/300',
        'https://picsum.photos/id/237/200/300',
      ],
    },
    {
      Id: 3,
      Name: 'bluza3',
      Likes: [12, 13, 14, 32],
      CloathingType: 1,
      Brand: 'Nike',
      Model: 'SuperModel',
      ColorWay: 'Red',
      Price: 100.2,
      PurchaseDate: "10-10-2023",
      Images: ['https://picsum.photos/id/237/200/300', 'https://picsum.photos/seed/picsum/200/300'],
    },
    {
      Id: 4,
      Name: 'bluza4',
      Likes: ["TBD", 13, 14, 32],
      CloathingType: 1,
      Brand: 'Nike',
      Model: 'SuperModel',
      ColorWay: 'Red',
      Price: 100.2,
      PurchaseDate: "10-10-2023",
      Images: ['https://picsum.photos/id/237/200/300', 'https://picsum.photos/seed/picsum/200/300'],
    },
    {
      Id: 5,
      Name: 'bluza5',
      Likes: [12, 13, 14, 32],
      CloathingType: 1,
      Brand: 'Nike',
      Model: 'SuperModel',
      ColorWay: 'Red',
      Price: 100.2,
      PurchaseDate: "10-10-2023",
      Images: ['https://picsum.photos/id/237/200/300', 'https://picsum.photos/seed/picsum/200/300'],
    },
    {
      Id: 6,
      Name: 'bluza6',
      Likes: [12, 13, 14, 32],
      CloathingType: 1,
      Brand: 'Nike',
      Model: 'SuperModel',
      ColorWay: 'Red',
      Price: 100.2,
      PurchaseDate: "10-10-2023",
      Images: ['https://picsum.photos/id/237/200/300', 'https://picsum.photos/seed/picsum/200/300'],
    },
  ];
  
  return (
    <Box>
      <Container>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={selectedTab} onChange={handleChange}>
            <Tab label="Torso" sx={{fontSize: "1.5rem"}}></Tab>
            <Tab label="Legs" sx={{fontSize: "1.5rem"}}></Tab>
            <Tab label="Footwear" sx={{fontSize: "1.5rem"}}></Tab>
            <Tab label="Accesories" sx={{fontSize: "1.5rem"}}></Tab>
          </Tabs>
          {selectedTab === 0 && <ItemsCategoryTabPanel items={data.filter((data) => data.CloathingType == 1)} />}
          {selectedTab === 1 && <ItemsCategoryTabPanel items={data.filter((data) => data.CloathingType == 2)} />}
          {selectedTab === 2 && <ItemsCategoryTabPanel items={data.filter((data) => data.CloathingType == 3)} />}
          {selectedTab === 3 && <ItemsCategoryTabPanel items={data.filter((data) => data.CloathingType == 4)} />}
        </Box>
      </Container>
    </Box>
  );
};

export default Items;
