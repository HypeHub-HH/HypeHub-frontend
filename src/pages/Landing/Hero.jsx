import * as React from 'react';
import { Box, styled, Typography } from '@mui/material';
import { Container } from '@mui/system';
import JoinImage from '../../assets/image-join.jpg';
import CustomButton from '../../components/ui/CustomButton';

const Hero = ({ setOpenSingUp }) => {
  const CustomBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    gap: theme.spacing(5),
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
    },
  }));
  const CustomImage = styled(Box)(({ theme }) => ({
    borderRadius: '1rem',
    width: '25vw',
    hight: '1vh',
    [theme.breakpoints.down('md')]: {
      width: '80%',
	  borderRadius: '1rem',
    },
  }));
  const Title = styled(Typography)(({ theme }) => ({
    fontSize: '64px',
    color: '#0F172A',
    fontWeight: 'bold',
    margin: theme.spacing(4, 0, 4, 0),
    [theme.breakpoints.down('sm')]: {
      fontSize: '40px',
    },
  }));

  return (
    <Box padding="3%" sx={{ backgroundColor: 'greySecondary.main' }}>
      <Container>
        <CustomBox>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            <Typography
              variant="h4"
              textAlign="center"
              sx={{
                color: '#0F172A',
                fontWeight: '500',
                mt: 5,
              }}
            >
              Welcome to HypeHub
            </Typography>
            <Title variant="h2" textAlign="center">
              Share Your Style with the World
            </Title>
            <Typography variant="body2" sx={{ fontSize: '18px', color: '#5A6473', mb: 5 }} textAlign="center">
              Discover the latest trends, get inspired, and connect with fashion enthusiasts around the globe on HypeHub. Show off your favorite
              outfits, share styling tips, and connect with like-minded individuals who share your passion for fashion!
            </Typography>
            <CustomButton backgroundColor="#0EA5E9" color="secondary" buttonText="Join the Community" onClick={() => setOpenSingUp(true)} />
          </Box>
          <CustomImage component="img" src={JoinImage} alt="Join community image." />
        </CustomBox>
      </Container>
    </Box>
  );
};

export default Hero;
