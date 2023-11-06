import { Box,styled } from '@mui/system';
import { useTheme } from '@mui/material/styles';
import React from 'react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import noImage from '../../assets/no-item-image.png';


const ImagesGallery = ({ images }) => {
  const theme = useTheme();
  let imagesURLs = images.map((image) => {
    return {
      original: image.url,
      thumbnail: image.url,
      originalHeight: 500,
      originalWidth: 375,
    };
  });

  const ImageContainer = styled(Box)(
    ({ theme }) => ({
      overflow: 'hidden',
      display: 'block',
    }),
    theme.unstable_sx({
      height: 500,
      width: 375,
    })
  );

  return (
    <Box>
      {images.length > 0 ? (
        <ImageGallery items={imagesURLs} showPlayButton={false} thumbnailPosition={'left'} showBullets={true} />
      ) : (
        <ImageContainer>
          <img src={noImage} alt="noImage" style={{ maxWidth: '100%', maxHeight: '100%' }} />
        </ImageContainer>
      )}
    </Box>
  );
};

export default ImagesGallery;
