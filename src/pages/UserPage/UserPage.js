import React from 'react';
import { Box, Stack, Paper, Typography, Container, Grid } from '@mui/material';
import useFetch from '../../utils/useFetch';
import { USER_API } from '../../constants/serviceUrls';
import './UserPage.css';

const UserPage = () => {
  const { data: { profile } } = useFetch(`${USER_API}/profile`);

  return (
    <Box className="user-page-wrapper" sx={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
      <Paper
        className="user-identification-wrapper"
        elevation={2}
        sx={{
          display: 'flex',
          maxWidth: 'md',
          width: '100%',
          mt: 6,
          p: 4
        }}
      >
        <Box className='identification-content-area-left' sx={{flexGrow: 3}}>

        </Box>
        <Box className='identification-content-area-right' sx={{flexGrow: 5}}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              Username
            </Grid>
            <Grid item xs={8}>
              {profile?.username}
            </Grid>
            <Grid item xs={4}>
              Email
            </Grid>
            <Grid item xs={8}>
              {profile?.email}
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Box>
  )
}

export default UserPage;