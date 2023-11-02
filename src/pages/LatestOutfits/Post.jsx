import * as React from 'react';
import ImageCarousel from '../../components/layout/ImageCarousel.jsx';
import { Box, styled } from '@mui/material';
import PostInfo from './PostInfo.jsx';

const Post = ({ outfit, setOpenLikesPopUp, setLikes }) => {
  const CustomBox = styled(Box)(({ theme }) => ({
    [theme.breakpoints.up('md')]: {
      width: '40%',
    },
  }));

  return (
    <CustomBox
      key={outfit.id}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: '2%',
        paddingTop: '2%',
        MaxWidth: '40%',
      }}
    >
      <PostInfo outfitInit={outfit} setOpenLikesPopUp={setOpenLikesPopUp} setLikes={setLikes} />
      {<ImageCarousel images={outfit.images} navigateURL={`../outfits/${outfit.id}`}></ImageCarousel>}
    </CustomBox>
  );
};

export default Post;
