import React from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ItemApi } from '../../api/ItemApi';
import { postImages } from '../../api/ImageBBApi';
import ItemDetails from './ItemDetails';
import { Box, Container, LinearProgress, Typography, Button } from '@mui/material';
import SelectedImages from './ImagesSection';
import BasicAlerts from '../../components/ui/BasicAlerts';

const EditItem = () => {
  const { itemId } = useParams();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const formRef = React.useRef();

  const [fetchedItem, setFetchedItem] = React.useState(null);
  const [deletedImages, setDeletedImages] = React.useState([]);
  const [addedImages, setAddedImages] = React.useState([]);
  
  const [isUploading, setIsUploading] = React.useState(false);
  const [openSuccessAlert, setOpenSuccessAlert] = React.useState(false);
  const [openFailedAlert, setOpenFailedAlert] = React.useState(false);

  const fetchItem = async () => {
    try {
      const response = await ItemApi.getItemAsync(itemId);
      setFetchedItem(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {   
    e.preventDefault();
    formRef.current.reportValidity();
    const formData = new FormData(formRef.current);
    const name = formData.get('name');
    const category = formData.get('category');
    try {
      if (name !== '' && category !== '') {
        setIsUploading(true);
        var parsedItem = JSON.stringify({
          Id: fetchedItem.id,
          Name: name,
          CloathingType: parseInt(category),
          Brand: formData.get('brand'),
          Model: formData.get('model'),
          Colorway: formData.get('colorway'),
          Price: parseFloat(formData.get('price')),
          PurchaseDate: new Date(formData.get('date')),
        });
        let uploadedImagesToImageBB = await postImages(addedImages);
        let uploadedImagesWithItemId = uploadedImagesToImageBB.map((url) => ({ ItemId: fetchedItem.id, Url: url }));
        await Promise.all(uploadedImagesWithItemId.map(async (imageId) => await ItemApi.createImageAsync(imageId)));       
        await Promise.all(deletedImages.map(async (imageId) => await ItemApi.deleteImageAsync(imageId)));
        await ItemApi.updateItemAsync(parsedItem);
        await fetchItem()
        setDeletedImages([])
        setAddedImages([])
        setOpenSuccessAlert(true);
        setIsUploading(false);
      }
    } catch (error) {
      setOpenFailedAlert(true);
    }
  };

  React.useEffect(() => {
    fetchItem();
  }, []);


  return (
    <Box padding={'2%'}>
      <Container>
        {!isUploading ? (
          <>
            {fetchedItem && (
              <>
              <form ref={formRef} onSubmit={handleSubmit}>
                <Typography variant="h4">Edit details</Typography>     
                <ItemDetails fetchedItem={fetchedItem} handleSubmit={handleSubmit} />               
                <SelectedImages
                  images={fetchedItem.images}
                  deletedImages={deletedImages}
                  setDeletedImages={setDeletedImages}
                  addedImages={addedImages}
                  setAddedImages={setAddedImages}
                />
                <Box display={'flex'} justifyContent={'flex-end'}>
                <Button variant='contained' onClick={()=>navigate(`/account/${currentUser.accountId}/items/${fetchedItem.id}`)}>Cancel</Button>
                <Button variant='contained' type="submit" sx={{backgroundColor: '#0EA5E9', marginLeft: 1}}>Save details</Button>            
                </Box>
                </form>
              </>
            )}
          </>
        ) : (
          <Box mt={'20%'}>
            <Typography align="center">Your item is being created...</Typography>
            <LinearProgress color="secondary" variant="indeterminate" />
          </Box>
        )}
      </Container>
      <BasicAlerts
        openSuccessAlert={openSuccessAlert}
        openFailedAlert={openFailedAlert}
        setOpenSuccessAlert={setOpenSuccessAlert}
        setOpenFailedAlert={setOpenFailedAlert}
        successText={'Update was successfull!'}
        faildedText={'An error has occurred during update of your item!'}
      />
    </Box>
  );
};

export default EditItem;
