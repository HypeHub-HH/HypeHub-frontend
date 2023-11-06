import * as React from 'react';
import Likes from '../ui/Likes';
import { Container, Typography } from '@mui/material';

const TabPanelInfo = ({ objectInit, likeFun }) => {
  const [object, setObject] = React.useState(objectInit);
  const [likes, setLikes] = React.useState(null);

  const axiosLikeOrUnlikeObjectAsync = async (objectId) => {
    try {
      const response = await likeFun(objectId);
      object.likes = response.data;
      setObject({ ...object });
    } catch (error) {
      console.error(error);
    }
  };

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
      <Likes likes={object.likes} likeOrUnlikeFunc={axiosLikeOrUnlikeObjectAsync} id={object.id} setLikes={setLikes} />
      <Typography variant="h6">{object.name}</Typography>
    </Container>
  );
};

export default TabPanelInfo;
