export {
  addIngredient,
  removeIngredient,
  initIngredients
} from "./sandwichBuilderActions";

export { purchaseSandwich, purchaseInit, fetchOrders } from "./orderActions";

export {
  auth,
  logout,
  setAuthRedirectPath,
  authCheckState
} from "./authActions";

export {
  getUser,
  getTest,
  addNewTest,
  getTeacherSubjects,
  getTeacherData,
  getStudentData,
  addStudentAnswers,
  deleteTest,
  getStudentsMarks
} from "./userActions";
