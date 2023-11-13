import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import CustomButton from '../../components/ui/CustomButton';
import { Box, Typography } from '@mui/material';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: 'greySecondary.main',
      }}
    >
      <Typography
        variant="h1"
        sx={{
          color: '#0F172A',
          fontWeight: '500',
        }}
      >
        404
      </Typography>
      <Typography
        variant="h4"
        sx={{
          color: '#0F172A',
          fontWeight: '500',
          mb: 6,
        }}
      >
        This page could not be found
      </Typography>
      <CustomButton
        backgroundColor="#0EA5E9"
        color="secondary"
        buttonText="Back to home page"
        breakpointWidth="30dvw"
        breakpointHeight="5dvh"
        onClick={() => navigate('/')}
      />
    </Box>
  );
};

export default NotFound;
