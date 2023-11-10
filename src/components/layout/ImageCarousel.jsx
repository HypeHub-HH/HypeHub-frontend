import * as React from 'react';
import noImage from '../../assets/no-item-image.png';
import { useNavigate } from 'react-router-dom';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { Box, Container, Button, useTheme, MobileStepper } from '@mui/material';

const ImageCarousel = ({ images, navigateURL }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = images.length;

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
                <Box
                  component="img"
                  width="100%"
                  display="block"
                  src={image.url}
                  alt="image"
                  loading="lazy"
                  onClick={() => {
                    if (navigateURL) navigate(navigateURL);
                  }}
                  sx={
                    navigateURL
                      ? {
                          cursor: 'pointer',
                          '&:hover': {
                            opacity: '0.8',
                          },
                        }
                      : {}
                  }
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
          <Box
            component="img"
            width="100%"
            display="block"
            src={noImage}
            alt="noImage"
            onClick={() => {
              if (navigateURL) navigate(navigateURL);
            }}
            sx={
              navigateURL
                ? {
                    cursor: 'pointer',
                    '&:hover': {
                      opacity: '0.8',
                    },
                  }
                : {}
            }
          />
        </Container>
      )}
    </>
  );
};

export default ImageCarousel;
