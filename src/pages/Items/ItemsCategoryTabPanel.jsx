import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import ImageCarousel from './ImageCarousel';
import NoItemsCard from './NoItemsCard';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Grid from '@mui/material/Unstable_Grid2';
import AddItemPopout from './AddItemPopout';

const ItemsCategoryTabPanel = (props) => {
  const { value, index, items, ...other } = props;
  const [openAddItem, setOpenAddItem] = React.useState(false);

  return items.length !== 0 ? (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} {...other}>
      {value === index && (
        <>
        <Grid container spacing={9} mt={"3dvh"}>
          <Grid xs={6} md={3} display={"flex"} justifyContent={"center"} alignItems={"center"}>
            <Button onClick={()=>setOpenAddItem(true)}sx={{fontSize:"1rem", width:"10dvw" , height:"10dvw", backgroundColor:"#E6ECF3"}}>+ add item</Button>
          </Grid>
          {items.map((item, index) => {
            return (
              <Grid xs={6} md={3} key={`itemGrid${index}`}>
                <ImageCarousel imagesForItem={item.Images} imagesIndex={index}></ImageCarousel>
                <Box display={'flex'} justifyContent={"space-between"} alignItems={'center'}>
                <Typography>Likes: {item.Likes.length}</Typography>
                  <Button>
                    <FavoriteBorderIcon />
                  </Button>
                </Box>
                <Typography variant="h6">{item.Name}</Typography>
                {/* <Typography>{item.Brand !== null ? `Brand: ${item.Model}` : 'Brand: no data'}</Typography>
                <Typography>{item.Model !== null ? `Model: ${item.Model}` : 'Model: no data'}</Typography>
                <Typography>{item.ColorWay !== null ? `Colorway: ${item.Price}` : 'Colorway: no data'}</Typography>
                <Typography>{item.Price !== null ? `Price: ${item.Price}` : 'Price: no data'}</Typography>
                <Typography>{item.PurchaseDate !== null ? `Date of purchase: ${item.PurchaseDate}` : 'Date of purchase: no data'}</Typography> */}
              </Grid>
              
            );
          })}
          {openAddItem&&(<AddItemPopout openAddItem={openAddItem} setOpenAddItem={setOpenAddItem} />)}
        </Grid>
        </>
      )}
    </div>
  ) : (
    <NoItemsCard />
  );
};

export default ItemsCategoryTabPanel;
