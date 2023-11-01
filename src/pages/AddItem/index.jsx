import * as React from 'react';
import { Button, Container, Typography,Box} from '@mui/material';
import ItemForm from './ItemForm';
import SelectedImages from './ImagesSection';
import { useNavigate } from 'react-router-dom';

const AddItem = () => {
  const formRef = React.useRef();
  const navigate = useNavigate();
  const [selectedImages, setSelectedImages] = React.useState([]);

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
    <Box backgroundColor={"#E6ECF3"} padding={"2%"}>
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
