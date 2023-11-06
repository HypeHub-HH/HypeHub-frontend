import * as React from 'react';
import { OutfitApi } from '../../api/OutfitApi';
import CustomButton from '../../components/ui/CustomButton';
import { Box, Container } from '@mui/material';
import Post from './Post';

const LatestOutfits = () => {
  const [currPage, setCurrPage] = React.useState(1);
  const [latestOutfits, setLatestOutfits] = React.useState([]);
  const [wasLastList, setWasLastList] = React.useState(false);

  const axiosLatestOutfits = async () => {
    try {
      const response = await OutfitApi.getLatestOutfitsAsync(currPage, 10);
      if (!response.data.hasNext) {
        setWasLastList(true);
      }
      setLatestOutfits((prevOutfits) => [...prevOutfits, ...response.data.entities]);
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
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
        {latestOutfits !== [] &&
          latestOutfits.map((outfit) => (
            <Post key={outfit.id} outfit={outfit} />
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