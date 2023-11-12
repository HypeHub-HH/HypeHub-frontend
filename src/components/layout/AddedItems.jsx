import * as React from 'react';
import ImageCarousel from './ImageCarousel';
import { Container, Typography, Button, Grid, Box } from '@mui/material';

const AddedItems = ({ items, setItems, selectedItems, setSelectedItems, filteredItems }) => {
  const handleDeleteFromOutfit = (item) => {
    setItems([...items, item]);
    let index = selectedItems.findIndex((i) => i.id === item.id);
    selectedItems.splice(index, 1);
    setSelectedItems(selectedItems);
  };
  return (
    <>
      {Object.entries(filteredItems).map(([key, value], index) => (
        <Box
          key={index}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
			width:"100%"
          }}
        >
          {value.length !== 0 && (
            <>
              <Typography variant="h6" mt={'2%'} color="grey">
                {key}
              </Typography>
              <Grid container spacing={6}>
                {value.map((item) => (
                  <Grid
                    item
                    xs={12}
                    md={4}
                    key={item.id}
                    sx={{ paddingBottom: '2%' }}
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                  >
                    <Container
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingBottom: '2%',
                        paddingTop: '3%',
                      }}
                    >
                      <Typography variant="h6">{item.name}</Typography>
                    </Container>
                    <ImageCarousel images={item.images} />
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{ width: 'auto' }}
                      onClick={() => handleDeleteFromOutfit(item)}
                    >
                      Delete from outfit
                    </Button>
                  </Grid>
                ))}
              </Grid>
            </>
          )}
        </Box>
      ))}
    </>
  );
};

export default AddedItems;
