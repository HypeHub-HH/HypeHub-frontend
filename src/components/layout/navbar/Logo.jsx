import * as React from 'react';
import { Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import LogoIcon from '../../../assets/logo-icon.png';

const Logo = () => {
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
    <>
      <LogoImage
        component="img"
        src={LogoIcon}
        alt="Icon logo image."
        borderRadius={'1rem'}
        sx={{ maxWidth: '80%', hight: 'auto' }}
      />
      <LogoName variant="h3" component="div" sx={{ flexGrow: 1 }}>
        HypeHub
      </LogoName>
    </>
  );
};

export default Logo;
