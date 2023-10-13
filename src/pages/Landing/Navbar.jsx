import * as React from 'react';
import { Stack, Typography, Box, Toolbar, AppBar } from '@mui/material';
import LogoIcon from '../../assets/logo-icon.png';
import styled from '@emotion/styled';
import CustomButton from '../../components/ui/CustomButton';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

export default function Navbar() {
  const [openSignIn, setOpenSignIn] = React.useState(false);
  const [openSignUp, setOpenSingUp] = React.useState(false);

  const handleSignInButton = () => {
    setOpenSignIn(true);
  };

  const handleSignUpButton = () => {
    setOpenSingUp(true);
  };

  const LogoName = styled(Typography)(({ theme }) => ({
    fontFamily: 'Montserrat Alternates',
    [theme.breakpoints.down('md')]: {
      fontSize: '1rem',
    },
  }));

  const Test = styled(Box)(({ theme }) => ({
    fontFamily: 'Montserrat Alternates',
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  }));

  return (
    <AppBar position="sticky" color="primary">
      <Toolbar>
        <Test
          component="img"
          src={LogoIcon}
          alt="Icon logo image."
          borderRadius={'1rem'}
          sx={{ maxWidth: '80%', hight: 'auto' }}
        />
        <LogoName variant="h3" component="div" sx={{ flexGrow: 1 }}>
          HypeHub
        </LogoName>
        <Stack spacing={3} direction="row">
          <CustomButton
            backgroundColor="#CBD5E1"
            color="black"
            buttonText="SIGN UP"
            breakpointWidth="3dvw"
            breakpointHeight="3dvh"
            onClick={handleSignUpButton}
          />
          <CustomButton
            backgroundColor="#0EA5E9"
            color="black"
            buttonText="SIGN IN"
            breakpointWidth="3dvw"
            breakpointHeight="3dvh"
            onClick={handleSignInButton}
          />
        </Stack>
      </Toolbar>
      {openSignIn === true && (
        <LoginForm openSignIn={openSignIn} setOpenSignIn={setOpenSignIn} setOpenSignUp={setOpenSingUp} />
      )}
      {openSignUp === true && (
        <RegisterForm openSignUp={openSignUp} setOpenSignUp={setOpenSingUp} setOpenSignIn={setOpenSignIn} />
      )}
    </AppBar>
  );
}
