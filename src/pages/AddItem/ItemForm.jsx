import * as React from 'react';
import { TextField, MenuItem, Select, InputLabel, FormControl } from '@mui/material';

const ItemForm = () => {
  const [categoryValue, setCategoryValue] = React.useState('');
  const categories = [
    { name: 'Torso', value: '1' },
    { name: 'Legs', value: '2' },
    { name: 'Footwear', value: '3' },
    { name: 'Accesories', value: '4' },
  ];

  return (
    <>
      <TextField
        autoFocus
        name="name"
        margin="normal"
        id="nameId"
        label="Name"
        type="text"
        variant="outlined"
        fullWidth
        required
      />
      <FormControl fullWidth required>
        <InputLabel id="selectCategoryLabelId">Category</InputLabel>
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
      <TextField
        name="date"
        margin="normal"
        id="string"
        type="date"
        label="Date of purchase"
        defaultValue={new Date().toISOString().split('T')[0]}
        inputProps={{ min: '1970-01-24', max: new Date().toISOString().split('T')[0] }}
        fullWidth
        variant="outlined"
      />
    </>
  );
};

export default ItemForm;
