import * as React from 'react';
import { useAuth } from '../../context/AuthContext';
import ImageCarousel from '../../components/layout/ImageCarousel';
import PostInfo from './PostInfo';
import { Box, Typography, styled } from '@mui/material';

const Post = ({ outfit }) => {
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
    >
      <PostInfo outfitInit={outfit} />
      {currentUser && (
        <ImageCarousel images={outfit.images} navigateURL={`../account/${outfit.account.id}/outfits/${outfit.id}`} />
      )}
      <Typography variant="subtitle2">{getDate(outfit.creationDate)}</Typography>
    </CustomBox>
  );
};

export default Post;
