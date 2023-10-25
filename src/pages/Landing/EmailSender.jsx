import * as React from 'react';
import emailjs from '@emailjs/browser';
import { Grid, TextField, Button, Snackbar, Box, Container, Typography } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import config from '../../config';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const EmailSender = () => {
  const form = React.useRef();
  const [openSuccess, setOpenSuccess] = React.useState(false);
  const [openFailed, setOpenFailed] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSuccess(false);
    setOpenFailed(false);
  };

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs.sendForm('service_uq3x24o', 'template_dlwnc9e', form.current, 'elyYF1HfTClVVaADt').then(
      (result) => {
        setOpenSuccess(true);
        console.log(result.text);
      },
      (error) => {
        setOpenFailed(true);
        console.log(error.text);
      }
    );
  };

  return (
    <Box padding="3%" sx={{ backgroundColor: 'secondary.light' }}>
      <Container>
        <form ref={form} onSubmit={sendEmail}>
          <Grid container spacing={1} form={form} justifyContent={'center'}>
            <Grid xs={7} item>
              <Typography variant="h5">Got questions? We've got answers.</Typography>
            </Grid>
            <Grid xs={7} item>
              <TextField
                placeholder="Enter first name"
                label="Name"
                variant="outlined"
                name="from_name"
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={7}>
              <TextField
                type="email"
                placeholder="Enter email"
                label="Email"
                variant="outlined"
                name="reply_to"
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={7}>
              <TextField
                label="Message"
                multiline
                rows={4}
                placeholder="Type your message here"
                variant="outlined"
                name="message"
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={6}>
              <Button type="submit" variant="contained" color="secondary" onSubmit={sendEmail} fullWidth>
                Send
              </Button>
            </Grid>
          </Grid>
        </form>
        <Snackbar open={openSuccess} autoHideDuration={config.alertDuration} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            An email was send!
          </Alert>
        </Snackbar>
        <Snackbar open={openFailed} autoHideDuration={config.alertDuration} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
            An error has occurred during sending email!
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default EmailSender;
