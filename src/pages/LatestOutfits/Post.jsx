import * as React from 'react';
import ImageCarousel from '../../components/layout/ImageCarousel.jsx';
import { Box, Typography, styled, Stack } from '@mui/material';
import PostInfo from './PostInfo.jsx';
import { useAuth } from '../../context/AuthContext.js';

const Post = ({ outfit, setOpenLikesPopUp, setLikes }) => {
  const { currentUser } = useAuth();

  const CustomBox = styled(Box)(({ theme }) => ({
    [theme.breakpoints.up('md')]: {
      width: '40%',
    },
  }));

  const getDate = (inputDate) => {
    const date = new Date(inputDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
  };

  return (
    <CustomBox
      key={outfit.id}
      display={'flex'}
      justifyContent={'center'}
      flexDirection={'column'}
      alignItems={'center'}
      paddingBottom={'2%'}
      paddingTop={'2%'}
      maxWidth={'40%'}
    >
      <PostInfo outfitInit={outfit} setOpenLikesPopUp={setOpenLikesPopUp} setLikes={setLikes} />
      {currentUser && (
        <ImageCarousel images={outfit.images} navigateURL={`../account/${currentUser.accountId}/outfits/${outfit.id}`} />
      )}
      <Typography variant="subtitle2">{getDate(outfit.creationDate)}</Typography>
    </CustomBox>
  );
};

export default Post;
