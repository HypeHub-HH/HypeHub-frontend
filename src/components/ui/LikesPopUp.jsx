import * as React from 'react';
import { Box, Typography, Dialog, DialogContent, Stack, Avatar, styled, Divider, DialogTitle } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import defaultIcon from '../../assets/defaultAccountIcon.png';

const LikesPopUp = ({ openLikesPopUp, setOpenLikesPopUp, likes, setLikes }) => {
  const navigate = useNavigate();

  const CustomTypography = styled(Typography)(({ theme }) => ({
    cursor: 'pointer',
    '&:hover': {
      opacity: '0.5',
    },
  }));

  return (
    <Dialog
      open={openLikesPopUp}
      onClose={() => {
        setOpenLikesPopUp(false);
        setLikes(null);
      }}
    >
      <DialogTitle variant="h4" align="center">
        Likes
      </DialogTitle>
      <Divider></Divider>
      <DialogContent sx={{ height: '70vh', overflow: 'auto' }}>
        {likes && (
          <Box>
            {likes.map((like) => (
              <Stack
                key={like.accountId}
                spacing={2}
                direction="row"
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: '7%',
                }}
              >
                <CustomTypography variant="h6" onClick={() => navigate(`../account/${like.accountId}`)}>
                  {like.account.username}
                </CustomTypography>
                <Avatar alt="Avatar image." src={like.account.avatarUrl ? like.account.avatarUrl : defaultIcon} sx={{ width: 30, height: 30 }} />
              </Stack>
            ))}
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default LikesPopUp;
