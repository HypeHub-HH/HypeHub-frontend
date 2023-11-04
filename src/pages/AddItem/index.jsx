import * as React from 'react';
import { Button, Container, Typography,Box} from '@mui/material';
import ItemForm from './ItemForm';
import SelectedImages from './ImagesSection';
import { json, useNavigate } from 'react-router-dom';
import { postImage } from '../../api/ImageBBApi';
import { ItemApi } from '../../api/ItemApi';

const AddItem = () => {
  const formRef = React.useRef();
  const navigate = useNavigate();
  const [selectedImages, setSelectedImages] = React.useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    formRef.current.reportValidity();
    const formData = new FormData(formRef.current);
    const name = formData.get('name');
    const category = formData.get('category');
    if (name !== '' && category !== '') {
      // let uploadedImages = await postImage(selectedImages);
      // let newItem = {
      //   Name: name,
      //   Category: category,
      //   Brand: formData.get('brand'),
      //   Model: formData.get('model'),
      //   Colorway: formData.get('colorway'),
      //   Price: parseFloat(formData.get('price')),
      //   DateOfPurchase: new Date(formData.get('date')),
      //   Images: await postImage(selectedImages)
      // };
      // console.log(newItem)
      var parsedItem = JSON.stringify({
        Name: name,
        Category: category,
        Brand: formData.get('brand'),
        Model: formData.get('model'),
        Colorway: formData.get('colorway'),
        Price: parseFloat(formData.get('price')),
        DateOfPurchase: new Date(formData.get('date')),
        Images: await postImage(selectedImages)
      })
      console.log("oto twój obiekt")
      console.log(parsedItem)
      await ItemApi.createItem(parsedItem)
    }
  };

  return (
    <Box padding={"2%"}>
    <Container>
      <Typography variant="h4">Add Item</Typography>
      <form ref={formRef} onSubmit={handleSubmit}>
        <ItemForm />
      </form>
      <SelectedImages selectedImages={selectedImages} setSelectedImages={setSelectedImages} />
      <Box mt={"2%"} display={'flex'} justifyContent={"flex-end"}>
      <Button variant='contained' color="primary" onClick={()=>navigate(`/myItems`)}>
        Cancel
      </Button>
      <Button type="submit" variant='contained' color="secondary" onClick={handleSubmit}>
        Save and add
      </Button>
      </Box>
    </Container>
    </Box>
  );
};

export default AddItem;
