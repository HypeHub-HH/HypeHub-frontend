import * as React from 'react';
import { OutfitApi } from '../../api/OutfitApi.js';
import CustomButton from '../../components/ui/CustomButton.jsx';
import { Container } from '@mui/material';
import LikesPopUp from './LikesPopUp.jsx';
import Post from './Post.jsx';

const LatestOutfits = () => {
  const [openLikesPopUp, setOpenLikesPopUp] = React.useState(false);
  const [likes, setLikes] = React.useState(null);
  const [currPage, setCurrPage] = React.useState(1);
  const [latestOutfits, setLatestOutfits] = React.useState([]);
  const [wasLastList, setWasLastList] = React.useState(false);

  React.useEffect(() => {
    const axiosLatestOutfits = async () => {
      try {
        const response = await OutfitApi.getLatestOutfitsAsync(currPage, 10);
        if (!response.data.hasNext) {
          setWasLastList(true);
        }
        setLatestOutfits([...latestOutfits, ...response.data.entities]);
      } catch (error) {
        console.error(error);
      }
    };
    if (!wasLastList) axiosLatestOutfits();
  }, [currPage]);

  return (
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        paddingBottom: '2%',
        paddingTop: '1%',
      }}
    >
      {likes && <LikesPopUp openLikesPopUp={openLikesPopUp} setOpenLikesPopUp={setOpenLikesPopUp} likes={likes} setLikes={setLikes} />}
      {latestOutfits.map((outfit) => (
        <Post key={outfit.id} outfitInit={outfit} setOpenLikesPopUp={setOpenLikesPopUp} setLikes={setLikes} />
      ))}
      {!wasLastList && <CustomButton backgroundColor="#CBD5E1" color="black" buttonText="Load more" onClick={() => setCurrPage(currPage + 1)} />}
    </Container>
  );
};

export default LatestOutfits;
