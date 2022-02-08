import React from 'react';
import { Box, Stack, Paper, Typography } from '@mui/material';
import useFetch from '../../utils/useFetch';
import { USER_API } from '../../constants/serviceUrls';
import './UserPage.css';

const UserPage = () => {
  const { data: { profile } } = useFetch(`${USER_API}/profile`);

  return (
    <Box className="user-page-wrapper">
      <Paper className="user-profile-wrapper">
        <Stack>
          <div className='profile-row'>
            <Typography className='profile-row-title'>
              Username
            </Typography>
            <Typography className='profile-row-value'>
              {profile?.username}
            </Typography>
          </div>
          <div className='profile-row'>
            <Typography className='profile-row-title'>
              email
            </Typography>
            <Typography className='profile-row-value'>
              {profile?.email}
            </Typography>
          </div>            
        </Stack>
      </Paper>
    </Box>
  )
}

export default UserPage;