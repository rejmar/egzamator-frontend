import React, { useEffect } from "react";
import { connect } from "react-redux";

import StudentDashboard from "./StudentDashboard/StudentDashboard";
import TeacherDashboard from "./TeacherDashboard/TeacherDashboard";
import * as actions from "../../store/actions/index";

const UserDashboard = props => {
  useEffect(() => {
    props.onUserLog(props.userId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.userId]);

  const userRole = props.userData ? props.userData.role.role : null;

  const userDashboard = userRole ? (
    userRole.includes("ROLE_STUDENT") ? (
      <div>
        <StudentDashboard {...props}/>
      </div>
    ) : (
      <div>
        <TeacherDashboard {...props}/>
      </div>
    )
  ) : null;

  return <div>{userDashboard}</div>;
};

const mapStateToProps = state => {
  return {
    userData: state.user.userData,
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
