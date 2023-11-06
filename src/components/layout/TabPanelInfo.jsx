import * as React from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Container, Typography, Stack, styled } from '@mui/material';
import { useAuth } from '../../context/AuthContext.js';

const ItemTabPanelInfo = ({ objectInit, setOpenLikesPopUp, setLikes, likeFun }) => {
  const { currentUser } = useAuth();
  const [object, setObject] = React.useState(objectInit);

  const checkIfLiked = (itemLikes) => itemLikes.some((like) => like.accountId === currentUser.accountId);

  const axiosLikeOrUnlikeObjectAsync = async (objectId) => {
    try {
      const response = await likeFun(objectId);
      console.log(response);
      object.likes = response.data;
      setObject({ ...object });
    } catch (error) {
      console.error(error);
    }
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
        {object.likes && currentUser && checkIfLiked(object.likes) ? (
          <CustomFavoriteIcon onClick={() => axiosLikeOrUnlikeObjectAsync(object.id)} />
        ) : (
          <CustomFavoriteBorderIcon onClick={() => axiosLikeOrUnlikeObjectAsync(object.id)} />
        )}
        {object.likes && (
          <CustomTypography
            variant="h6"
            onClick={() => {
              setLikes(object.likes);
              setOpenLikesPopUp(true);
            }}
          >
            {object.likes.length}
          </CustomTypography>
        )}
      </Stack>
      <Typography variant="h6">{object.name}</Typography>
    </Container>
  );
};

export default ItemTabPanelInfo;
