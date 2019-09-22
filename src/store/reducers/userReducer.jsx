import * as actionTypes from "../actions/actionTypes";

const initialState = {
  type: actionTypes.FETCH_USER_SUCCESS,
  userId: null,
  email: null,
  indexNumber: null,
  role: null,
  student: null,
  teacher: null,
  loading: false,
  teacherSubjects: null,
  teacherTests: null
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
        userId: action.userData && action.userData.userIdentity,
        email: action.userData && action.userData.email,
        indexNumber: action.userData && action.userData.indexNumber,
        role: action.userData && action.userData.role.name,
        student: action.userData && action.userData.student,
        teacher: action.userData && action.userData.teacher,
        loading: false
      };
    case actionTypes.FETCH_ORDERS_FAIL:
      return {
        ...state,
        loading: false
      };
    case actionTypes.FETCH_TEACHER_SUBJECTS_START:
      return {
        ...state,
        loading: true
      };
    case actionTypes.FETCH_TEACHER_SUBJECTS_SUCCESS:
      return {
        ...state,
        teacherSubjects: action.teacherSubjects,
        loading: false
      };
    case actionTypes.FETCH_TEACHER_SUBJECTS_FAIL:
      return {
        ...state,
        loading: false
      };
    case actionTypes.FETCH_TEACHER_TESTS_START:
      return {
        ...state,
        loading: true
      };
    case actionTypes.FETCH_TEACHER_TESTS_SUCCESS:
      return {
        ...state,
        teacherTests: action.teacherTests,
        loading: false
      };
    case actionTypes.FETCH_TEACHER_TESTS_FAIL:
      return {
        ...state,
        loading: false
      };
    case actionTypes.USER_LOGOUT:
      return {
        ...state,
        loading: false,
        userId: null,
        email: null,
        indexNumber: null,
        role: null,
        student: null,
        teacher: null
      };
    default:
      return state;
  }
};

export default reducer;
