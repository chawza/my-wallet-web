import { TRANSACTION_API } from '../constants/serviceUrls';
import { getUserSessionData } from '../utils/Session';

const createHeader = () => {
  const { jwt } = getUserSessionData();
  return {
    Authorization: `Bearer ${jwt}`
  }
}

export const fetchUserTransactions = async (user_id) => {
  const { jwt } = getUserSessionData();
  const request = new Request(
    `${TRANSACTION_API}/user/${user_id}`,
    {
      method: 'GET',
      headers: createHeader()
    }
  )
  const fetchedData = await fetch(request);
  return fetchedData.json();
};
