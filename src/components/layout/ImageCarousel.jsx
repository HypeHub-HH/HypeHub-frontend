import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { Box, Container, styled, Button } from '@mui/material';
import noImage from '../../assets/no-item-image.png';
import { useNavigate } from 'react-router-dom';

const ImageCarousel = ({ images, navigateURL }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = images.length;

  const ImageContainer = styled(Box)(
    ({ theme }) => ({
      overflow: 'hidden',
      display: 'block',
      cursor: 'pointer',
      '&:hover': {
        opacity: '0.8',
      },
    }),
    theme.unstable_sx({
      height: 400,
      width: 300,
    })
  );
  const CustomImage = styled(Box)(({ theme }) => ({
    cursor: 'pointer',
    '&:hover': {
      opacity: '0.8',
    },
  }));
  return (
    <>
      {maxSteps !== 0 ? (
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
              {index === activeStep ? (
                <CustomImage
                  component="img"
                  width="100%"
                  display="block"
                  src={image.url}
                  alt="image"
                  onClick={() => navigate(navigateURL)}
                />
              ) : null}
            </div>
          ))}
          <MobileStepper
            variant="text"
            steps={maxSteps}
            position="static"
            activeStep={activeStep}
            sx={{ width: 300, padding: 0 }}
            nextButton={
              <Button
                size="small"
                onClick={() => setActiveStep((prevActiveStep) => prevActiveStep + 1)}
                disabled={maxSteps - activeStep - 1 === 0}
              >
                Next
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
              </Button>
            }
            backButton={
              <Button
                size="small"
                onClick={() => setActiveStep((prevActiveStep) => prevActiveStep - 1)}
                disabled={activeStep === 0}
              >
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                Previous
              </Button>
            }
          />
        </Container>
      ) : (
        <ImageContainer>
          <img
            src={noImage}
            alt="noImage"
            style={{ maxWidth: '100%', maxHeight: '100%' }}
            onClick={() => navigate(navigateURL)}
          />
        </ImageContainer>
      )}
    </>
  );
};

export default ImageCarousel;
