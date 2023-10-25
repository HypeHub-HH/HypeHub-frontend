import * as React from 'react';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from '@mui/material';

const AddItemPopout = ({ openAddItem, setOpenAddItem }) => {
  const categories = [
    { name: 'torso', value: '1' },
    { name: 'legs', value: '2' },
    { name: 'footwear', value: '3' },
    { name: 'accesories', value: '4' },
  ];
  const formRef = React.useRef();
  const [categoryValue, setCategoryValue] = React.useState('');

  const handleClose = (e) => {
    setOpenAddItem(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    let name = formData.get('name');
    let category = formData.get('category');
    let brand = formData.get('brand');
    let model = formData.get('model');
    let colorway = formData.get('colorway');
    let price = formData.get('price');
    let date = formData.get('date');
    let newItem = { Name: name, Category: category, Brand: brand, Model: model, Colorway: colorway, Price: price, DateOfPurchase: date };
    console.log(newItem);
    if (formData.get('name') === '' || formData.get('category') === '') {
    } else {
      handleClose();
    }
  };

  return (
    <Dialog open={openAddItem} onClose={handleClose}>
      <form ref={formRef} onSubmit={handleSubmit}>
        <DialogTitle>Add item</DialogTitle>
        <DialogContent>
          <TextField autoFocus name="name" margin="normal" id="nameId" label="Name" type="text" variant="outlined" fullWidth required />
          <FormControl fullWidth required>
            <InputLabel id="selectCategoryLabel">Category</InputLabel>
            <Select
              labelId="selectCategoryLabel"
              id="selectCategoryId"
              value={categoryValue}
              onChange={(event) => setCategoryValue(event.target.value)}
              name="category"
              label="Category"
            >
              {categories.map((category, index) => (
                <MenuItem value={category.value} key={`MenuItem${index}`}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField name="brand" margin="normal" id="brandId" label="Brand" type="text" fullWidth variant="outlined" />
          <TextField name="model" margin="normal" id="modelId" label="Model" type="text" fullWidth variant="outlined" />
          <TextField name="colorway" margin="normal" id="colorwayId" label="Colorway" type="text" fullWidth variant="outlined" />
          <TextField name="price" margin="normal" id="priceId" label="Price" type="number" fullWidth variant="outlined" />
          <TextField name="date" margin="normal" id="string" type="date" fullWidth variant="outlined" />
        </DialogContent>
        <DialogActions>
          <Button type="submit" onClick={handleSubmit}>
            Add
          </Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddItemPopout;
