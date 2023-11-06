import * as React from 'react';
import Footer from '../../components/layout/footer/Footer';
import Hero from './Hero';
import EmailSender from './EmailSender';
import Details from './Details';
import Features from './Features';
import NavbarUnAuthorized from '../../components/layout/navbar/NavbarUnAuthorized';
import SuccessfullySignUpForm from '../../components/layout/authentication/SuccessfullySignUpForm';

const Landing = () => {
  const [openSignIn, setOpenSignIn] = React.useState(false);
  const [openSignUp, setOpenSingUp] = React.useState(false);
  const [successfullySignUp, setSuccessfullySignUp] = React.useState(false);

  return (
    <>
      <NavbarUnAuthorized
        openSignIn={openSignIn}
        setOpenSignIn={setOpenSignIn}
        openSignUp={openSignUp}
        setOpenSingUp={setOpenSingUp}
        setSuccessfullySignUp={setSuccessfullySignUp}
      />
      <SuccessfullySignUpForm successfullySignUp={successfullySignUp} setSuccessfullySignUp={setSuccessfullySignUp} />
      <Hero setOpenSingUp={setOpenSingUp} />
      <Features />
      <Details />
      <EmailSender />
      <Footer />
    </>
  );
};

export default Landing;
