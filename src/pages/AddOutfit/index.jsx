import * as React from 'react';
import BasicAlerts from '../../components/ui/BasicAlerts';
import ImagesSection from '../../components/layout/cropper/ImagesSection';
import SelectItems from '../../components/layout/ItemsStep';
import NameStep from '../../components/layout/NameStep';
import NavButtons from '../../components/layout/NavButtons';
import { AccountApi } from '../../api/AccountApi';
import { OutfitApi } from '../../api/OutfitApi';
import { postImages } from '../../api/ImageBBApi';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Box, Container, Typography, LinearProgress, Stepper, Step, StepLabel } from '@mui/material';

const AddOutfit = () => {
  const navigate = useNavigate();
  const { accountId } = useParams();
  const { currentUser } = useAuth();
  const [activeStep, setActiveStep] = React.useState(0);
  const [items, setItems] = React.useState(null);
  const [selectedItems, setSelectedItems] = React.useState([]);
  const [name, setName] = React.useState('');
  const [isNameValid, setIsNameValid] = React.useState({ result: null, message: null });
  const [areImagesValid, setAreImagesValid] = React.useState({ result: null, message: null });
  const [selectedImages, setSelectedImages] = React.useState([]);
  const [isUploading, setIsUploading] = React.useState(false);
  const [openSuccessAlert, setOpenSuccessAlert] = React.useState(false);
  const [openFailedAlert, setOpenFailedAlert] = React.useState(false);
  const steps = ['Name', 'Items', 'Images'];

  const handleNext = async (e) => {
    e.preventDefault();
    if (activeStep === 0) {
      validateName();
      if (isNameValid.result) setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else if (activeStep === 1) setActiveStep((prevActiveStep) => prevActiveStep + 1);
    else if (activeStep === 2) {
      validateImages();
      if (areImagesValid.result) axiosCreateOutfit();
    }
  };
  const axiosCreateOutfit = async () => {
    try {
      setIsUploading(true);
      var outfit = JSON.stringify({
        Name: name,
        Items: selectedItems.map((item) => item.id),
        Images: await postImages(selectedImages),
      });
      let response = await OutfitApi.createOutfitAsync(outfit);
      setOpenSuccessAlert(true);
      navigate(`/account/${currentUser.accountId}/outfits/${response.data.id}`);
    } catch (error) {
      setOpenFailedAlert(true);
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  };
  const axiosItems = async () => {
    try {
      const response = await AccountApi.getItemsFromAccountAsync(accountId);
      setItems(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const validateName = () => {
    const lengthRegex = /^[^\s]{4,30}$/;
    let lengthResult = lengthRegex.test(name);
    if (isNameValid.result === null) setIsNameValid({ result: false, message: null });
    else {
      if (!lengthResult)
        setIsNameValid({ result: false, message: 'Username must not have less than 4 and more than 30 characters.' });
      else setIsNameValid({ result: true, message: null });
    }
  };
  const validateImages = () => {
    if (areImagesValid.result === null) setAreImagesValid({ result: false, message: null });
    else {
      if (selectedImages.length === 0) setAreImagesValid({ result: false, message: 'You have to add at least one photo.' });
      else setAreImagesValid({ result: true, message: null });
    }
  };

  React.useEffect(() => {
    axiosItems();
  }, [accountId]);

  React.useEffect(() => {
    validateImages();
  }, [selectedImages]);

  return (
    <Box padding={'2%'}>
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          paddingBottom: '2%',
          paddingTop: '1%',
        }}
      >
        {!isUploading ? (
          <>
            <Typography variant="h4">Create Outfit</Typography>
            <Stepper activeStep={activeStep} sx={{ width: '100%', padding: '2%' }}>
              {steps.map((label) => {
                return (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>

            {activeStep === 0 && (
              <NameStep name={name} setName={setName} isNameValid={isNameValid} validateNameFun={validateName} />
            )}
            {activeStep === 1 && (
              <SelectItems items={items} setItems={setItems} selectedItems={selectedItems} setSelectedItems={setSelectedItems} />
            )}
            {activeStep === 2 && (
              <>
                {!areImagesValid.result && areImagesValid.message !== null && (
                  <Typography variant="h6" color={'#d32f2f'}>
                    {areImagesValid.message}
                  </Typography>
                )}
                <ImagesSection selectedImages={selectedImages} setSelectedImages={setSelectedImages} />
              </>
            )}
            <NavButtons activeStep={activeStep} setActiveStep={setActiveStep} steps={steps} handleNext={handleNext} />
          </>
        ) : (
          <Box mt={'20%'}>
            <Typography align="center">Your outfit is being created...</Typography>
            <LinearProgress color="secondary" variant="indeterminate" />
          </Box>
        )}
      </Container>
      <BasicAlerts
        openSuccessAlert={openSuccessAlert}
        openFailedAlert={openFailedAlert}
        setOpenSuccessAlert={setOpenSuccessAlert}
        setOpenFailedAlert={setOpenFailedAlert}
        successText={'You have created new Outfit!'}
        faildedText={'An error has occurred during creation of your outfit!'}
      />
    </Box>
  );
};

export default AddOutfit;
