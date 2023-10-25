import * as React from 'react';
import { Stack, Toolbar, AppBar } from '@mui/material';
import CustomButton from '../../ui/CustomButton';
import Logo from './Logo';
import LoginForm from '../authentication/LoginForm';
import RegisterForm from '../authentication/RegisterForm';

const NavbarUnAuthorized = () => {
  const [openSignIn, setOpenSignIn] = React.useState(false);
  const [openSignUp, setOpenSingUp] = React.useState(false);

  const handleSignInButton = () => {
    setOpenSignIn(true);
  };

  const handleSignUpButton = () => {
    setOpenSingUp(true);
  };

  return (
    <AppBar position="sticky" color="primary">
      <Toolbar>
        <Logo />
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
          {openSignIn === true && (
            <LoginForm openSignIn={openSignIn} setOpenSignIn={setOpenSignIn} setOpenSignUp={setOpenSingUp} />
          )}
          {openSignUp === true && (
            <RegisterForm openSignUp={openSignUp} setOpenSignUp={setOpenSingUp} setOpenSignIn={setOpenSignIn} />
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default NavbarUnAuthorized;
