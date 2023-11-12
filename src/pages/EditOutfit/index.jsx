import * as React from 'react';
import NavButtons from '../../components/layout/NavButtons';
import SelectItems from '../../components/layout/ItemsStep';
import NameStep from '../../components/layout/NameStep';
import BasicAlerts from '../../components/ui/BasicAlerts';
import ImagesSection from '../../components/layout/cropper/ImagesSection';
import { AccountApi } from '../../api/AccountApi';
import { OutfitApi } from '../../api/OutfitApi';
import { postImages } from '../../api/ImageBBApi';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { Box, Container, Typography, LinearProgress, Stepper, Step, StepLabel } from '@mui/material';

const EditOutfit = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { accountId, outfitId } = useParams();
  const { currentUser } = useAuth();
  const [activeStep, setActiveStep] = React.useState(0);
  const prevOutfitName = location.state?.name;
  const [name, setName] = React.useState(location.state?.name);
  const [items, setItems] = React.useState(null);
  const prevOutfitItems = location.state?.items;
  const [selectedItems, setSelectedItems] = React.useState([...location.state?.items]);
  const [isNameValid, setIsNameValid] = React.useState({ result: true, message: null });
  const prevOutfitImages = location.state?.images;
  const [selectedImages, setSelectedImages] = React.useState([...location.state?.images.map((image) => image.url)]);
  const [areImagesValid, setAreImagesValid] = React.useState({ result: true, message: null });
  const [isUploading, setIsUploading] = React.useState(false);
  const [openSuccessAlert, setOpenSuccessAlert] = React.useState(false);
  const [openFailedAlert, setOpenFailedAlert] = React.useState(false);
  const steps = ['Name', 'Items', 'Images'];

  const handleNext = async (e) => {
    e.preventDefault();
    if (activeStep === 0) {
      validateName();
      if (isNameValid.result) setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else if (activeStep === 1) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else if (activeStep === 2) {
      validateImages();
      if (areImagesValid.result) updateOutfit();
    }
  };
  const updateOutfit = async () => {
    try {
      setIsUploading(true);
      await axiosUpdateOutfit();
      await axiosUpdateItems();
      await axiosUpdateImages();
      setOpenSuccessAlert(true);
      navigate(`/account/${currentUser.accountId}/outfits/${outfitId}`);
    } catch (error) {
      setOpenFailedAlert(true);
      console.error(error);
    }
  };
  const axiosUpdateOutfit = async () => {
    if (prevOutfitName !== name) {
      var outfit = JSON.stringify({
        Id: outfitId,
        Name: name,
      });
      await OutfitApi.updateOutfitAsync(outfit);
    }
  };
  const axiosUpdateItems = async () => {
    var itemsToDelete = prevOutfitItems.filter((prevItem) => !selectedItems.some((item) => item.id === prevItem.id));
    var itemsToAdd = selectedItems.filter((item) => !prevOutfitItems.some((prevItem) => prevItem.id === item.id));
    if (itemsToDelete.length > 0) {
      for (const item of itemsToDelete) {
        await OutfitApi.removeItemFromOutfitAsync(outfitId, item.id);
      }
    }
    if (itemsToAdd.length > 0) {
      for (const item of itemsToAdd) {
        await OutfitApi.addItemToOutfitAsync(outfitId, item.id);
      }
    }
  };
  const axiosUpdateImages = async () => {
    var imagesToDelete = prevOutfitImages.filter((prevImage) => !selectedImages.some((image) => image === prevImage.url));
    var imagesToAdd = selectedImages.filter((image) => image.includes('data:image/jpeg;base64'));
    if (imagesToDelete.length > 0) {
      for (const image of imagesToDelete) {
        var t = await OutfitApi.deleteImageAsync(image.id);
      }
    }

    if (imagesToAdd.length > 0) {
      var images = await postImages(imagesToAdd);
      for (const image of images) {
        var outfitImage = JSON.stringify({
          OutfitId: outfitId,
          Url: image,
        });
        var res = await OutfitApi.createImageAsync(outfitImage);
      }
    }
  };
  const axiosItems = async () => {
    try {
      const response = await AccountApi.getItemsFromAccountAsync(accountId);
      var filteredItems = response.data.filter((incomingitem) => !selectedItems.some((item) => incomingitem.id === item.id));
      setItems(filteredItems);
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
            <Typography variant="h4">Update Outfit</Typography>
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
            <Typography align="center">Your outfit is being updated...</Typography>
            <LinearProgress color="secondary" variant="indeterminate" />
          </Box>
        )}
      </Container>
      <BasicAlerts
        openSuccessAlert={openSuccessAlert}
        openFailedAlert={openFailedAlert}
        setOpenSuccessAlert={setOpenSuccessAlert}
        setOpenFailedAlert={setOpenFailedAlert}
        successText={'You have updated your Outfit!'}
        faildedText={'An error has occurred during update of your outfit!'}
      />
    </Box>
  );
};

export default EditOutfit;
