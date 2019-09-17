import * as actionTypes from "../actions/actionTypes";

const initialState = {
  userData: null,
  loading: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_USER_START:
      return {
        ...state,
        loading: true
      };
    case actionTypes.FETCH_USER_SUCCESS:
      return {
        ...state,
        userData: action.userData,
        loading: false
      };
    case actionTypes.FETCH_ORDERS_FAIL:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
};

export default reducer;
