import * as React from 'react';
import emailjs from '@emailjs/browser';
import BasicAlerts from '../../components/ui/BasicAlerts';
import { Grid, TextField, Button, Box, Container, Typography } from '@mui/material';

const EmailSender = () => {
  const form = React.useRef();
  const [openSuccessAlert, setOpenSuccessAlert] = React.useState(false);
  const [openFailedAlert, setOpenFailedAlert] = React.useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs.sendForm('service_uq3x24o', 'template_dlwnc9e', form.current, 'elyYF1HfTClVVaADt').then(
      (result) => {
        setOpenSuccessAlert(true);
        console.log(result.text);
      },
      (error) => {
        setOpenFailedAlert(true);
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
              <TextField placeholder="Enter first name" label="Name" variant="outlined" name="from_name" fullWidth required />
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
        <BasicAlerts
          openSuccessAlert={openSuccessAlert}
          openFailedAlert={openFailedAlert}
          setOpenSuccessAlert={setOpenSuccessAlert}
          setOpenFailedAlert={setOpenFailedAlert}
          successText={'An email was send!'}
          faildedText={'An error has occurred during sending email!'}
        />
      </Container>
    </Box>
  );
};

export default EmailSender;
