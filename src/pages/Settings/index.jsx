import {
  Container,
  Box,
  TextField,
  List,
  Avatar,
  ListItemText,
  Divider,
  ListItem,
  ListItemAvatar,
  Button,
  Switch,
  Typography,
} from '@mui/material';
import React from 'react';
import { useAuth } from '../../context/AuthContext';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import BadgeIcon from '@mui/icons-material/Badge';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import readFile from '../../utils/ReadFile';
import { postImage } from '../../api/ImageBBApi';

const Settings2 = () => {
  const { currentUser } = useAuth();
  const [avatar, setAvatar] = React.useState(currentUser?.avatarURL);
  const [accoutType, setAccountType] = React.useState(currentUser.isPrivate);
  const [editAvatar, setEditAvatar] = React.useState(false);
  const [editAccoutType, setEditAccoutType] = React.useState(false);

  const handleSaveEditAccoutType = () => {
    setEditAccoutType(false);
  };

  const onFileChange = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      let imageDataUrl = await readFile(file);
      setAvatar(imageDataUrl);
    }
  };

  const handleSaveAvatar = async () => {
    var newAvatar = await postImage(avatar);
}
  console.log(accoutType);
  return (
    <Box>
      <Container>
        <Grid container mt={3} display={'flex'} alignItems={'flex-start'}>
          <Grid xs={12} md={6} display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'}>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <PhotoCameraIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={'Avatar'} />
              {!editAvatar && (
                <Button onClick={() => setEditAvatar(true)}>
                  <EditIcon />
                </Button>
              )}
            </ListItem>
            <Box component="img" src={avatar} sx={{width:300}} />
            {editAvatar && (
              <>
                <Box display={'flex'}>
                  <TextField name="upload-photo" type="file" margin="normal" onChange={(e) => onFileChange(e)} />
                  <Button>
                    <SaveIcon fontSize="large" />
                  </Button>
                </Box>
              </>
            )}
          </Grid>
          <Grid xs={12} md={6}>
            <List>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <BadgeIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={currentUser.userName} secondary="Username" />
              </ListItem>
              <Divider variant="inset" component="li" />
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <AlternateEmailIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={currentUser.email} secondary="Email" />
              </ListItem>
              <Divider variant="inset" component="li" />
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <VisibilityIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={accoutType ? 'Private' : 'Public'} secondary="Account type" />
                {!editAccoutType ? (
                  <Button onClick={() => setEditAccoutType(true)}>
                    <EditIcon />
                  </Button>
                ) : (
                  <>
                    <Switch checked={accoutType} onChange={(e) => setAccountType(e.target.checked)} />
                    <Button onClick={() => handleSaveEditAccoutType()}>
                      <SaveIcon />
                    </Button>
                  </>
                )}
              </ListItem>
              <Divider variant="inset" component="li" />
            </List>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Settings2;
