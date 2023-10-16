import * as React from 'react';
import { Stack, Box, Toolbar, AppBar } from '@mui/material';
import CustomButton from '../../ui/CustomButton';
import Logo from './Logo';
import Searchbar from './Searchbar';
import AvatarMenu from './AvatarMenu';
import LoginForm from '../authentication/LoginForm';
import RegisterForm from '../authentication/RegisterForm';


const Navbar = () => {
  const [auth, setAuth] = React.useState(false);
  const settings = ['Outfits', 'Items', 'Account', 'Logout'];
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
        {!auth ? (
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
        ) : (
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-around"
            alignItems="center"
            sx={{ flexGrow: 0.1 }}
          >
            <Searchbar />
            <AvatarMenu settings={settings} />
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
