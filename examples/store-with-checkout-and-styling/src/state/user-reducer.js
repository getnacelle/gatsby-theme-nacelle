import {
  SET_USER_DEVICE,
  SET_CUSTOMER,
  SET_CUSTOMER_ACCESS_TOKEN,
  REMOVE_CUSTOMER_ACCESS_TOKEN,
  SET_USER_ERRORS,
  SET_LOGIN_STATUS
} from './user-actions';

const initialState = {
  customerAccessToken: '',
  userErrors: [null]
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_USER_DEVICE: {
      const { isMobile } = action.payload;
      return {
        ...state,
        isMobile
      };
    }
    case SET_CUSTOMER: {
      const customer = action.payload;
      return {
        ...state,
        customer
      };
    }
    case SET_CUSTOMER_ACCESS_TOKEN: {
      const { accessToken, expiresAt } = action.payload;
      return {
        ...state,
        customerAccessToken: {
          value: accessToken,
          expiresAt
        }
      };
    }
    case REMOVE_CUSTOMER_ACCESS_TOKEN: {
      return {
        ...state,
        customerAccessToken: null,
        customer: null
      };
    }
    case SET_USER_ERRORS: {
      const { userErrors } = action.payload;
      return {
        ...state,
        userErrors: state.userErrors.concat(userErrors)
      };
    }
    case SET_LOGIN_STATUS: {
      const { isLoggedIn } = action.payload;
      return {
        ...state,
        isLoggedIn
      };
    }
    default: {
      return state;
    }
  }
}
