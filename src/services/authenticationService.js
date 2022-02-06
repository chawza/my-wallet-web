import { AUTH_API } from "../constants/serviceUrls";

export const fetchUserToken = async (username, password) => {
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
  if (String(response.status)[0] == 2) {
    return response.json();
  }
  throw new Error('Authorization Error');
};
