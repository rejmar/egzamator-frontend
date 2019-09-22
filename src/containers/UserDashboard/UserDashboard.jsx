import React, { useEffect } from "react";
import { connect } from "react-redux";

import StudentDashboard from "./StudentDashboard/StudentDashboard";
import TeacherDashboard from "./TeacherDashboard/TeacherDashboard";
import * as actions from "../../store/actions/index";

const UserDashboard = props => {
  useEffect(() => {
    props.onUserLog(props.userId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const userDashboard = props.role ? (
    props.role.includes("ROLE_STUDENT") ? (
      <div>
        <StudentDashboard {...props} />
      </div>
    ) : (
      <div>
        <TeacherDashboard {...props} />
      </div>
    )
  ) : null;

  return <div>{userDashboard}</div>;
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
)(UserDashboard);
