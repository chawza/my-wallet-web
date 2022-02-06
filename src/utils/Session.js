import { fetchUserToken } from "../services/authenticationService";

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

const getUserSessionData = () => {
  return {
    username: sessionStorage.getItem('username'),
    jwt: sessionStorage.getItem('jwt')
  }
}

const login = async (username, password) => {
  const { token } = await fetchUserToken(username, password);
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
  isUserAuthenticated,
  getUserSessionData
}