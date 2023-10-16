import * as React from 'react';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { Box, Link, Typography } from '@mui/material';

const AboutUs = () => {
  return (
    <>
      <Typography variant="h6" color="text.primary" gutterBottom>
        About Us
      </Typography>
      <Box display={'flex'}>
        <Typography variant="body1" color="text.secondary">
          Mikołaj Zgórski
        </Typography>
        <Link href="https://www.linkedin.com/in/miko%C5%82aj-zg%C3%B3rski-190687207/" color="inherit">
          <LinkedInIcon />
        </Link>
        <Link href="https://github.com/Meek0hWhy" color="inherit" sx={{ pl: 1, pr: 1 }}>
          <GitHubIcon />
        </Link>
      </Box>
      <Box display={'flex'}>
        <Typography variant="body1" color="text.secondary">
          Mariusz Woźniak
        </Typography>
        <Link href="https://www.linkedin.com/in/mariuszwozniak145/" color="inherit">
          <LinkedInIcon />
        </Link>
        <Link href="https://github.com/MariuszWozniak145" color="inherit" sx={{ pl: 1, pr: 1 }}>
          <GitHubIcon />
        </Link>
      </Box>
    </>
  );
};

export default AboutUs;
