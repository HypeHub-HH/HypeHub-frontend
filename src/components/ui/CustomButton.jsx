import { Button, styled } from '@mui/material';
import React from 'react';

const CustomButton = ({ backgroundColor, color, buttonText, breakpointWidth, breakpointHeight, onClick }) => {
  const CustomButton = styled(Button)(({ theme }) => ({
    backgroundColor: backgroundColor,
    color: color,
    fontWeight: '700',
    fontSize: '1rem',
    cursor: 'pointer',
    padding: '0.5rem 1.25rem',
    borderRadius: '20px',
    fontWeight: 'bold',
    textTransform: 'none',
    // display: 'block',
    '&:hover': {
      backgroundColor: color,
      color: backgroundColor,
      borderColor: backgroundColor,
    },
    [theme.breakpoints.down('md')]: {
      fontSize: '0.7rem',
    },
  }));

  return <CustomButton onClick={onClick}>{buttonText}</CustomButton>;
};

export default CustomButton;
