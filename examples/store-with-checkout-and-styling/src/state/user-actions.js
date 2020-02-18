export const SET_USER_DEVICE = 'SET_USER_DEVICE';
export const SET_CUSTOMER = 'SET_CUSTOMER';
export const SET_CUSTOMER_ACCESS_TOKEN = 'SET_CUSTOMER_ACCESS_TOKEN';
export const SET_USER_ERRORS = 'SET_USER_ERRORS';

export function setUserDevice(payload) {
  return {
    type: SET_USER_DEVICE,
    payload
  };
}

export function setCustomer(payload) {
  return {
    type: SET_CUSTOMER,
    payload
  };
}

export function setCustomerAccessToken(payload) {
  return {
    type: SET_CUSTOMER_ACCESS_TOKEN,
    payload
  };
}

export function setUserErrors(payload) {
  return {
    type: SET_USER_ERRORS,
    payload
  };
}
