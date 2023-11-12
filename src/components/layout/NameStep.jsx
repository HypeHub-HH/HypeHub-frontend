import * as React from 'react';
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  FormHelperText,
} from '@mui/material';



const NameStep = ({ name, setName, isNameValid, validateNameFun }) => {

  React.useEffect(() => {
    validateNameFun();
  }, [name]);

  return (
    <FormControl
      fullWidth
      error={!isNameValid.result && isNameValid.message !== null}
      margin="normal"
      variant="outlined"
      onChange={(e) => setName(e.target.value)}
    >
      <InputLabel htmlFor="emailOrUsername">Name</InputLabel>
      <OutlinedInput id="name" name="Name" type="text" label="Name" value={name} autoComplete="off" />
      {!isNameValid.result && isNameValid.message !== null && <FormHelperText>{isNameValid.message}</FormHelperText>}
    </FormControl>
  );
};

export default NameStep;
