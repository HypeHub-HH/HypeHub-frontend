import * as React from 'react';
import ImageCropper from './ImageCropper';
import Grid from '@mui/material/Unstable_Grid2';
import { Button, Typography, Box } from '@mui/material';

const SelectedImages = ({ images, deletedImages, setDeletedImages, addedImages, setAddedImages }) => {
  const [selectedImages, setSelectedImages] = React.useState(images);
  let numberOfSelectedImages = selectedImages.length;
  const maxNumberOfImages = 7;

  const handleRemoveImage = (index, image) => {
    const updatedImageUrls = [...selectedImages];
    updatedImageUrls.splice(index, 1);
    setSelectedImages(updatedImageUrls);
    image.id !== 0
      ? setDeletedImages([...deletedImages, image.id])
      : setAddedImages((addedImages) => addedImages.filter((imgUrl) => imgUrl !== image.url));
  };

  return (
    <Box mt={'2%'} width={'100%'}>
      <Box display={'flex'} justifyContent={'space-between'}>
        <Typography variant="h5">Edit images {`(${numberOfSelectedImages}/${maxNumberOfImages})`}</Typography>
      </Box>
      {numberOfSelectedImages < 7 && (
        <ImageCropper
          setSelectedImages={setSelectedImages}
          selectedImages={selectedImages}
          addedImages={addedImages}
          setAddedImages={setAddedImages}
        />
      )}
      <Grid container spacing={2}>
        {selectedImages.map((image, index) => {
          return (
            <Grid md={3} key={index} display={'flex'} justifyContent={'center'} flexDirection={'column'} alignItems={'center'}>
              <Box border={1} component="img" src={image.url} sx={{ width: '50%', hight: 'auto' }}></Box>
              <Button variant="outlined" onClick={() => handleRemoveImage(index, image)}>
                Delete image
              </Button>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default SelectedImages;
