import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { Box, Container } from '@mui/material';

const ImageCarousel = ({ images }) => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = images.length;

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: '2%',
        overflow: 'hidden',
      }}
    >
      {images.map((image, index) => (
        <div key={image.id} width="80%">
          {index === activeStep ? <Box component="img" width="100%" display="block" src={image.url} alt="image" /> : null}
        </div>
      ))}
      <MobileStepper
        variant="text"
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        sx={{ width: 300,padding: 0 }}
        nextButton={
          <Button size="small" onClick={() => setActiveStep((prevActiveStep) => prevActiveStep + 1)} disabled={maxSteps - activeStep - 1 === 0}>
            Next
            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
          </Button>
        }
        backButton={
          <Button size="small" onClick={() => setActiveStep((prevActiveStep) => prevActiveStep - 1)} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            Previous
          </Button>
        }
      />
    </Container>
  );
};

export default ImageCarousel;
