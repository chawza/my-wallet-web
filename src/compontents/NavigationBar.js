import React from 'react';
import { AppBar, Typography, Toolbar, Button, Box, Container } from '@mui/material';
import { Link } from 'react-router-dom';

const appbarMenu = [
  { title: 'Dasboard', path: '/dashboard'},
  { title: 'Records', path: '/transaction-record'}
]

const NavigationBar = () => {
  return (
    <AppBar position='static'>
      <Container maxWidth='lg'>
      <Toolbar disableGutters>
        <Typography variant='h5'>
          LOGO
        </Typography>
        <Box sx={{flexGrow: 1, display: 'flex', ml: 1}}>
          {
            appbarMenu.map((menu) =>
              <Link key={menu.title} to={menu.path} style={{ textDecoration: 'none'}}>
                <Button
                  key={menu.title}
                  sx={{color: 'white', display: 'block'}}
                >
                  {menu.title}
                </Button>
              </Link>
            )
          }
        </Box>
        <Link to='/profile' style={{ textDecoration: 'none'}}>
          <Button
            sx={{color: 'white', display: 'block'}}
          >
            Profile
          </Button>
        </Link>
      </Toolbar>
      </Container>
    </AppBar>
  )
}

export default NavigationBar;
