import * as React from 'react';
import ImageCarousel from '../../components/layout/ImageCarousel';
import { Container, Typography, Button, Grid } from '@mui/material';

const ItemsToAdd = ({ items, setItems, selectedItems, setSelectedItems, filteredItems }) => {

  const handleAddToOutfit = (item) => {
    setSelectedItems([...selectedItems, item]);
    let index = items.findIndex((i) => i.id === item.id);
    items.splice(index, 1);
    setItems(items);
  };

  return (
    <>
      {filteredItems.length === 0 ? (
        <Typography
          variant="h4"
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            paddingY: '10%',
            fontWeight: 'light',
          }}
        >
          There are no items in this category.
        </Typography>
      ) : (
        <Grid container spacing={6} mt={'1%'}>
          {filteredItems.map((item) => {
            return (
              <Grid
                item
                xs={12}
                md={4}
                key={item.id}
                sx={{ paddingBottom: '8%' }}
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
                <Button variant="contained" color="secondary" sx={{ width: 'auto' }} onClick={() => handleAddToOutfit(item)}>
                  Add to outfit
                </Button>
              </Grid>
            );
          })}
        </Grid>
      )}
    </>
  );
};

export default ItemsToAdd;
