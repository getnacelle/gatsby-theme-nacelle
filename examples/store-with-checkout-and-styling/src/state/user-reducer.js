import { SET_USER_DEVICE, SET_CUSTOMER_ACCESS_TOKEN } from './user-actions';

const initialState = {
  isMobile: true,
  customerAccessToken: ''
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
    case SET_CUSTOMER_ACCESS_TOKEN: {
      const { customerAccessToken } = action.payload;
      return {
        ...state,
        customerAccessToken
      }
    }
    default: {
      return state;
    }
  }
}
