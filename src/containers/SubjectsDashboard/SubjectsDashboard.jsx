import React, { useEffect } from "react";
import { connect } from "react-redux";

import * as actions from "../../store/actions/index";
import StudentSubjectsDashboard from "./StudentSubjectsDashboard/StudentSubjectsDashboard";
import TeacherSubjectsDashboard from "./TeacherSubjectsDashboard/TeacherSubjectsDashboard";

const SubjectsDashboard = props => {
  useEffect(() => {
    // props.onUserLog(props.userId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const userSubjects = props.role ? (
    props.role.includes("ROLE_STUDENT") ? (
      <div>
        <StudentSubjectsDashboard {...props} />
      </div>
    ) : (
      <div>
        <TeacherSubjectsDashboard {...props} />
      </div>
    )
  ) : null;

  return (
    <div>
      <div>
        {" "}
        <h1>Your subjects:</h1>
      </div>
      {userSubjects}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    role: state.user.role,
    userId: state.auth.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onUserLog: userId => dispatch(actions.getUser(userId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubjectsDashboard);
