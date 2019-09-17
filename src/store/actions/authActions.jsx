import axios from "axios";
import * as actionTypes from "./actionTypes";
import userActions, {
  fetchUserStart,
  fetchUserSuccess,
  fetchUserFail
} from "./userActions";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId: userId
  };
};

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("userId");
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

export const checkAuthTimeout = expirationTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};
export const auth = (email, password, indexNumber, isSignup) => {
  return dispatch => {
    dispatch(authStart());
    dispatch(fetchUserStart());
    const authData = {
      email,
      indexNumber,
      password,
      returnSecureToken: true
    };

    dispatch(logOrRegisterUser(authData, isSignup));
  };
};

export const setAuthRedirectPath = path => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path
  };
};

export const authCheckState = userData => {
  return dispatch => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        const userId = localStorage.getItem("userId");
        dispatch(authSuccess(token, userId));
        dispatch(fetchUserSuccess(userData));
        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
      }
    }
  };
};

export const registerUser = (userId, email, indexNumber) => {
  const userData = {
    userId,
    email,
    indexNumber
  };
  return dispatch => {
    axios
      .post("http://localhost:8080/egzamator-api/user/registerUser/", userData)
      .then(response => {})
      .catch(err => {
        console.log("RegisterUser:", err);
        dispatch(authFail(err.response.data.err));
        dispatch(fetchUserFail());
      });
  };
};

export const logOrRegisterUser = (authData, isSignup) => {
  return dispatch => {
    axios
      .post(
        "http://localhost:8080/egzamator-api/user/checkUser?email=" +
          authData.email +
          "&indexNumber=" +
          authData.indexNumber
      )
      .then(response => {
        let url;
        let isUnique;
        let foundUser;
        if (isSignup) {
          url =
            "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD8IGa5AlX7K31DEaz3q6xwVHiGUSrX9Hw";
          isUnique = response.data ? false : true;
        } else {
          url =
            "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD8IGa5AlX7K31DEaz3q6xwVHiGUSrX9Hw";
          foundUser = response.data;
          isUnique = true;
        }

        isUnique &&
          axios
            .post(url, authData)
            .then(res => {
              const expirationDate = new Date(
                new Date().getTime() + res.data.expiresIn * 1000
              );
              localStorage.setItem("token", res.data.idToken);
              localStorage.setItem("expirationDate", expirationDate);
              localStorage.setItem("userId", res.data.localId);

              if (url.includes("signUp")) {
                dispatch(
                  registerUser(
                    res.data.localId,
                    authData.email,
                    authData.indexNumber
                  )
                );
              }
              dispatch(authSuccess(res.data.idToken, res.data.localId));
              dispatch(checkAuthTimeout(res.data.expiresIn));
              dispatch(fetchUserSuccess(foundUser));
            })
            .catch(err => {
              console.log("Login/register: ", err);

              dispatch(authFail(err.response.data.error));
              dispatch(fetchUserFail());
            });

        if (!isUnique) {
          dispatch(authFail("An user with such email or index number exists"));
          dispatch(fetchUserFail());
        }
        // console.log("END of auth method");
      })
      .catch(err => {
        console.log("logOrRegisterUser:", err);
        dispatch(authFail(err.response.data.error));
        dispatch(fetchUserFail());
      });
  };
};
