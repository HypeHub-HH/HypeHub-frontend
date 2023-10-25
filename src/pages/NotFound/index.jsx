import React from 'react';
import { Box, styled, Typography, Divider } from '@mui/material';
import CustomButton from '../../components/ui/CustomButton';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  const handleBackHomeButton = () => {
    navigate('/');
  };

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
        onClick={handleBackHomeButton}
      />
    </Box>
  );
};

export default NotFound;
