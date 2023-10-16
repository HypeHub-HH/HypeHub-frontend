import * as React from "react";
import emailjs from "@emailjs/browser";
import {Grid, TextField, Button} from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const EmailSender = () => {
  const form = React.useRef();
  const [openSuccess, setOpenSuccess] = React.useState(false);
  const [openFailed, setOpenFailed] = React.useState(false);

  const handleClick = () => {
    setOpenFailed(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSuccess(false);
    setOpenFailed(false);
  };

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs.sendForm("service_uq3x24o", "template_dlwnc9e", form.current, "elyYF1HfTClVVaADt").then(
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
    <>
      <Snackbar open={openSuccess} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          An email was send!
        </Alert>
      </Snackbar>
      <Snackbar open={openFailed} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          An error has occurred during sending email!
        </Alert>
      </Snackbar>
      <Button variant="outlined" onClick={handleClick}>
        Open success snackbar
      </Button>
      <form ref={form} onSubmit={sendEmail}>
        <Grid container spacing={1} form={form}>
          <Grid xs={12} item>
            <TextField placeholder="Enter first name" label="Name" variant="outlined" name="from_name" fullWidth required />
          </Grid>
          <Grid item xs={12}>
            <TextField type="email" placeholder="Enter email" label="Email" variant="outlined" name="reply_to" fullWidth required />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Message" multiline rows={4} placeholder="Type your message here" variant="outlined" name="message" fullWidth required />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" onSubmit={sendEmail} fullWidth>
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default EmailSender;