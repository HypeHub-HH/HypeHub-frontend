import {
  Container,
  Box,
  Avatar,
  ListItemText,
  ListItem,
  ListItemAvatar,
  Button,
  LinearProgress,
  Typography,
} from '@mui/material';
import React from 'react';
import { useAuth } from '../../context/AuthContext';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import EditIcon from '@mui/icons-material/Edit';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import { postImages } from '../../api/ImageBBApi';
import RoundImageCropper from './RoundImageCropper';
import AccountDetails from './AccountDetails';
import SaveIcon from '@mui/icons-material/Save';
import { AccountApi } from '../../api/AccountApi';
import BasicAlerts from '../../components/ui/BasicAlerts';

const Settings = () => {
  const { currentUser } = useAuth();
  const [avatar, setAvatar] = React.useState(currentUser?.avatarURL);
  const [editAvatar, setEditAvatar] = React.useState(false);
  const [newAvatarWasAdded, setNewAvatarWasAdded] = React.useState(false)
  const [updatingInProgress, setUpdatingInProgress] = React.useState(false);
  const [openSuccessAlert, setOpenSuccessAlert] = React.useState(false);
  const [openFailedAlert, setOpenFailedAlert] = React.useState(false);

  const handleRefreshClick = () => {
    window.location.reload();
  };

  const handleSaveAvatar = async () => {
    setUpdatingInProgress(true)
    try {
      let newAvatar = await postImages([avatar]);
      let parsedAvatar = JSON.stringify({AvatarUrl: newAvatar[0]});
      let result = await AccountApi.updateAccountAvatarAsync(parsedAvatar);
      currentUser.avatarURL = result.AvatarUrl;
      setUpdatingInProgress(false)
      handleRefreshClick();
      setOpenSuccessAlert(true)
      setNewAvatarWasAdded(false)
    } catch (error) {
      console.error(error);
      setUpdatingInProgress(false)
      setOpenFailedAlert(true)
      setNewAvatarWasAdded(false)      
    }
  };

  return (
    <Box>
      <Container>
        {!updatingInProgress ? (
          <Grid container mt={3} display={'flex'} alignItems={'flex-start'}>
            <Grid xs={12} md={6} display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'}>
              {editAvatar ? (
                <RoundImageCropper setAvatar={setAvatar} setEditAvatar={setEditAvatar} setNewAvatarWasAdded={setNewAvatarWasAdded}/>
              ) : (
                <>
                  <Box component="img" src={avatar} sx={{ width: 300, heigh: 300, borderRadius: '50%' }} />
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <PhotoCameraIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={'Avatar'} />
                    <Button onClick={() => setEditAvatar(true)}>
                      <EditIcon />
                    </Button>
                    {newAvatarWasAdded && (
                      <Button onClick={() => handleSaveAvatar()}>
                        <SaveIcon fontSize="large" />
                      </Button>
                    )}
                  </ListItem>
                </>
              )}
            </Grid>
            <Grid xs={12} md={6}>
              <AccountDetails setUpdatingInProgress={setUpdatingInProgress} setOpenSuccessAlert={setOpenSuccessAlert} setOpenFailedAlert={setOpenFailedAlert}/>
            </Grid>
          </Grid>
        ) : (
          <Box mt={'20%'}>
            <Typography align="center">Your account is being updated. Please wait.</Typography>
            <LinearProgress color="secondary" variant="indeterminate" />
          </Box>
        )}
      </Container>
      <BasicAlerts
        openSuccessAlert={openSuccessAlert}
        openFailedAlert={openFailedAlert}
        setOpenSuccessAlert={setOpenSuccessAlert}
        setOpenFailedAlert={setOpenFailedAlert}
        successText={'Update was succesfull!'}
        faildedText={'An error has occurred during updating your account!'}
      />
    </Box>
  );
};

export default Settings;
