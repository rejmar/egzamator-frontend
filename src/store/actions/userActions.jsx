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

export const fetchTeacherSubjectsStart = () => {
  return {
    type: actionTypes.FETCH_TEACHER_SUBJECTS_START
  };
};

export const fetchTeacherSubjectsSuccess = teacherSubjects => {
  return {
    type: actionTypes.FETCH_TEACHER_SUBJECTS_SUCCESS,
    teacherSubjects: teacherSubjects
  };
};

export const fetchTeacherSubjectsFail = () => {
  return {
    type: actionTypes.FETCH_TEACHER_SUBJECTS_FAIL
  };
};

export const fetchTeacherTestsStart = () => {
  return {
    type: actionTypes.FETCH_TEACHER_TESTS_START
  };
};

export const fetchTeacherTestsSuccess = teacherTests => {
  return {
    type: actionTypes.FETCH_TEACHER_TESTS_SUCCESS,
    teacherTests: teacherTests
  };
};

export const fetchTeacherTestsFail = () => {
  return {
    type: actionTypes.FETCH_TEACHER_TESTS_FAIL
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

export const addNewTest = test => {
  return dispatch => {
    axios
      .post("http://localhost:8080/egzamator-api/test/addTest", test)
      .then(response => {
        console.log("Test added", test);
        dispatch(getTeacherData(test.userId));
        // dispatch(getTeacherData(response.data));
      })
      .catch(error => {
        console.log(error.data);
        // dispatch(fetchTeacherSubjectsFail());
      });
  };
};

export const getTeacherSubjects = userId => {
  return dispatch => {
    dispatch(fetchTeacherSubjectsStart());
    axios
      .post(
        "http://localhost:8080/egzamator-api/subject/getTeacherSubjects?userId=" +
          userId
      )
      .then(response => {
        dispatch(fetchTeacherSubjectsSuccess(response.data));
      })
      .catch(error => {
        dispatch(fetchTeacherSubjectsFail());
      });
  };
};

export const getTeacherTests = userId => {
  return dispatch => {
    dispatch(fetchTeacherTestsStart());
    axios
      .post(
        "http://localhost:8080/egzamator-api/teacher/tests?userId=" + userId
      )
      .then(response => {
        dispatch(fetchTeacherTestsSuccess(response.data));
      })
      .catch(error => {
        dispatch(fetchTeacherTestsFail());
      });
  };
};

export const getTeacherData = userId => {
  return dispatch => {
    dispatch(getTeacherSubjects(userId));
    dispatch(getTeacherTests(userId));
  };
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
