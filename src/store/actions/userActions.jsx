import axios from "axios";
import * as actionTypes from "./actionTypes";

export const fetchUserStart = () => {
  return {
    type: actionTypes.FETCH_USER_START
  };
};

export const fetchUserSuccess = userData => {
  return {
    type: actionTypes.FETCH_USER_SUCCESS,
    userData: userData
  };
};

export const fetchUserFail = () => {
  return {
    type: actionTypes.FETCH_USER_FAIL
  };
};

export const getUser = userId => {
  return dispatch => {
    axios
      .post("http://localhost:8080/egzamator-api/user/getUser?userId=" + userId)
      .then(response => {
        dispatch(fetchUserSuccess(response.data));
      })
      .catch(error => {
        dispatch(fetchUserFail());
      });
  };
};
