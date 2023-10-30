import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { Box, styled } from '@mui/material';
import noImage from '../../assets/no-item-image.png';

const ImageCarousel = ({ imagesForItem, imagesIndex }) => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = imagesForItem.length;

  const ImageContainer = styled(Box)(
    ({ theme }) => ({
      overflow: 'hidden',
      display: 'block',
    }),
    theme.unstable_sx({
      height: 400,
      width: 300,
    })
  );
  const ImageStepper = () => {
    const handleNext = () => {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
  
    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    return (
    <MobileStepper
      variant="text"
      steps={maxSteps}
      position="static"
      activeStep={activeStep}
      sx={{ maxWidth: 400, flexGrow: 1 }}
      nextButton={
        <Button size="small" onClick={handleNext} disabled={maxSteps - activeStep - 1 === 0}>
          Next
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </Button>
      }
      backButton={
        <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
          Back
        </Button>
      }
    />
  )};
  return (
    <>
      {maxSteps !== 0 ? (
        <Box>
          {imagesForItem.map((image, index) => (
            <div key={`Images${imagesIndex}image${index}`}>
              {index === activeStep ? (
                <ImageContainer>
                  <img src={image.url} alt="itemImage" style={{ maxWidth: '100%', maxHeight: '100%' }} />
                </ImageContainer>
              ) : null}
            </div>
          ))}
          <ImageStepper/>
        </Box>
      ) : (
        <ImageContainer>
          <img src={noImage} alt="noImage" style={{ maxWidth: '100%', maxHeight: '100%' }} />
        </ImageContainer>
      )}
    </>
  );
};

export default ImageCarousel;
