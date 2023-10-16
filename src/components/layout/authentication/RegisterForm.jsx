import * as React from 'react';
import {
  styled,
  Button,
  Dialog,
  DialogContent,
  Box,
  Typography,
  InputAdornment,
  FormControl,
  InputLabel,
  OutlinedInput,
  IconButton,
  Divider,
  CircularProgress,
  FormHelperText,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { checkIfEmailExist } from '../../../api/axios/Account/checkIfEmailExist.js';
import { checkIfUsernameExist } from '../../../api/axios/Account/checkIfUsernameExist.js';

const RegisterForm = ({ openSignUp, setOpenSignUp, setOpenSignIn }) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [checkEmail, setCheckEmail] = React.useState(false);
  const [checkUsername, setCheckUsername] = React.useState(false);
  const [isEmailValid, setIsEmailValid] = React.useState({ result: null, message: null });
  const [isUsernameValid, setIsUsernameValid] = React.useState({ result: null, messages: [] });
  const [isPasswordValid, setIsPasswordValid] = React.useState({ result: null, messages: [] });
  const [triggerAxiosEmail, setTriggerAxiosEmail] = React.useState(false);
  const [triggerAxiosUsername, setTriggerAxiosUsername] = React.useState(false);

  React.useEffect(() => {
    validateEmail();
  }, [email]);

  React.useEffect(() => {
    const axiosCheckIfEmailExist = async () => {
      try {
        setCheckEmail(true);
        const response = await checkIfEmailExist(email);
        let emailExist = response.data;
        if (emailExist === true) {
          setIsEmailValid({ result: false, message: 'This email already exists.' });
        } else {
          setIsEmailValid({ result: true, message: null });
        }
      } catch (error) {
        console.error(error);
      } finally {
        setCheckEmail(false);
      }
    };
    if (isEmailValid.result === true) axiosCheckIfEmailExist();
  }, [triggerAxiosEmail]);

  React.useEffect(() => {
    validateUsername();
  }, [username]);

  React.useEffect(() => {
    const axiosCheckIfUsernameExist = async () => {
      try {
        setCheckUsername(true);
        const response = await checkIfUsernameExist(username);
        let usernameExist = response.data;
        if (usernameExist === true) {
          setIsUsernameValid({ result: false, messages: ['This username already exists.'] });
        } else {
          setIsUsernameValid({ result: true, messages: [] });
        }
      } catch (error) {
        console.error(error);
      } finally {
        setCheckUsername(false);
      }
    };
    if (isUsernameValid.result === true) axiosCheckIfUsernameExist();
  }, [triggerAxiosUsername]);

  React.useEffect(() => {
    validatePassword();
  }, [password]);

  const handleEmailChange = (e) => setEmail(e.target.value);

  const handleUsernameChange = (e) => setUsername(e.target.value);

  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleDialogClose = () => {
    setOpenSignUp(false);
  };

  const handleLoginLink = () => {
    setOpenSignUp(false);
    setOpenSignIn(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    validateEmail();
    validateUsername();
    validatePassword();
    if (isEmailValid.result === true && isUsernameValid.result === true && isPasswordValid.result === true) {
      console.log(password);
      console.log(username);
      console.log(email);
    }
  };

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let result = emailRegex.test(email);
    if (isEmailValid.result === null) setIsEmailValid({ result: false, message: null });
    else if (result === true) {
      setIsEmailValid({ result: true, message: null });
      setTriggerAxiosEmail(!triggerAxiosEmail);
    } else setIsEmailValid({ result: false, message: 'Invalid Email format.' });
  };

  const validateUsername = () => {
    let validationResult = isUsernameValid.result;
    let messages = [];
    const alphanumericRegex = /^[a-zA-Z0-9_-]+$/;
    const lengthRegex = /^[^\s]{4,255}$/;
    let alphanumericResult = alphanumericRegex.test(username);
    let lengthResult = lengthRegex.test(username);
    if (validationResult === null) setIsUsernameValid({ result: false, messages: [] });
    else {
      if (alphanumericResult === false) {
        validationResult = false;
        messages.push('Username can only contain alphanumeric characters.');
      }
      if (lengthResult === false) {
        validationResult = false;
        messages.push('Username must not have less than 4 and more than 15 characters.');
      }
      if (lengthResult == true && alphanumericResult === true) {
        validationResult = true;
        setTriggerAxiosUsername(!triggerAxiosUsername);
      }
      setIsUsernameValid({ result: validationResult, messages: messages });
    }
  };

  const validatePassword = () => {
    let validationResult = isPasswordValid.result;
    let messages = [];
    const upercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;
    const digitRegex = /[0-9]/;
    const nonAlphanumericRegex = /[^a-zA-Z0-9]/;
    const lengthRegex = /^.{4,255}$/;
    let upercaseResult = upercaseRegex.test(password);
    let lowercaseResult = lowercaseRegex.test(password);
    let digitResult = digitRegex.test(password);
    let nonAlphanumericResult = nonAlphanumericRegex.test(password);
    let lengthResult = lengthRegex.test(password);
    if (validationResult === null) setIsPasswordValid({ result: false, messages: [] });
    else {
      if (upercaseResult === false) {
        validationResult = false;
        messages.push('Password must contain at least one uppercase letter.');
      }
      if (lowercaseResult === false) {
        validationResult = false;
        messages.push('Password must contain at least one lowercase letter.');
      }
      if (digitResult === false) {
        validationResult = false;
        messages.push('Password must contain at least one digit.');
      }
      if (nonAlphanumericResult === false) {
        validationResult = false;
        messages.push('Password must contain at least one non-alphanumeric character.');
      }
      if (lengthResult === false) {
        validationResult = false;
        messages.push('Password must not have less than 4 and more than 255 characters.');
      }
      if (
        upercaseResult === true &&
        lowercaseResult === true &&
        digitResult === true &&
        nonAlphanumericResult === true &&
        lengthResult === true
      ) {
        validationResult = true;
      }
      setIsPasswordValid({ result: validationResult, messages: messages });
    }
  };

  const SubmitButton = styled(Button)(({ theme }) => ({
    backgroundColor: '#0F172A',
    color: 'white',
    fontSize: '1.25rem',
    cursor: 'pointer',
    margin: '16px 0',
    borderRadius: '10px',
    textTransform: 'none',
    display: 'block',
    '&:hover': {
      backgroundColor: 'black',
      color: '#0EA5E9',
      borderColor: '#0EA5E9',
    },
  }));

  const LinkText = styled(Typography)(({ theme }) => ({
    cursor: 'pointer',
    '&:hover': {
      color: '#0EA5E9',
    },
  }));

  return (
    <Dialog open={openSignUp} onClose={handleDialogClose}>
      <DialogContent>
        <Typography component="h1" variant="h4" align="center">
          Sign Up
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <FormControl
            fullWidth
            error={!isEmailValid.result && isEmailValid.message !== null}
            margin="normal"
            variant="outlined"
            onChange={handleEmailChange}
          >
            <InputLabel htmlFor="email">Email</InputLabel>
            <OutlinedInput
              id="email"
              name="email"
              type="text"
              label="Email"
              autoComplete="email"
              endAdornment={
                <InputAdornment position="end">
                  {<CircularProgress sx={{ display: checkEmail ? 'block' : 'none' }} color="grey" />}
                </InputAdornment>
              }
            />
            {!isEmailValid.result && isEmailValid.message !== null && (
              <FormHelperText>{isEmailValid.message}</FormHelperText>
            )}
          </FormControl>
          <FormControl
            fullWidth
            error={!isUsernameValid.result && isUsernameValid.messages.length !== 0}
            margin="normal"
            variant="outlined"
            onChange={handleUsernameChange}
          >
            <InputLabel htmlFor="username">Username</InputLabel>
            <OutlinedInput
              id="username"
              name="username"
              type="text"
              label="Username"
              autoComplete="nickname"
              endAdornment={
                <InputAdornment position="end">
                  {<CircularProgress sx={{ display: checkUsername ? 'block' : 'none' }} color="grey" />}
                </InputAdornment>
              }
            />
            {!isUsernameValid.result &&
              isUsernameValid.messages !== null &&
              isUsernameValid.messages.map((message) => {
                return <FormHelperText key={message}>{message}</FormHelperText>;
              })}
          </FormControl>
          <FormControl
            fullWidth
            error={!isPasswordValid.result && isPasswordValid.messages.length !== 0}
            margin="normal"
            variant="outlined"
            onChange={handlePasswordChange}
          >
            <InputLabel htmlFor="password">Password</InputLabel>
            <OutlinedInput
              id="password"
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="new-password"
              variant="filled"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
            {!isPasswordValid.result &&
              isPasswordValid.messages !== null &&
              isPasswordValid.messages.map((message) => {
                return <FormHelperText key={message}>{message}</FormHelperText>;
              })}
          </FormControl>
          <SubmitButton fullWidth margin="normal" type="submit">
            SIGN UP
          </SubmitButton>
          <Divider>OR</Divider>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              margin: '16px 0 0 0',
            }}
          >
            <LinkText onClick={handleLoginLink} variant="body1">
              Already have an account? Sign In
            </LinkText>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default RegisterForm;
