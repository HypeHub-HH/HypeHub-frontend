import React from 'react';
import { Button, Typography, Box } from '@mui/material';
import ImageCropper from './ImageCropper';
import Grid from '@mui/material/Unstable_Grid2';

const SelectedImages = ({ selectedImages, setSelectedImages }) => {
  let numberOfSelectedImages = selectedImages.length;
  const maxNumberOfImages = 7;

  const handleRemoveImage = (index) => {
    const updatedImageUrls = [...selectedImages];
    updatedImageUrls.splice(index, 1);
    setSelectedImages(updatedImageUrls);
  };
  return (
    <Box>
      <Typography variant="h4">Images {`(${numberOfSelectedImages}/${maxNumberOfImages})`}</Typography>
      {numberOfSelectedImages < 7 && <ImageCropper setSelectedImages={setSelectedImages} selectedImages={selectedImages}/>}
      <Grid container spacing={1}>
        {selectedImages.map((image, index) => {
          return (
            <Grid md={3} key={index} display={'flex'} justifyContent={'center'} flexDirection={'column'} alignItems={'center'}>
                <Box component="img" src={image} sx={{ width: '50%', hight: 'auto' }}></Box>
              <Button onClick={() => handleRemoveImage(index)}>Delete image</Button>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default SelectedImages;
