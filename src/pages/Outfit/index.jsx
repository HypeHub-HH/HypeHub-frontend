import { Box, Button, Typography, LinearProgress } from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';
import { OutfitApi } from '../../api/OutfitApi';
import ImagesGallery from '../../components/ui/ImagesGallery';
import { Container } from '@mui/system';
import Grid from '@mui/material/Unstable_Grid2';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Outfit = () => {
  const { outfitId } = useParams();
  const [outfit, setOutfit] = React.useState(null);
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const axiosOutfit = async () => {
    try {
      const response = await OutfitApi.getOutfitWithAccountAndLikesAndImagesAndItemsAsync(outfitId);
      console.log(response.data);
      setOutfit(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    axiosOutfit();
  }, []);

  return (
    <Box>
      <Container>

      </Container>
    </Box>
  );
};

export default Outfit;
