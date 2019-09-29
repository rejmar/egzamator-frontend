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

export const fetchStudentSubjectsStart = () => {
  return {
    type: actionTypes.FETCH_STUDENT_SUBJECTS_START
  };
};

export const fetchStudentSubjectsSuccess = studentSubjects => {
  return {
    type: actionTypes.FETCH_STUDENT_SUBJECTS_SUCCESS,
    studentSubjects: studentSubjects
  };
};

export const fetchStudentSubjectsFail = () => {
  return {
    type: actionTypes.FETCH_STUDENT_SUBJECTS_FAIL
  };
};

export const fetchStudentTestsStart = () => {
  return {
    type: actionTypes.FETCH_STUDENT_TESTS_START
  };
};

export const fetchStudentTestsSuccess = studentTests => {
  return {
    type: actionTypes.FETCH_STUDENT_TESTS_SUCCESS,
    studentTests: studentTests
  };
};

export const fetchStudentTestsFail = () => {
  return {
    type: actionTypes.FETCH_STUDENT_TESTS_FAIL
  };
};

export const fetchStudentSolvedTestsStart = () => {
  return {
    type: actionTypes.FETCH_STUDENT_SOLVED_TESTS_START
  };
};

export const fetchStudentSolvedTestsSuccess = studentSolvedTests => {
  return {
    type: actionTypes.FETCH_STUDENT_SOLVED_TESTS_SUCCESS,
    studentSolvedTests: studentSolvedTests
  };
};

export const fetchStudentSolvedTestsFail = () => {
  return {
    type: actionTypes.FETCH_STUDENT_SOLVED_TESTS_FAIL
  };
};

export const getStudentsMarksStart = () => {
  return {
    type: actionTypes.GET_STUDENTS_MARKS_START
  };
};

export const getStudentsMarksSuccess = studentsMarks => {
  return {
    type: actionTypes.GET_STUDENTS_MARKS_SUCCESS,
    studentsMarks: studentsMarks
  };
};

export const getStudentsMarksFail = () => {
  return {
    type: actionTypes.GET_STUDENTS_MARKS_FAIL
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

export const getStudentSubjects = userId => {
  return dispatch => {
    dispatch(fetchStudentSubjectsStart());
    axios
      .post(
        "http://localhost:8080/egzamator-api/subject/getStudentSubjects?userId=" +
          userId
      )
      .then(response => {
        dispatch(fetchStudentSubjectsSuccess(response.data));
      })
      .catch(error => {
        dispatch(fetchStudentSubjectsFail());
      });
  };
};

export const getStudentTests = userId => {
  return dispatch => {
    dispatch(fetchStudentTestsStart());
    axios
      .post(
        "http://localhost:8080/egzamator-api/student/tests?userId=" + userId
      )
      .then(response => {
        dispatch(fetchStudentTestsSuccess(response.data));
      })
      .catch(error => {
        dispatch(fetchStudentTestsFail());
      });
  };
};

export const getStudentSolvedTests = userId => {
  return dispatch => {
    dispatch(fetchStudentSolvedTestsStart());
    axios
      .post(
        "http://localhost:8080/egzamator-api/student/solvedTests?userId=" +
          userId
      )
      .then(response => {
        dispatch(fetchStudentSolvedTestsSuccess(response.data));
      })
      .catch(error => {
        dispatch(fetchStudentSolvedTestsFail());
      });
  };
};

export const getTeacherData = userId => {
  return dispatch => {
    dispatch(getTeacherSubjects(userId));
    dispatch(getTeacherTests(userId));
  };
};

export const getStudentData = userId => {
  return dispatch => {
    dispatch(getStudentSubjects(userId));
    dispatch(getStudentTests(userId));
    dispatch(getStudentSolvedTests(userId));
  };
};

export const addStudentAnswers = answersData => {
  return dispatch => {
    axios
      .post("http://localhost:8080/egzamator-api/test/addAnswers", answersData)
      .then(response => {
        // dispatch(getStudentData(test.userId));
      })
      .catch(error => {
        console.log(error.data);
        // dispatch(fetchTeacherSubjectsFail());
      });
  };
};

export const deleteTest = (testName, userId) => {
  return dispatch => {
    axios
      .get(
        "http://localhost:8080/egzamator-api/test/remove?testName=" + testName
      )
      .then(res => {
        dispatch(getTeacherTests(userId));
      })
      .catch(error => {
        console.log(error.data);
      });
  };
};

export const getStudentsMarks = subjectName => {
  return dispatch => {
    dispatch(getStudentsMarksStart());
    axios
      .post(
        "http://localhost:8080/egzamator-api/teacher/getStudentsMarks?subjectName=" +
          subjectName
      )
      .then(res => {
        dispatch(getStudentsMarksSuccess(res.data));
      })
      .catch(error => {
        dispatch(getStudentsMarksFail());
      });
  };
};
