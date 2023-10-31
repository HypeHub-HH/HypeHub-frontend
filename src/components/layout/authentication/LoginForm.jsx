import * as React from 'react';
import { AuthenticationApi } from '../../../api/AuthenticationApi.js';
import { useAuth } from '../../../context/AuthContext.js';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';
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

const LoginForm = ({ openSignIn, setOpenSignIn, setOpenSignUp }) => {
  const navigate = useNavigate();
  const { login } = useAuth();
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

  const handleSubmit = (event) => {
    event.preventDefault();
    validateEmailOrUsername();
    validatePassword();
    if (isEmailOrUsernameValid.result && isPasswordValid.result) {
      const axiosLogin = async () => {
        try {
          const response = await AuthenticationApi.signInAsync({
            emailOrUsername: emailOrUsername,
            password: password,
          });
          login(response.data);
          setOpenSignIn(false);
          navigate('/explore');
        } catch (error) {
          setError(error.response.data.Msg);
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
    else if (result) setIsEmailOrUsernameValid({ result: true, message: null });
    else setIsEmailOrUsernameValid({ result: false, message: 'Invalid format.' });
  };

  const validatePassword = () => {
    const lengthRegex = /^(\s|.){1,}$/;
    let result = lengthRegex.test(password);
    if (isPasswordValid.result === null) setIsPasswordValid({ result: false, message: null });
    else if (result) setIsPasswordValid({ result: true, message: null });
    else setIsPasswordValid({ result: false, message: 'Invalid format.' });
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
    <Dialog open={openSignIn} onClose={() => setOpenSignIn(false)}>
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
            onChange={(e) => setEmailOrUsername(e.target.value)}
          >
            <InputLabel htmlFor="emailOrUsername">Email or username</InputLabel>
            <OutlinedInput id="emailOrUsername" name="emailOrUsername" type="text" label="Email or username" autoComplete="email" />
            {!isEmailOrUsernameValid.result && isEmailOrUsernameValid.message !== null && (
              <FormHelperText>{isEmailOrUsernameValid.message}</FormHelperText>
            )}
          </FormControl>
          <FormControl
            fullWidth
            error={!isPasswordValid.result && isPasswordValid.message !== null}
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
              autoComplete="current-password"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton aria-label="toggle password visibility" onClick={() => setShowPassword((show) => !show)} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
            {!isPasswordValid.result && isPasswordValid.message !== null && <FormHelperText>{isPasswordValid.message}</FormHelperText>}
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
            <LinkText
              onClick={() => {
                setOpenSignIn(false);
                setOpenSignUp(true);
              }}
              variant="body1"
            >
              Don't have an account? Sign Up
            </LinkText>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default LoginForm;
