import * as React from 'react';
import defaultIcon from '../../assets/defaultAccountIcon.png';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Container, Typography, Avatar, Stack, styled } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.js';
import { OutfitApi } from '../../api/OutfitApi.js';

const PostInfo = ({ outfitInit, setOpenLikesPopUp, setLikes }) => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [outfit, setOutfit] = React.useState(outfitInit);

  const checkIfLiked = (outfitLikes) => outfitLikes.some((like) => like.accountId === currentUser.accountId);

  const likeOrUnlikeOutfitAsync = (outfitId) => {
    const axiosLikeOrUnlikeOutfitAsync = async () => {
      try {
        const response = await OutfitApi.likeOrUnlikeOutfitAsync(outfitId);
        outfit.likes = response.data;
        setOutfit({ ...outfit });
      } catch (error) {
        console.error(error);
      }
    };
    axiosLikeOrUnlikeOutfitAsync();
  };

  const CustomFavoriteIcon = styled(FavoriteIcon)(({ theme }) => ({
    cursor: 'pointer',
    '&:hover': {
      opacity: '0.5',
    },
  }));
  const CustomFavoriteBorderIcon = styled(FavoriteBorderIcon)(({ theme }) => ({
    cursor: 'pointer',
    '&:hover': {
      opacity: '0.5',
    },
  }));
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
      <Stack
        spacing={1}
        direction="row"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {outfit.likes && currentUser && checkIfLiked(outfit.likes) ? (
          <CustomFavoriteIcon onClick={() => likeOrUnlikeOutfitAsync(outfit.id)} />
        ) : (
          <CustomFavoriteBorderIcon onClick={() => likeOrUnlikeOutfitAsync(outfit.id)} />
        )}
        {outfit.likes && (
          <CustomTypography
            variant="h6"
            onClick={() => {
              setLikes(outfit.likes);
              setOpenLikesPopUp(true);
            }}
          >
            {outfit.likes.length}
          </CustomTypography>
        )}
      </Stack>
      <Stack
        spacing={1}
        direction="row"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
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
  );
};

export default PostInfo;
