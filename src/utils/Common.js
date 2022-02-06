import { getUserSessionData } from '../utils/Session';

const MONTH_INDEX = {
  1: 'January',
  2: 'February',
  3: 'March',
  4: 'April',
  5: 'May',
  6: 'June',
  7: 'July',
  8: 'August',
  9: 'September',
  10: 'October',
  11: 'November',
  12: 'December'
}

export const datetimeToDayMonth = (datetime) => {
  return `${datetime.getDate()} ${MONTH_INDEX[datetime.getMonth()]}`
}

export const reducer = (state, action) => {
  const { type, payload } = action;
  return {...state, [type]: payload};
}

export const createHeader = () => {
  const { jwt } = getUserSessionData();
  return {
    Authorization: `Bearer ${jwt}`
  }
}