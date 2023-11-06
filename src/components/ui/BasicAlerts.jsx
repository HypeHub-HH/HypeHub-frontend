import React from 'react';
import { Snackbar, Stack } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import config from '../../config';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="standard" {...props} />;
});

const BasicAlerts = ({
  openSuccessAlert,
  openFailedAlert,
  setOpenSuccessAlert,
  setOpenFailedAlert,
  successText,
  faildedText,
}) => {
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSuccessAlert(false);
    setOpenFailedAlert(false);
  };

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={openSuccessAlert} autoHideDuration={config.alertDuration} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          {successText}
        </Alert>
      </Snackbar>
      <Snackbar open={openFailedAlert} autoHideDuration={config.alertDuration} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          {faildedText}
        </Alert>
      </Snackbar>
    </Stack>
  );
};

export default BasicAlerts;
