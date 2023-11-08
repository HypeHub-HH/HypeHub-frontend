import * as React from 'react';
import { Typography, styled, Stack } from '@mui/material';
import { useAuth } from '../../context/AuthContext.js';
import LikesPopUp from '../../components/ui/LikesPopUp.jsx';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

const Likes = ({ likes, setLikes, likeOrUnlikeFunc, id }) => {
  const { currentUser } = useAuth();
  const [openLikesPopUp, setOpenLikesPopUp] = React.useState(false);

  const checkIfLiked = (likes) => likes.some((like) => like.accountId === currentUser.accountId);

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
    <Stack spacing={1} direction="row" display="flex" justifyContent="center" alignItems="center">
      {likes && currentUser && checkIfLiked(likes) ? (
        <CustomFavoriteIcon onClick={() => likeOrUnlikeFunc(id)} />
      ) : (
        <CustomFavoriteBorderIcon onClick={() => likeOrUnlikeFunc(id)} />
      )}
      {likes && (
        <CustomTypography
          variant="h6"
          onClick={() => {
            setLikes(likes);
            setOpenLikesPopUp(true);
          }}
        >
          {likes.length}
        </CustomTypography>
      )}
      {likes && (
        <LikesPopUp openLikesPopUp={openLikesPopUp} setOpenLikesPopUp={setOpenLikesPopUp} likes={likes} setLikes={setLikes} />
      )}
    </Stack>
  );
};

export default Likes;
