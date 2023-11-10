import * as React from 'react';
import { Box } from '@mui/system';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import noImage from '../../assets/no-item-image.png';

const ImagesGallery = ({ images }) => {
  let imagesURLs = images.map((image) => {
    return {
      original: image.url,
      thumbnail: image.url,
      originalHeight: 500,
      originalWidth: 375,
    };
  });

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {images.length > 0 ? (
        <ImageGallery items={imagesURLs} showPlayButton={false} thumbnailPosition={'left'} showBullets={true} />
      ) : (
        <img src={noImage} alt="noImage" style={{ maxWidth: '100%', maxHeight: '100%' }} />
      )}
    </Box>
  );
};

export default ImagesGallery;
