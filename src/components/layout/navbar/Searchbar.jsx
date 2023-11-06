import * as React from 'react';
import { AccountApi } from '../../../api/AccountApi';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import { Autocomplete, TextField, Typography, InputAdornment, useTheme, styled, alpha } from '@mui/material';

const Searchbar = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [usernamesList, setUsernamesList] = React.useState([]);
  const [resetKey, setResetKey] = React.useState(0);

  const axiosUsername = async (searchedUsername) => {
    try {
      const response = await AccountApi.getSearchedAccountsAsync(searchedUsername);
      setUsernamesList(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const CustomTypography = styled(Typography)(({ theme }) => ({
    cursor: 'pointer',
    padding: '3% 0 3% 6%',
    '&:hover': {
      opacity: '0.5',
    },
  }));

  return (
    <Autocomplete
      key={resetKey}
      freeSolo={true}
      onInputChange={(event, newInputValue) => {
        if (newInputValue !== '') axiosUsername(newInputValue);
        else setUsernamesList([]);
      }}
      options={usernamesList.map((account) => JSON.stringify(account))}
      sx={{
        position: 'relative',
        borderRadius: (theme) => theme.shape.borderRadius,
        backgroundColor: (theme) => alpha(theme.palette.common.white, 0.15),
        '&:hover': {
          backgroundColor: (theme) => alpha(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        [theme.breakpoints.up('sm')]: {
          marginLeft: (theme) => theme.spacing(1),
          width: '55%',
        },
        [theme.breakpoints.down('sm')]: {
          marginLeft: (theme) => theme.spacing(10),
          width: '150px',
        },
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Search User…"
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position='start'>
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{
            '& .MuiInputBase-input': {
              color: '#c4c4c4',
              transition: theme.transitions.create('width'),
              [theme.breakpoints.up('sm')]: {
                '&:focus': {
                  width: '70%',
                },
              },
            },
          }}
        />
      )}
      renderOption={(option) => {
        let account = JSON.parse(option.key);
        return (
          <CustomTypography
            key={account.id}
            onClick={() => {
              navigate(`../account/${account.id}`);
              setUsernamesList([]);
              setResetKey((prevKey) => prevKey + 1);
            }}
          >
            {account.username}
          </CustomTypography>
        );
      }}
    />
  );
};

export default Searchbar;
