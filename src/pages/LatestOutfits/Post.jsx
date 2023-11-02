import * as React from 'react';
import ImageCarousel from '../../components/layout/ImageCarousel.jsx';
import defaultIcon from '../../assets/defaultAccountIcon.png';
import { Box, Container, Typography, Avatar, Stack, styled } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { OutfitApi } from '../../api/OutfitApi.js';
import Likes from '../../components/ui/Likes.jsx';

const Post = ({ outfitInit, setLikes }) => {
  const navigate = useNavigate();
  const [outfit, setOutfit] = React.useState(outfitInit);

  const likeOrUnlikeOutfit = async (outfitId) => {
    try {
      const response = await OutfitApi.likeOrUnlikeOutfitAsync(outfitId);
      outfit.likes = response.data;
      setOutfit({ ...outfit });
    } catch (error) {
      console.error(error);
    }
  };
  const CustomTypography = styled(Typography)(({ theme }) => ({
    cursor: 'pointer',
    '&:hover': {
      opacity: '0.5',
    },
  }));
  const CustomBox = styled(Box)(({ theme }) => ({
    [theme.breakpoints.up('md')]: {
      width: '40%',
    },
  }));

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
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingBottom: '2%',
          paddingTop: '3%',
        }}
      >
        <Likes likes={outfit.likes} likeOrUnlikeFunc={likeOrUnlikeOutfit} id={outfit.id} setLikes={setLikes} />
        <Stack spacing={1} direction="row" display="flex" justifyContent="center" alignItems="center">
          <CustomTypography variant="h6" onClick={() => navigate(`../${outfit.account.id}/outfits`)}>
            {outfit.account.username}
          </CustomTypography>
          <Avatar
            alt="Avatar image."
            src={outfit.account.avatarUrl ? outfit.account.avatarUrl : defaultIcon}
            sx={{ width: 30, height: 30 }}
          />
        </Stack>
      </Container>
      {<ImageCarousel images={outfit.images}></ImageCarousel>}
    </CustomBox>
  );
};

export default Post;
