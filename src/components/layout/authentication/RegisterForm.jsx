import * as React from 'react';
import { AuthenticationApi } from '../../../api/AuthenticationApi';
import { AccountApi } from '../../../api/AccountApi';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
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

const RegisterForm = ({ openSignUp, setOpenSignUp, setOpenSignIn, setSuccessfullySignUp }) => {
  const [errors, setErrors] = React.useState(null);
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
    setErrors(null);
    validateEmail();
  }, [email]);

  React.useEffect(() => {
    if (isEmailValid.result === true) axiosCheckIfEmailExist();
  }, [triggerAxiosEmail]);

  React.useEffect(() => {
    setErrors(null);
    validateUsername();
  }, [username]);

  React.useEffect(() => {
    if (isUsernameValid.result === true) axiosCheckIfUsernameExist();
  }, [triggerAxiosUsername]);

  React.useEffect(() => {
    setErrors(null);
    validatePassword();
  }, [password]);

  const axiosCheckIfEmailExist = async () => {
    try {
      setCheckEmail(true);
      const response = await AccountApi.checkIfEmailExistAsync(email);
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
  const axiosCheckIfUsernameExist = async () => {
    try {
      setCheckUsername(true);
      const response = await AccountApi.checkIfUsernameExistAsync(username);
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
  const axiosRegister = async () => {
    try {
      await AuthenticationApi.signUpAsync({
        email: email,
        username: username,
        password: password,
      });
      setSuccessfullySignUp(true);
      setOpenSignUp(false);
    } catch (error) {
      setErrors(error.response.data.Errors);
      console.error(error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    validateEmail();
    validateUsername();
    validatePassword();
    if (isEmailValid.result && isUsernameValid.result && isPasswordValid.result) {
      axiosRegister();
    }
  };

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let result = emailRegex.test(email);
    if (isEmailValid.result === null) setIsEmailValid({ result: false, message: null });
    else if (result) {
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
      if (!alphanumericResult) {
        validationResult = false;
        messages.push('Username can only contain alphanumeric characters.');
      }
      if (!lengthResult) {
        validationResult = false;
        messages.push('Username must not have less than 4 and more than 15 characters.');
      }
      if (lengthResult && alphanumericResult) {
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
      if (!upercaseResult) {
        validationResult = false;
        messages.push('Password must contain at least one uppercase letter.');
      }
      if (!lowercaseResult) {
        validationResult = false;
        messages.push('Password must contain at least one lowercase letter.');
      }
      if (!digitResult) {
        validationResult = false;
        messages.push('Password must contain at least one digit.');
      }
      if (!nonAlphanumericResult) {
        validationResult = false;
        messages.push('Password must contain at least one non-alphanumeric character.');
      }
      if (!lengthResult) {
        validationResult = false;
        messages.push('Password must not have less than 4 and more than 255 characters.');
      }
      if (upercaseResult && lowercaseResult && digitResult && nonAlphanumericResult && lengthResult) {
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
    <Dialog open={openSignUp} onClose={() => setOpenSignUp(false)}>
      <DialogContent>
        <Typography component="h1" variant="h4" align="center">
          Sign Up
        </Typography>
        {errors !== null &&
          errors.map((error) => (
            <Typography variant="h6" align="center" color={'#db6969'}>
              {error}
            </Typography>
          ))}
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <FormControl
            fullWidth
            error={!isEmailValid.result && isEmailValid.message !== null}
            margin="normal"
            variant="outlined"
            onChange={(e) => setEmail(e.target.value)}
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
            {!isEmailValid.result && isEmailValid.message !== null && <FormHelperText>{isEmailValid.message}</FormHelperText>}
          </FormControl>
          <FormControl
            fullWidth
            error={!isUsernameValid.result && isUsernameValid.messages.length !== 0}
            margin="normal"
            variant="outlined"
            onChange={(e) => setUsername(e.target.value)}
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
            onChange={(e) => setPassword(e.target.value)}
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
                  <IconButton aria-label="toggle password visibility" onClick={() => setShowPassword((show) => !show)} edge="end">
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
            <LinkText
              onClick={() => {
                setOpenSignUp(false);
                setOpenSignIn(true);
              }}
              variant="body1"
            >
              Already have an account? Sign In
            </LinkText>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default RegisterForm;
