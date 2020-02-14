export const SET_USER_DEVICE = 'SET_USER_DEVICE';
export const SET_CUSTOMER_ACCESS_TOKEN = 'SET_CUSTOMER_ACCESS_TOKEN';

export function setUserDevice(payload) {
  return {
    type: SET_USER_DEVICE,
    payload
  };
}

export function setCustomerAccessToken(payload) {
  return {
    type: SET_CUSTOMER_ACCESS_TOKEN,
    payload
  }
}
