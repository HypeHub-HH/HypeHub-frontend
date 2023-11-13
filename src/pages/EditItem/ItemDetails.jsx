import * as React from 'react';
import { TextField, MenuItem, Select, InputLabel, FormControl } from '@mui/material';

const ItemDetails = ({fetchedItem}) => {
  const [categoryValue, setCategoryValue] = React.useState(fetchedItem.cloathingType);
  const categories = [
    { name: 'Torso', value: 0 },
    { name: 'Legs', value: 1 },
    { name: 'Footwear', value: 2 },
    { name: 'Accesories', value: 3 },
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
        defaultValue={fetchedItem.name}
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
      <TextField
        name="brand"
        margin="normal"
        id="brandId"
        label="Brand"
        type="text"
        fullWidth
        variant="outlined"
        defaultValue={fetchedItem.brand}
      />
      <TextField
        name="model"
        margin="normal"
        id="modelId"
        label="Model"
        type="text"
        fullWidth
        variant="outlined"
        defaultValue={fetchedItem.model}
      />
      <TextField
        name="colorway"
        margin="normal"
        id="colorwayId"
        label="Colorway"
        type="text"
        fullWidth
        variant="outlined"
        defaultValue={fetchedItem.colorway}
      />
      <TextField
        name="price"
        margin="normal"
        id="priceId"
        label="Price"
        type="number"
        fullWidth
        variant="outlined"
        defaultValue={fetchedItem.price}
      />
      <TextField
        name="date"
        margin="normal"
        id="string"
        type="date"
        label="Date of purchase"
        defaultValue={fetchedItem.purchaseDate == null ? null : fetchedItem.purchaseDate.split('T')[0] }
        inputProps={{ min: '1970-01-24', max: new Date().toISOString().split('T')[0] }}
        fullWidth
        variant="outlined"
      />
      
    </>
  );
};

export default ItemDetails;
