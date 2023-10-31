import React from 'react';
import config from '../../config';
import { Alert, Snackbar } from '@mui/material';
const Alerts = ({ openSuccessAlert, openFailedAlert, setOpenSuccessAlert, setOpenFailedAlert }) => {
  const handleAlertClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSuccessAlert(false);
    setOpenFailedAlert(false);
  };

  return (
    <>
      <Snackbar open={openSuccessAlert} autoHideDuration={config.alertDuration} onClose={handleAlertClose}>
        <Alert onClose={handleAlertClose} severity="success" sx={{ width: '100%' }}>
          An item was successfully added!
        </Alert>
      </Snackbar>
      <Snackbar open={openFailedAlert} autoHideDuration={config.alertDuration} onClose={handleAlertClose}>
        <Alert onClose={handleAlertClose} severity="error" sx={{ width: '100%' }}>
          An error has occurred during adding item!
        </Alert>
      </Snackbar>
    </>
  );
};

export default Alerts;
