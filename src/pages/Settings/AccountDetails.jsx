import React from 'react';
import { AccountApi } from '../../api/AccountApi';
import { useAuth } from '../../context/AuthContext';
import BadgeIcon from '@mui/icons-material/Badge';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { List, Avatar, ListItemText, Divider, ListItem, ListItemAvatar, Button, Switch } from '@mui/material';

const AccountDetails = ({setUpdatingInProgress, setOpenSuccessAlert, setOpenFailedAlert }) => {
  const { currentUser } = useAuth();
  const [editAccoutType, setEditAccoutType] = React.useState(false);
  const [accoutType, setAccountType] = React.useState(currentUser?.isPrivate);

  const handleSaveEditAccoutType = async () => {
    setUpdatingInProgress(true);
    try {
      let parsedPrivacy = JSON.stringify({
        IsPrivate: accoutType,
      });
      await AccountApi.updateAccountPrivacyAsync(parsedPrivacy);
      setEditAccoutType(false);
      setUpdatingInProgress(false);
      setOpenSuccessAlert(true)
    } catch (error) {
      console.error(error);
      setUpdatingInProgress(false);
      setOpenFailedAlert(true)
    }
  };

  return (
    <List>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <BadgeIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={currentUser?.userName} secondary="Username" />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <AlternateEmailIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={currentUser?.email} secondary="Email" />
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
  );
};

export default AccountDetails;
