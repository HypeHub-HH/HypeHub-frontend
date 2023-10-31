import * as React from 'react';
import { Stack, Toolbar, AppBar, Box } from '@mui/material';
import CustomButton from '../../ui/CustomButton';
import Logo from './Logo';
import LoginForm from '../authentication/LoginForm';
import RegisterForm from '../authentication/RegisterForm';

const NavbarUnAuthorized = ({ openSignIn, setOpenSignIn, openSignUp, setOpenSingUp, setSuccessfullySignUp }) => {
  return (
    <AppBar position="sticky" color="primary">
      <Toolbar>
        <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="center" width="100%">
          <Logo />
          <Stack spacing={3} direction="row" height="">
            <CustomButton backgroundColor="#CBD5E1" color="black" buttonText="SIGN UP" onClick={() => setOpenSingUp(true)} />
            <CustomButton backgroundColor="#0EA5E9" color="black" buttonText="SIGN IN" onClick={() => setOpenSignIn(true)} />
            {openSignIn === true && <LoginForm openSignIn={openSignIn} setOpenSignIn={setOpenSignIn} setOpenSignUp={setOpenSingUp} />}
            {openSignUp === true && (
              <RegisterForm
                openSignUp={openSignUp}
                setOpenSignUp={setOpenSingUp}
                setOpenSignIn={setOpenSignIn}
                setSuccessfullySignUp={setSuccessfullySignUp}
              />
            )}
          </Stack>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavbarUnAuthorized;
