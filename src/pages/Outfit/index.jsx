import * as React from 'react';
import { OutfitApi } from '../../api/OutfitApi';
import { useParams } from 'react-router-dom';
import ImagesGallery from '../../components/ui/ImagesGallery';
import Info from './Info';
import ItemsTabPanel from '../../components/layout/ItemsTabPanel';
import { Box, Typography, LinearProgress, Container, Grid, Divider, Tab, Tabs, styled } from '@mui/material';

const Outfit = () => {
  const { accountId, outfitId } = useParams();
  const [selectedTab, setSelectedTab] = React.useState(0);
  const [outfit, setOutfit] = React.useState(null);

  const axiosOutfit = async () => {
    try {
      const response = await OutfitApi.getOutfitWithAccountAndLikesAndImagesAndItemsAsync(outfitId);
      setOutfit(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const CustomTab = styled(Tab)(({ theme }) => ({
    fontSize: '1.5rem',
    [theme.breakpoints.down('md')]: {
      fontSize: '1rem',
    },
  }));

  React.useEffect(() => {
    axiosOutfit();
  }, []);

  return (
    <Box>
      <Container>
        {outfit !== null ? (
          <>
            <Grid container display={'flex'} justifyContent={'space-around'} mt={'4%'} mb="5%">
              <Grid item xs={12} md={6}>
                <ImagesGallery images={outfit.images} />
              </Grid>
              <Grid item xs={12} md={6}>
                <Info outfitInit={outfit} accountId={accountId} />
              </Grid>
            </Grid>
            <Divider>
              <Typography variant="h5" padding="1">
                Items
              </Typography>
            </Divider>

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                width: '100%',
              }}
            >
              <Tabs
                sx={{ padding: '1%', maxWidth: '90%' }}
                value={selectedTab}
                onChange={(event, newValue) => setSelectedTab(newValue)}
                variant="scrollable"
                scrollButtons={false}
              >
                <CustomTab label="All" sx={{ fontSize: '1.5rem' }}></CustomTab>
                <CustomTab label="Torso" sx={{ fontSize: '1.5rem' }}></CustomTab>
                <CustomTab label="Legs" sx={{ fontSize: '1.5rem' }}></CustomTab>
                <CustomTab label="Footwear" sx={{ fontSize: '1.5rem' }}></CustomTab>
                <CustomTab label="Accesories" sx={{ fontSize: '1.5rem' }}></CustomTab>
              </Tabs>
              {selectedTab === 0 && <ItemsTabPanel items={outfit.items} accountId={accountId} />}
              {selectedTab === 1 && (
                <ItemsTabPanel items={outfit.items.filter((data) => data.cloathingType === 0)} accountId={accountId} />
              )}
              {selectedTab === 2 && (
                <ItemsTabPanel items={outfit.items.filter((data) => data.cloathingType === 1)} accountId={accountId} />
              )}
              {selectedTab === 3 && (
                <ItemsTabPanel items={outfit.items.filter((data) => data.cloathingType === 2)} accountId={accountId} />
              )}
              {selectedTab === 4 && (
                <ItemsTabPanel items={outfit.items.filter((data) => data.cloathingType === 3)} accountId={accountId} />
              )}
            </Box>
          </>
        ) : (
          <Box mt={'20%'}>
            <Typography align="center">Loading outfit...</Typography>
            <LinearProgress color="secondary" variant="indeterminate" />
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default Outfit;
