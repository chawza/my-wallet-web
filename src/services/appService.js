import { TRANSACTION_API } from '../constants/serviceUrls';
import { createHeader } from '../utils/Common';

const customFetch = async (request) => {
  const response = await fetch(request);
  const status = response.status.toString();
  if (status[0] !== '2' || status[0] !== '3') {
    throw new Error(await response.json());
  }
  return response;
}

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

export const createNewRecord = async (formValues) => {
  const url = new URL(TRANSACTION_API)
  for (let key of Object.keys(formValues)) {
    url.searchParams.append(key, formValues[key])
  }
  const request = new Request(
    url.toString(),
    {
      method: 'POST',
      headers: createHeader()
    }
  )
  const response = await customFetch(request);
  return response.body;
}
