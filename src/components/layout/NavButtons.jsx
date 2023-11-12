import * as React from 'react';
import { Button, Stack } from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const NavButtons = ({ activeStep, setActiveStep, steps, handleNext }) => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  return (
    <Stack spacing={5} mt={'3%'} direction="row" display="flex" justifyContent="center" alignItems="center">
      <Button variant="contained" color="primary" onClick={() => navigate(`../account/${currentUser.accountId}/outfits`)}>
        Cancel
      </Button>
      <Button
        variant="contained"
        color="inherit"
        disabled={activeStep === 0}
        onClick={() => {
          setActiveStep((prevActiveStep) => prevActiveStep - 1);
        }}
      >
        Back
      </Button>
      <Button variant="contained" color="secondary" onClick={handleNext}>
        {activeStep === steps.length - 1 ? 'Create' : 'Next'}
      </Button>
    </Stack>
  );
};

export default NavButtons;
