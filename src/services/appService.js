import { TRANSACTION_API } from '../constants/serviceUrls';
import { createHeader } from '../utils/Common';


export const fetchUserTransactions = async (user_id) => {
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

export const fetchUserTransactionsById = (user_id) => {

}
