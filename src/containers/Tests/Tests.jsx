import React, { useEffect } from "react";
import { connect } from "react-redux";

import * as actions from "../../store/actions/index";
import StudentTests from "./StudentTests/StudentTests";
import TeacherTests from "./TeacherTests/TeacherTests";

const Tests = props => {
  useEffect(() => {
    // props.onUserLog(props.userId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const userRole = props.userData ? props.userData.role.name : null;

  const userTests = props.role ? (
    props.role.includes("ROLE_STUDENT") ? (
      <div>
        <StudentTests {...props} />
      </div>
    ) : (
      <div>
        <TeacherTests {...props} />
      </div>
    )
  ) : null;

  return <div>{userTests}</div>;
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
)(Tests);
