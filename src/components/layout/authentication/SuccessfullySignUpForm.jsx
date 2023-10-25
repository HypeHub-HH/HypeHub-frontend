import * as React from 'react';
import CustomButton from '../../ui/CustomButton.jsx';

import { Dialog, DialogContent, Typography } from '@mui/material';

const SuccessfullySignUpForm = ({ successfullySignUp, setSuccessfullySignUp }) => {
  const handleDialogClose = () => setSuccessfullySignUp(false);

  return (
    <Dialog open={successfullySignUp} onClose={handleDialogClose}>
      <DialogContent
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <Typography component="h1" variant="h4" align="center" color={'green'}>
          Thank You!
        </Typography>
        <Typography variant="h6" align="center" mb={'2%'}>
          Congratulations, your account has been successfully created.
        </Typography>
        <CustomButton backgroundColor="green" color="secondary" buttonText="OK" onClick={handleDialogClose} />
      </DialogContent>
    </Dialog>
  );
};

export default SuccessfullySignUpForm;
