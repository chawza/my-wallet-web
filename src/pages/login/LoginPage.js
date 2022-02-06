import React, { useState } from "react";
import { Container, Box, TextField, Button, Typography, Snackbar, Alert } from '@mui/material';
import { login } from "../../utils/Session";
import { useHistory } from "react-router-dom";

const toastInitialState = { show: false, message: '' };

const LoginPage = () => {
  const history = useHistory();
  const [formState, setFormState] = useState({ username: '', password: '' });
  const [errorToast, setErrorToast] = useState(toastInitialState);
  const [loginToast, setLoginToast] = useState(toastInitialState);

  const showErrorToast = (message) => setErrorToast({ show: true, message });
  const closeToastError = () => setErrorToast(toastInitialState);

  const showLoginToast = (message) => setLoginToast({ show: true, message });
  const closeLoginToast = () => setLoginToast(toastInitialState);

  const submitLogin = async () => {
    const { username, password } = formState;
    if (username.length === 0 || password.length === 0) {
      return showErrorToast('please enter username and password!');
    }
    try {
      await login(username, password);
      history.push({pathname: '/dashboard'})
    } catch (error) {
      showLoginToast(error?.message || 'Login Failed');
    }
  }

  const passwordOnEnter = async (event) => {
    if (event.key === 'Enter') {
      return await submitLogin();
    }
  }

  return (
    <Container maxWidth='xs'>
      <Box className="content-area" sx={{ mt: '15vh' }}>
        <Typography variant="h4" >
          Login YOUR Wallet
        </Typography>
        <Box
          className="form-area"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            mt: 8
          }}
        >
          <TextField
            label="username"
            autoFocus={true}
            type="text"
            onChange={(event) => setFormState({ ...formState, username: event.target.value })}
          />
          <TextField
            label="password"
            type="password"
            onKeyPress={passwordOnEnter}
            onChange={(event) => setFormState({ ...formState, password: event.target.value })}
          />
          <Button variant="contained" onClick={submitLogin}>
            Sign in
          </Button>
        </Box>
      </Box>
      <Snackbar
        className='form-toast'
        open={errorToast.show}
        anchorOrigin={{vertical: 'top', horizontal: 'center'}}
        autoHideDuration={3000}
        onClose={closeToastError}
      >
        <Alert severity="error">{errorToast.message}</Alert>
      </Snackbar>
      <Snackbar
        className='login-toast'
        open={loginToast.show}
        anchorOrigin={{vertical: 'top', horizontal: 'center'}}
        autoHideDuration={3000}
        onClose={closeLoginToast}
      >
        <Alert severity="error">{loginToast.message}</Alert>
      </Snackbar>
    </Container>
  )
}

export default LoginPage;