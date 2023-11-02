import { Box } from '@mui/system';
import React from 'react'
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

const ImagesGallery = ({images}) => {
  let imagesURLs = images.map((image) => {
    return{
      original: image.url,
      thumbnail: image.url,
      // originalHeight: 400,
      // originalWidth : 300
    }
  })

  const images1 = [
    {
      original: "https://picsum.photos/id/1018/1000/600/",
      thumbnail: "https://picsum.photos/id/1018/250/150/",
    },
    {
      original: "https://picsum.photos/id/1015/1000/600/",
      thumbnail: "https://picsum.photos/id/1015/250/150/",
    },
    {
      original: "https://picsum.photos/id/1019/1000/600/",
      thumbnail: "https://picsum.photos/id/1019/250/150/",
    },
  ];

  return (
    <Box>
      <ImageGallery items ={imagesURLs}
      showPlayButton={false}
      thumbnailPosition={'left'}
      showBullets={true}
      />
    </Box>
  )
}

export default ImagesGallery