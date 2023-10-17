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
  FormHelperText,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { AuthenticationApi } from '../../../api/AuthenticationApi.js';
import { useAuth } from '../../../context/AuthContext.js';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ openSignIn, setOpenSignIn, setOpenSignUp }) => {
  const navigate = useNavigate();
  const auth = useAuth();
  const [error, setError] = React.useState(null);
  const [showPassword, setShowPassword] = React.useState(false);
  const [emailOrUsername, setEmailOrUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isEmailOrUsernameValid, setIsEmailOrUsernameValid] = React.useState({ result: null, message: null });
  const [isPasswordValid, setIsPasswordValid] = React.useState({ result: null, message: null });

  React.useEffect(() => {
    setError(null);
    validateEmailOrUsername();
  }, [emailOrUsername]);

  React.useEffect(() => {
    setError(null);
    validatePassword();
  }, [password]);

  const handleEmailOrUsernameChange = (e) => setEmailOrUsername(e.target.value);

  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleDialogClose = () => setOpenSignIn(false);

  const handleRegisterLink = () => {
    setOpenSignIn(false);
    setOpenSignUp(true);
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleSubmit = (event) => {
    event.preventDefault();
    validateEmailOrUsername();
    validatePassword();
    if (isEmailOrUsernameValid.result === true && isPasswordValid.result === true) {
      const axiosLogin = async () => {
        try {
          const response = await AuthenticationApi.signInAsync({
            emailOrUsername: emailOrUsername,
            password: password,
          });
          console.log(response);
          auth.login(response.data);
          setOpenSignIn(false);
          navigate('/home');
        } catch (error) {
          setError(error.response.data.message);
          console.error(error);
        }
      };
      axiosLogin();
    }
  };

  const validateEmailOrUsername = () => {
    const lengthRegex = /^(?!\s*$).+/;
    let result = lengthRegex.test(emailOrUsername);
    if (isEmailOrUsernameValid.result === null) setIsEmailOrUsernameValid({ result: false, message: null });
    else if (result === true) {
      setIsEmailOrUsernameValid({ result: true, message: null });
    } else setIsEmailOrUsernameValid({ result: false, message: 'Invalid format.' });
  };

  const validatePassword = () => {
    const lengthRegex = /^(\s|.){1,}$/;
    let result = lengthRegex.test(password);
    if (isPasswordValid.result === null) setIsPasswordValid({ result: false, message: null });
    else if (result === true) {
      setIsPasswordValid({ result: true, message: null });
    } else setIsPasswordValid({ result: false, message: 'Invalid format.' });
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
    <Dialog open={openSignIn} onClose={handleDialogClose}>
      <DialogContent>
        <Typography component="h1" variant="h4" align="center">
          Sign In
        </Typography>
        {error !== null && (
          <Typography variant="h6" align="center" color={'#db6969'}>
            {error}
          </Typography>
        )}
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <FormControl
            fullWidth
            error={!isEmailOrUsernameValid.result && isEmailOrUsernameValid.message !== null}
            margin="normal"
            variant="outlined"
            onChange={handleEmailOrUsernameChange}
          >
            <InputLabel htmlFor="emailOrUsername">Email or username</InputLabel>
            <OutlinedInput
              id="emailOrUsername"
              name="emailOrUsername"
              type="text"
              label="Email or username"
              autoComplete="email"
            />
            {!isEmailOrUsernameValid.result && isEmailOrUsernameValid.message !== null && (
              <FormHelperText>{isEmailOrUsernameValid.message}</FormHelperText>
            )}
          </FormControl>
          <FormControl
            fullWidth
            error={!isPasswordValid.result && isPasswordValid.message !== null}
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
              autoComplete="current-password"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
            {!isPasswordValid.result && isPasswordValid.message !== null && (
              <FormHelperText>{isPasswordValid.message}</FormHelperText>
            )}
          </FormControl>
          <SubmitButton fullWidth margin="normal" type="submit">
            SIGN IN
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
            <LinkText onClick={handleRegisterLink} variant="body1">
              Don't have an account? Sign Up
            </LinkText>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default LoginForm;
