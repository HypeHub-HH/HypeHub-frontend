import * as React from 'react';
import defaultIcon from '../../assets/defaultAccountIcon.png';
import { Container, Typography, Avatar, Stack, styled } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { OutfitApi } from '../../api/OutfitApi';
import Likes from '../../components/ui/Likes';

const PostInfo = ({ outfitInit }) => {
  const navigate = useNavigate();
  const [outfit, setOutfit] = React.useState(outfitInit);
  const [likes, setLikes] = React.useState(null);

  const axiosLikeOrUnlikeOutfitAsync = async (outfitId) => {
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

  return (
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: '2%',
        paddingTop: '3%',
      }}
    >
	  <Likes likes={outfit.likes} setLikes={setLikes} likeOrUnlikeFunc={axiosLikeOrUnlikeOutfitAsync} id={outfit.id}/>
      <Stack
        spacing={1}
        direction="row"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CustomTypography variant="h6" onClick={() => navigate(`../account/${outfit.account.id}`)}>
          {outfit.account.username}
        </CustomTypography>
        <Avatar
          alt="Avatar image."
          src={outfit.account.avatarUrl ? outfit.account.avatarUrl : defaultIcon}
          sx={{ width: 30, height: 30 }}
        />
      </Stack>
    </Container>
  );
};

export default PostInfo;
