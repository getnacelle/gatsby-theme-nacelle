export const SET_USER_DEVICE = 'SET_USER_DEVICE';
export const SET_CUSTOMER = 'SET_CUSTOMER';
export const SET_CUSTOMER_ADDRESSES = 'SET_CUSTOMER_ADDRESSES';
export const SET_CUSTOMER_ACCESS_TOKEN = 'SET_CUSTOMER_ACCESS_TOKEN';
export const REMOVE_CUSTOMER_ACCESS_TOKEN = 'REMOVE_CUSTOMER_ACCESS_TOKEN';
export const SET_USER_ERRORS = 'SET_USER_ERRORS';
export const SET_LOGIN_STATUS = 'SET_LOGIN_STATUS';
export const SET_LOGIN_METHOD = 'SET_LOGIN_METHOD';

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

export function setCustomerAddresses(payload) {
  return {
    type: SET_CUSTOMER_ADDRESSES,
    payload
  };
}

export function setCustomerAccessToken(payload) {
  return {
    type: SET_CUSTOMER_ACCESS_TOKEN,
    payload
  };
}

export function removeCustomerAccessToken() {
  return {
    type: REMOVE_CUSTOMER_ACCESS_TOKEN
  };
}

export function setUserErrors(payload) {
  return {
    type: SET_USER_ERRORS,
    payload
  };
}

export function setLoginStatus(payload) {
  return {
    type: SET_LOGIN_STATUS,
    payload
  };
}

export function setLoginMethod(payload) {
  return {
    type: SET_LOGIN_METHOD,
    payload
  };
}
