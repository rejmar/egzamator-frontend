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
        console.log("UserData:", response.data);

        dispatch(fetchUserSuccess(response.data));
      })
      .catch(error => {
        dispatch(fetchUserFail());
      });
  };
};

export const userLogout = () => {
  return {
    type: actionTypes.USER_LOGOUT
  };
};

export const getTest = testId => {
  return dispatch => {
    axios
      .post("http://localhost:8080/egzamator-api/test/getTest?id=" + testId)
      .then(response => {
        console.log("Test:", response.data);

        // dispatch(fetchUserSuccess(response.data));
      })
      .catch(error => {
        // dispatch(fetchUserFail());
      });
  };
};

export const addNewTest = () => {
  return dispatch => {};
};

// export const getUserRole = userId => {
//   return dispatch => {
//     axios
//       .post("http://localhost:8080/egzamator-api/user/role?userId=" + userId)
//       .then(response => {
//         dispatch(fetchUserRole(response.data));
//       })
//       .catch(error => {
//         dispatch(fetchUserFail());
//       });
//   };
// };
