import React, { useState } from "react";
import { Container, Box, TextField, Button, Typography } from '@mui/material';
import { login } from "../../utils/Session";

const LoginPage = ({ history }) => {
  const [formState, setFormState] = useState({ username: '', password: '' });

  const submitLogin = async () => {
    const { username, password } = formState;
    if (username.length === 0 || password.length === 0) {
      return alert('please enter username and password!');
    }
    try {
      await login(username, password);
      history.push({pathname: '/dashboard'})
    } catch (err) {
      alert(err);
    }
  }

  const passwordOnEnter = async (event) => {
    if (event.key === 'Enter') {
      console.log(formState)
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
    </Container>
  )
}

export default LoginPage;