import * as React from 'react';
import LogoIcon from '../../../assets/logo-icon.png';
import { useAuth } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Typography, Box, styled } from '@mui/material';

const Logo = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const CustomBox = styled(Box)(({ theme }) => ({
    cursor: currentUser ? 'pointer' : 'default',
    '&:hover': {
      opacity: currentUser ? 0.5 : 1,
    },
  }));
  const LogoName = styled(Typography)(({ theme }) => ({
    fontFamily: 'Montserrat Alternates',
    [theme.breakpoints.down('md')]: {
      fontSize: '1rem',
    },
  }));

  const LogoImage = styled(Box)(({ theme }) => ({
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  }));

  return (
    <CustomBox
      display="flex"
      flexDirection="row"
      alignItems="center"
      onClick={() => {
        if (currentUser) navigate('explore');
      }}
    >
      <LogoImage component="img" src={LogoIcon} alt="Icon logo image." borderRadius={'1rem'} sx={{ maxWidth: '80%', hight: 'auto' }} />
      <LogoName variant="h3" component="div" sx={{ flexGrow: 1 }}>
        HypeHub
      </LogoName>
    </CustomBox>
  );
};

export default Logo;
