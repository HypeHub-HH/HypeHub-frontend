import * as React from 'react';
import { Button, TextField, MenuItem, Select, InputLabel, FormControl, Container, Typography, Box } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import ImageCropper from './ImageCropper';
import ItemForm from './ItemForm';
import SelectedImages from './SelectedImages';

const AddItem = () => {
  const formRef = React.useRef();
  const [selectedImages, setSelectedImages] = React.useState([]);
 
  React.useEffect(()=>{
    console.log(selectedImages)
  },[selectedImages])

  const handleSubmit = (e) => {
    e.preventDefault();
    formRef.current.reportValidity();
    const formData = new FormData(formRef.current);
    const name = formData.get('name');
    let category = formData.get('category');
    let newItem = {
      Name: name,
      Category: category,
      Brand: formData.get('brand'),
      Model: formData.get('model'),
      Colorway: formData.get('colorway'),
      Price: formData.get('price'),
      DateOfPurchase: formData.get('date'),
    };
    console.log(newItem);
    if (formData.get('name') !== '' && formData.get('category') !== '') {
      console.log('tutaj dodawanie itemu');
      console.log(newItem);
    }
  };

  return (
    <Container>
      <Typography variant='h3'>Add Item</Typography>
      <form ref={formRef} onSubmit={handleSubmit}>
        <ItemForm/>
      </form>
      <SelectedImages selectedImages={selectedImages} setSelectedImages={setSelectedImages}/>
      <Button type="submit" onClick={handleSubmit}>
        Add
      </Button>
    </Container>
  );
};

export default AddItem;
