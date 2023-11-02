import * as React from 'react';
import { OutfitApi } from '../../api/OutfitApi.js';
import CustomButton from '../../components/ui/CustomButton.jsx';
import { Container, Box } from '@mui/material';
import Post from './Post.jsx';

const LatestOutfits = () => {
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
    <Box>
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
        {latestOutfits.map((outfit) => (
          <Post key={outfit.id} outfitInit={outfit} setLikes={setLikes} />
        ))}
        {!wasLastList && (
          <CustomButton
            backgroundColor="#CBD5E1"
            color="black"
            buttonText="Load more"
            onClick={() => setCurrPage(currPage + 1)}
          />
        )}
      </Container>
    </Box>
  );
};

export default LatestOutfits;
