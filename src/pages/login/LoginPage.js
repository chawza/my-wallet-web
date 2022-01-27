import React, { useRef } from "react";
import { login } from "../../utils/Session";

const LoginPage = ({ history }) => {
  const usernameField = useRef();
  const passwordField = useRef();

  const submitLogin = async () => {
    const username = usernameField.current.value;
    const password = passwordField.current.value;
    if (username.length === 0 || password.length === 0) {
      return alert('please enter username and password!');
    }
    try {
      await login(username, password);
      history.push({pathname: '/home'})
    } catch (err) {
      alert(err);
    }
  }

  const passwordOnEnter = async (event) => {
    if (event.key === 'Enter') {
      return await submitLogin();
    }
  }

  return (
    <div className={'login-page-wrapper'}>
      <div className={'login-box'}>
        <div className={'username-field-wrapper'}>
          <input type="text" ref={usernameField} autoFocus/>
        </div>
        <div className={'password-field-wrapper'}>
          <input type="password" ref={passwordField} onKeyPress={passwordOnEnter}/>
        </div>
        <div className={'submit-btn-wrapper'}>
          <input type="submit" onClick={submitLogin}/>
        </div>
      </div>
    </div>
  )
}

export default LoginPage;