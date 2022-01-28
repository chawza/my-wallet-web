import {AUTH_API} from "../constants/serviceUrls";

const fetchToken = async (username, password) => {
  const request = new Request(
    `${AUTH_API}/login`,
    {
      method: 'POST',
      body: JSON.stringify({
        username,
        password
      })
    }
  );
  const response = await fetch(request)
  if (response.status === 200) {
    return response.json();
  }
  throw new Error('Login Failed');
}

const decodeJwtToken = (token) => {
  const header = atob(token.split('.')[0]);
  const payload = atob(token.split('.')[1]);
  return { header, payload };
}

const storeUserDataToSession = (token, payload) => {
  const parsedPayload = JSON.parse(payload);
  sessionStorage.setItem('jwt', token);
  sessionStorage.setItem('username', parsedPayload.username);
}

const login = async (username, password) => {
  const { token } = await fetchToken(username, password);
  const { payload } = decodeJwtToken(token);
  storeUserDataToSession(token, payload);
}

const isUserAuthenticated = () => {
    const token = sessionStorage.getItem('jwt');
    if (!token) return false;
    return true;
}

export {
  login,
  isUserAuthenticated
}