import * as React from 'react';
import { Box, Container, Typography, styled } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import Add from '../../assets/plus.png';
import Idea from '../../assets/idea.png';
import Heart from '../../assets/heart.png';
import Community from '../../assets/community.png';
import Arrow from '../../assets/right-arrow.png';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';

const Features = () => {
  const ImgContainer = styled(Box)(({ theme }) => ({
    maxWidth: '50%',
    height: 'auto',
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.down('md')]: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
  }));

  const GridIcon = styled(Grid2)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  }));

  const GridText = styled(Grid2)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: '2dvh',
  }));

  const FeaturesText = styled(Typography)(({ theme }) => ({
    fontSize: '64px',
    color: '#000',
    fontWeight: '700',
    [theme.breakpoints.down('md')]: {
      fontSize: '32px',
    },
  }));

  const LargeText = styled(Typography)(({ theme }) => ({
    fontSize: '24px',
    color: '#000',
    fontWeight: '700',
    [theme.breakpoints.down('md')]: {
      fontSize: '12px',
    },
  }));

  return (
    <Box padding="3%" sx={{ backgroundColor: 'greySecondary.main' }}>
      <Container>
        <FeaturesText>Features:</FeaturesText>
        <Grid container display={'flex'} justifyContent={'space-evenly'} alignItems={'center'}>
          <GridIcon xs={2}>
            <ImgContainer component="img" src={Add} alt="Add item image." />
          </GridIcon>
          <GridIcon xs={1}>
            <ImgContainer component="img" src={Arrow} alt="Right arrow image." />
          </GridIcon>
          <GridIcon xs={2}>
            <ImgContainer component="img" src={Idea} alt="Create outfit image." />
          </GridIcon>
          <GridIcon xs={1}>
            <ImgContainer component="img" src={Arrow} alt="Right arrow image." />
          </GridIcon>
          <GridIcon xs={2}>
            <ImgContainer component="img" src={Heart} alt="Like image." />
          </GridIcon>
          <GridIcon xs={1}>
            <ImgContainer component="img" src={Arrow} alt="Right arrow image." />
          </GridIcon>
          <GridIcon xs={2}>
            <ImgContainer component="img" src={Community} alt="Community image." />
          </GridIcon>
        </Grid>
        <Grid container display={'flex'} justifyContent={'space-around'}>
          <GridText xs={2}>
            <LargeText>Add your items</LargeText>
            <Typography align="center">
              It's like having your entire wardrobe at your fingertips, making it easy to keep track of your style
              essentials.
            </Typography>
          </GridText>
          <Grid xs={1}></Grid>
          <GridText xs={2}>
            <LargeText>Create Outfits</LargeText>
            <Typography align="center">
              Express your creativity! Mix and match your wardrobe items to create stylish outfits.
            </Typography>
          </GridText>
          <Grid xs={1}></Grid>
          <GridText xs={2}>
            <LargeText>Express Yourself</LargeText>
            <Typography align="center">
              Share your fashion insights! Post pictures of your outfits, ask for feedback, and write reviews on
              clothing items.
            </Typography>
          </GridText>
          <Grid xs={1}></Grid>
          <GridText xs={2}>
            <LargeText>Connect</LargeText>
            <Typography align="center">
              It's a space where you can build relationships with people who have similar fashion interests and get
              inspired by their style choices.
            </Typography>
          </GridText>
        </Grid>
      </Container>
    </Box>
  );
};

export default Features;
