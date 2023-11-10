import * as React from 'react';
import { Button, Container, Typography, Box, LinearProgress, Snackbar, Alert } from '@mui/material';
import ItemForm from './ItemForm';
import SelectedImages from '../../components/layout/cropper/ImagesSection';
import { useNavigate } from 'react-router-dom';
import { postImage } from '../../api/ImageBBApi';
import { ItemApi } from '../../api/ItemApi';
import BasicAlerts from '../../components/ui/BasicAlerts';
import { useAuth } from '../../context/AuthContext';

const AddItem = () => {
  const formRef = React.useRef();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [selectedImages, setSelectedImages] = React.useState([]);
  const [isUploading, setIsUploading] = React.useState(false);
  const [openSuccessAlert, setOpenSuccessAlert] = React.useState(false);
  const [openFailedAlert, setOpenFailedAlert] = React.useState(false);

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
          Name: name,
          Category: category,
          Brand: formData.get('brand'),
          Model: formData.get('model'),
          Colorway: formData.get('colorway'),
          Price: parseFloat(formData.get('price')),
          PurchaseDate: new Date(formData.get('date')),
          Images: await postImage(selectedImages),
        });
        let serverResponse = await ItemApi.createItemAsync(parsedItem);
        setOpenSuccessAlert(true);
        navigate(`/account/${currentUser.accountId}/items/${serverResponse.data.id}`);
      }
    } catch (error) {
      setOpenSuccessAlert(true);
    }
  };

  return (
    <Box padding={'2%'}>
      <Container>
        {!isUploading ? (
          <>
            <Typography variant="h4">Add Item</Typography>
            <form ref={formRef} onSubmit={handleSubmit}>
              <ItemForm />
            </form>
            <SelectedImages selectedImages={selectedImages} setSelectedImages={setSelectedImages} />
            <Box mt={'2%'} display={'flex'} justifyContent={'flex-end'}>
              <Button variant="contained" color="primary" onClick={() => navigate(`/myItems`)}>
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="secondary" onClick={handleSubmit}>
                Save and add
              </Button>
            </Box>
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
        successText={'You created new item!'}
        faildedText={'An error has occurred during creation of your item!'}
      />
    </Box>
  );
};

export default AddItem;
