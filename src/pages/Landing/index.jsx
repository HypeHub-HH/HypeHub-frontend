import * as React from 'react';
import Footer from '../../components/layout/footer/Footer';
import Hero from './Hero';
import EmailSender from './EmailSender';
import Details from './Details';
import Features from './Features';
import NavbarUnAuthorized from '../../components/layout/navbar/NavbarUnAuthorized.jsx';
import SuccessfullySignUpForm from '../../components/layout/authentication/SuccessfullySignUpForm.jsx';

const Landing = () => {
  const [openSignIn, setOpenSignIn] = React.useState(false);
  const [openSignUp, setOpenSingUp] = React.useState(false);
  const [successfullySignUp, setSuccessfullySignUp] = React.useState(false);

  React.useEffect(()=>{
console.log(process.env.REACT_APP_BACKEND_HOST)
  },[])

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
