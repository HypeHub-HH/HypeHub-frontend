import * as React from 'react';
import Add from '../../assets/plus.png';
import Idea from '../../assets/idea.png';
import Heart from '../../assets/heart.png';
import Community from '../../assets/community.png';
import Arrow from '../../assets/right-arrow.png';
import Grid from '@mui/material/Unstable_Grid2';
import { Box, Container, Typography, styled } from '@mui/material';

const Features = () => {
  const ImgContainer = styled(Box)(({ theme }) => ({
    maxWidth: '60%',
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.down('md')]: {
      maxWidth: '30%',
    },
  }));

  const GridIcon = styled(Grid)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  }));

  const GridText = styled(Grid)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: '2dvh',
    [theme.breakpoints.down('md')]: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
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
    fontSize: '23px',
    color: '#000',
    fontWeight: '700',
    [theme.breakpoints.down('md')]: {
      fontSize: '20px',
    },
  }));

  return (
    <Box padding="3%" sx={{ backgroundColor: 'greySecondary.main' }}>
      <Container>
        <FeaturesText>Features:</FeaturesText>
        <Grid container display={'flex'} justifyContent={'space-evenly'} alignItems={'flex-start'} spacing={2}>
          <GridIcon xs={12} md={2}>
            <ImgContainer component="img" src={Add} alt="Add item image." />
            <LargeText>Add your items</LargeText>
            <Typography align="center">
              It's like having your entire wardrobe at your fingertips, making it easy to keep track of your style
              essentials.
            </Typography>
          </GridIcon>
          <GridIcon xs={0} md={1}>
            <ImgContainer component="img" src={Arrow} alt="Right arrow image." />
          </GridIcon>
          <GridIcon xs={12} md={2}>
            <ImgContainer component="img" src={Idea} alt="Create outfit image." />
            <LargeText>Create Outfits</LargeText>
            <Typography align="center">
              Express your creativity! Mix and match your wardrobe items to create stylish outfits.
            </Typography>
          </GridIcon>
          <GridIcon xs={0} md={1}>
            <ImgContainer component="img" src={Arrow} alt="Right arrow image." />
          </GridIcon>
          <GridIcon xs={12} md={2}>
            <ImgContainer component="img" src={Heart} alt="Like image." />
            <LargeText>Express Yourself</LargeText>
            <Typography align="center">
              Share your fashion insights! Post pictures of your outfits, ask for feedback, and write reviews on
              clothing items.
            </Typography>
          </GridIcon>
          <GridIcon xs={0} md={1}>
            <ImgContainer component="img" src={Arrow} alt="Right arrow image." />
          </GridIcon>
          <GridIcon xs={12} md={2}>
            <ImgContainer component="img" src={Community} alt="Community image." />
            <LargeText>Connect</LargeText>
            <Typography align="center">
              It's a space where you can build relationships with people who have similar fashion interests and get
              inspired by their style choices.
            </Typography>
          </GridIcon>
        </Grid>
        <Grid container display={'flex'} justifyContent={'space-around'}>
        </Grid>
      </Container>
    </Box>
  );
};

export default Features;
