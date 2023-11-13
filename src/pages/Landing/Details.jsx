import * as React from 'react';
import wardrobeImage from '../../assets/wardrobe.jpg';
import { styled, Typography, Box, Container } from '@mui/material';

const Details = () => {
  const CustomBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    gap: theme.spacing(10),
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      textAlign: 'center',
    },
  }));

  const ImgContainer = styled(Box)(({ theme }) => ({
    width: '100%',
    [theme.breakpoints.down('md')]: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
  }));

  const LargeText = styled(Typography)(({ theme }) => ({
    fontSize: '64px',
    color: '#000',
    fontWeight: '700',
    [theme.breakpoints.down('md')]: {
      fontSize: '32px',
    },
  }));

  const SmallText = styled(Typography)(({ theme }) => ({
    fontSize: '18px',
    color: '#7B8087',
    fontWeight: '500',
    [theme.breakpoints.down('md')]: {
      fontSize: '14px',
    },
  }));

  const TextFlexbox = styled(Box)(({ theme }) => ({
    marginTop: theme.spacing(7),
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(0, 5, 0, 5),
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      gap: theme.spacing(5),
    },
  }));

  return (
    <Box padding="3%" sx={{ backgroundColor: 'greySecondary.main' }}>
      <Container>
        <CustomBox>
          <ImgContainer>
            <img src={wardrobeImage} alt="house" style={{ maxWidth: '100%' }} />
          </ImgContainer>
          <Box>
            <Typography
              sx={{
                fontSize: '35px',
                color: '#000339',
                fontWeight: '700',
                my: 3,
              }}
            >
              Discover New Styles
            </Typography>
            <Typography
              sx={{
                fontSize: '16px',
                color: '#5A6473',
                lineHeight: '27px',
              }}
            >
              Explore a wide range of styles and fashion trends shared by the FashionShare community. Get inspired and
              stay ahead of the fashion curve.
            </Typography>
          </Box>
        </CustomBox>

        <TextFlexbox>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <LargeText>5000+</LargeText>
            <SmallText>Users</SmallText>
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <LargeText>13000+</LargeText>
            <SmallText>Outfits</SmallText>
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <LargeText>20000+</LargeText>
            <SmallText>Items</SmallText>
          </Box>
        </TextFlexbox>
      </Container>
    </Box>
  );
};

export default Details;
